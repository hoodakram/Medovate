// `VITE_API_URL` is the full API base that request paths are appended to.
// Examples: '/api' (same-origin), 'https://medovate-api.example.com/api'.
// Leave it unset in dev to use '/api' through the Vite proxy (see vite.config.js).
const BASE_URL = (import.meta.env.VITE_API_URL || '/api').replace(/\/+$/, '');

const TOKEN_KEY = 'medovate_token';

const getToken = () => localStorage.getItem(TOKEN_KEY);
const setToken = (token) => localStorage.setItem(TOKEN_KEY, token);
const clearToken = () => localStorage.removeItem(TOKEN_KEY);

// AuthContext registers a callback here so a rejected token anywhere in the app
// drops the session instead of leaving a dead panel open.
let onUnauthorized = null;
export const setUnauthorizedHandler = (fn) => { onUnauthorized = fn; };

const buildHeaders = (isFormData = false) => {
  const headers = {};
  if (!isFormData) headers['Content-Type'] = 'application/json';
  const token = getToken();
  if (token) headers['Authorization'] = `Bearer ${token}`;
  return headers;
};

const request = async (method, path, body = null, isFormData = false) => {
  const options = { method, headers: buildHeaders(isFormData) };
  if (body) options.body = isFormData ? body : JSON.stringify(body);

  const hadToken = !!getToken();

  let res;
  try {
    res = await fetch(`${BASE_URL}${path}`, options);
  } catch {
    // Network failure, DNS failure, or a CORS preflight rejection.
    throw new Error('Cannot reach the API. Check VITE_API_URL and that the backend allows this origin.');
  }

  // The backend may not be the thing answering — a 404 from a host/CDN comes
  // back as HTML or plain text, which res.json() would blow up on.
  const contentType = res.headers.get('content-type') || '';
  let data;
  if (contentType.includes('application/json')) {
    data = await res.json();
  } else {
    const text = await res.text();
    try {
      data = JSON.parse(text);
    } catch {
      data = { message: text };
    }
  }

  if (!res.ok) {
    // Only treat this as an expired session if we actually sent a token;
    // a 401 from the login call itself is just bad credentials.
    if ((res.status === 401 || res.status === 403) && hadToken) {
      clearToken();
      if (onUnauthorized) onUnauthorized();
    }
    const message = (data && typeof data.message === 'string' && data.message.trim())
      || (data && typeof data.error === 'string' && data.error.trim())
      || `API error: ${res.status} ${res.statusText}`;
    const error = new Error(message);
    error.status = res.status;
    throw error;
  }

  return data;
};

// Backends differ on where they nest the JWT; fail loudly rather than storing
// the string "undefined" and pretending the login worked.
const extractToken = (data) =>
  data?.token || data?.accessToken || data?.data?.token || data?.data?.accessToken || null;

const auth = {
  login: async (username, password) => {
    const data = await request('POST', '/auth/login', { username, password });
    const token = extractToken(data);
    if (!token) throw new Error('Login succeeded but the response contained no token.');
    setToken(token);
    return data;
  },
  logout: () => clearToken(),
  getMe: () => request('GET', '/auth/me'),
  isLoggedIn: () => !!getToken(),
};

// Repeated keys are the standard multipart way to send a list; Express/multer
// collects them into an array. Empty and NaN values are dropped so they never
// reach the backend as the strings "" or "NaN".
const buildDoctorForm = (doctorData, imageFile) => {
  const form = new FormData();

  Object.entries(doctorData).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') return;
    if (typeof value === 'number' && Number.isNaN(value)) return;

    if (key === 'languages') {
      const list = Array.isArray(value) ? value : String(value).split(',');
      list.map((v) => String(v).trim()).filter(Boolean).forEach((v) => form.append('languages', v));
      return;
    }

    if (Array.isArray(value)) {
      value.forEach((v) => form.append(key, v));
      return;
    }

    form.append(key, value);
  });

  if (imageFile) form.append('image', imageFile);
  return form;
};

const doctors = {
  getAll: (params = {}) => {
    const qs = new URLSearchParams(
      Object.fromEntries(Object.entries(params).filter(([, v]) => v))
    ).toString();
    return request('GET', `/doctors${qs ? `?${qs}` : ''}`);
  },
  getById: (id) => request('GET', `/doctors/${id}`),
  getStats: () => request('GET', '/doctors/stats'),
  create: (doctorData, imageFile = null) =>
    request('POST', '/doctors', buildDoctorForm(doctorData, imageFile), true),
  update: (id, doctorData, imageFile = null) =>
    request('PUT', `/doctors/${id}`, buildDoctorForm(doctorData, imageFile), true),
  delete: (id) => request('DELETE', `/doctors/${id}`),
};

const contact = {
  submit: (formData) => request('POST', '/contact', formData),
  getAll: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return request('GET', `/contact${qs ? `?${qs}` : ''}`);
  },
  markRead: (id) => request('PUT', `/contact/${id}/read`),
  delete: (id) => request('DELETE', `/contact/${id}`),
};

const api = { auth, doctors, contact };
export default api;
