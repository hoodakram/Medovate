const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const getToken = () => localStorage.getItem('medovate_token');

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
  const res = await fetch(`${BASE_URL}${path}`, options);
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'API error');
  return data;
};

const auth = {
  login: async (username, password) => {
    const data = await request('POST', '/auth/login', { username, password });
    localStorage.setItem('medovate_token', data.token);
    return data;
  },
  logout: () => localStorage.removeItem('medovate_token'),
  getMe: () => request('GET', '/auth/me'),
  isLoggedIn: () => !!getToken(),
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
  create: (doctorData, imageFile = null) => {
    const form = new FormData();
    Object.entries(doctorData).forEach(([k, v]) => form.append(k, v));
    if (imageFile) form.append('image', imageFile);
    return request('POST', '/doctors', form, true);
  },
  update: (id, doctorData, imageFile = null) => {
    const form = new FormData();
    Object.entries(doctorData).forEach(([k, v]) => form.append(k, v));
    if (imageFile) form.append('image', imageFile);
    return request('PUT', `/doctors/${id}`, form, true);
  },
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