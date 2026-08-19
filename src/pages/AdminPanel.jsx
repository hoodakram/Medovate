import { useState } from 'react';
import { FaPlus, FaEdit, FaTrash, FaSave, FaTimes, FaUsers, FaUserMd, FaStar, FaSignOutAlt, FaImage } from 'react-icons/fa';
import { useDoctors } from '../context/Doctorscontext';
import { useAuth } from '../context/AuthContext';
import AdminLogin from '../components/AdminLogin';

export default function AdminPanel() {
  const { doctors, addDoctor, updateDoctor, deleteDoctor, loading, error, usingFallback, fetchDoctors } = useDoctors();
  const { isAuthenticated, logout, loading: authLoading } = useAuth();

  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    specialty: '',
    department: '',
    experience: '',
    qualification: '',
    languages: '',
    rating: '',
    patients: '',
    about: '',
    schedule: '',
  });

  // Verifying the stored token — don't flash the login form on every refresh.
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <svg className="animate-spin h-8 w-8 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
        </svg>
      </div>
    );
  }

  // If not authenticated, show login
  if (!isAuthenticated) {
    return <AdminLogin />;
  }

  const resetForm = () => {
    setFormData({
      name: '',
      specialty: '',
      department: '',
      experience: '',
      qualification: '',
      languages: '',
      rating: '',
      patients: '',
      about: '',
      schedule: '',
    });
    setImageFile(null);
    setImagePreview('');
    setSubmitError('');
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    try {
      const doctorData = {
        ...formData,
        rating: parseFloat(formData.rating),
      };

      if (editingId) {
        await updateDoctor(editingId, doctorData, imageFile);
        setEditingId(null);
      } else {
        await addDoctor(doctorData, imageFile);
        setIsAdding(false);
      }
      resetForm();
    } catch (err) {
      setSubmitError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (doctor) => {
    setFormData({
      name: doctor.name || '',
      specialty: doctor.specialty || '',
      department: doctor.department || '',
      experience: doctor.experience || '',
      qualification: doctor.qualification || '',
      languages: Array.isArray(doctor.languages) ? doctor.languages.join(', ') : '',
      rating: doctor.rating || '',
      patients: doctor.patients || '',
      about: doctor.about || '',
      schedule: doctor.schedule || '',
    });
    setImagePreview(doctor.image?.url || doctor.image || '');
    setImageFile(null);
    setEditingId(doctor._id);
    setIsAdding(true);
    setSubmitError('');
  };

  const handleDelete = async (doctor) => {
    if (!window.confirm(`Are you sure you want to delete ${doctor.name}?`)) return;
    try {
      await deleteDoctor(doctor._id);
    } catch (err) {
      alert('Failed to delete doctor: ' + err.message);
    }
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingId(null);
    resetForm();
  };

  // Statistics
  const totalDoctors = doctors.length;
  const averageRating = totalDoctors > 0
    ? (doctors.reduce((sum, doc) => sum + (Number(doc.rating) || 0), 0) / totalDoctors).toFixed(1)
    : 0;
  const departmentsCount = new Set(doctors.map(doc => doc.department)).size;
  const totalPatients = doctors.reduce((sum, doc) => {
    return sum + (parseInt(doc.patients?.replace(/[^\d]/g, '')) || 0);
  }, 0);

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container-custom py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Admin Panel</h1>
              <p className="text-gray-600 mt-1">Manage doctors and hospital data</p>
            </div>
            <button
              onClick={logout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-600 transition-colors flex items-center gap-2"
            >
              <FaSignOutAlt className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="container-custom py-8">

        {/* Backend unreachable — the list below is demo data, not the database */}
        {!loading && usingFallback && (
          <div className="mb-8 bg-amber-50 border border-amber-300 text-amber-900 rounded-xl p-5">
            <p className="font-semibold mb-1">Backend unavailable — showing demo data</p>
            <p className="text-sm">
              The doctors below are placeholders, not records from the database, so adding,
              editing and deleting are disabled. {error && <span className="font-mono">({error})</span>}
            </p>
            <button
              onClick={fetchDoctors}
              className="mt-3 bg-amber-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-amber-700 transition-colors"
            >
              Retry connection
            </button>
          </div>
        )}

        {/* Statistics Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FaUsers className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">{totalDoctors}</p>
                <p className="text-gray-600 text-sm">Total Doctors</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <FaUserMd className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">{departmentsCount}</p>
                <p className="text-gray-600 text-sm">Departments</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <FaStar className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">{averageRating}</p>
                <p className="text-gray-600 text-sm">Avg Rating</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <FaUsers className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">{totalPatients.toLocaleString()}+</p>
                <p className="text-gray-600 text-sm">Total Patients</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">Doctors Management</h2>
              {!isAdding && (
                <button
                  onClick={() => setIsAdding(true)}
                  disabled={usingFallback}
                  title={usingFallback ? 'Unavailable while the backend is unreachable' : undefined}
                  className="bg-primary-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-primary-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-primary-600"
                >
                  <FaPlus className="w-5 h-5" />
                  Add New Doctor
                </button>
              )}
            </div>
          </div>

          {/* Add / Edit Form */}
          {isAdding && (
            <div className="p-6 bg-gray-50 border-b">
              <h3 className="text-lg font-semibold mb-4">
                {editingId ? 'Edit Doctor' : 'Add New Doctor'}
              </h3>

              <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">

                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="e.g., Dr. Ahmed Raza"
                    required
                  />
                </div>

                {/* Specialty */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Specialty</label>
                  <input
                    type="text"
                    value={formData.specialty}
                    onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="e.g., Cardiologist"
                    required
                  />
                </div>

                {/* Department */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select Department</option>
                    <option value="Cardiology">Cardiology</option>
                    <option value="Neurology">Neurology</option>
                    <option value="Orthopedics">Orthopedics</option>
                    <option value="Pediatrics">Pediatrics</option>
                    <option value="Ophthalmology">Ophthalmology</option>
                    <option value="General Medicine">General Medicine</option>
                    <option value="Surgery">Surgery</option>
                    <option value="Gynecology">Gynecology</option>
                  </select>
                </div>

                {/* Experience */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Experience</label>
                  <input
                    type="text"
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="e.g., 10+ Years"
                    required
                  />
                </div>

                {/* Qualification */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Qualification</label>
                  <input
                    type="text"
                    value={formData.qualification}
                    onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="e.g., MBBS, FCPS"
                    required
                  />
                </div>

                {/* Languages */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Languages (comma-separated)</label>
                  <input
                    type="text"
                    value={formData.languages}
                    onChange={(e) => setFormData({ ...formData, languages: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="e.g., English, Urdu, Punjabi"
                    required
                  />
                </div>

                {/* Rating */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="e.g., 4.8"
                    required
                  />
                </div>

                {/* Patients */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Patients</label>
                  <input
                    type="text"
                    value={formData.patients}
                    onChange={(e) => setFormData({ ...formData, patients: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="e.g., 10000+"
                    required
                  />
                </div>

                {/* Schedule */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Schedule</label>
                  <input
                    type="text"
                    value={formData.schedule}
                    onChange={(e) => setFormData({ ...formData, schedule: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="e.g., Mon - Sat: 9:00 AM - 5:00 PM"
                    required
                  />
                </div>

                {/* About */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">About</label>
                  <textarea
                    value={formData.about}
                    onChange={(e) => setFormData({ ...formData, about: e.target.value })}
                    rows="4"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Brief description about the doctor..."
                    required
                  />
                </div>

                {/* Image Upload */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Doctor Image
                  </label>
                  <div className="flex items-center gap-4">
                    {/* Preview */}
                    <div className="w-20 h-20 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden bg-gray-100 shrink-0">
                      {imagePreview ? (
                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <FaImage className="w-6 h-6 text-gray-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        JPG, PNG, WEBP up to 5MB. Image will be uploaded to Cloudinary.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Error */}
                {submitError && (
                  <div className="md:col-span-2 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                    {submitError}
                  </div>
                )}

                {/* Buttons */}
                <div className="md:col-span-2 flex gap-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-primary-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                        </svg>
                        {editingId ? 'Updating...' : 'Adding...'}
                      </>
                    ) : (
                      <>
                        <FaSave className="w-4 h-4" />
                        {editingId ? 'Update Doctor' : 'Add Doctor'}
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    disabled={isSubmitting}
                    className="bg-gray-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-600 transition-colors flex items-center gap-2 disabled:opacity-60"
                  >
                    <FaTimes className="w-4 h-4" />
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="text-center py-12">
              <svg className="animate-spin h-8 w-8 text-primary-600 mx-auto mb-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
              <p className="text-gray-500">Loading doctors...</p>
            </div>
          )}

          {/* Doctors Table */}
          {!loading && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-4 px-6 font-semibold text-gray-800">Doctor</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-800">Specialty</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-800">Department</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-800">Rating</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-800">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {doctors.map((doctor) => (
                    <tr key={doctor._id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <img
                            src={doctor.image?.url || doctor.image}
                            alt={doctor.name}
                            className="w-12 h-12 rounded-full object-cover bg-gray-100"
                            onError={(e) => { e.target.src = 'https://via.placeholder.com/48?text=Dr'; }}
                          />
                          <div>
                            <div className="font-medium text-gray-800">{doctor.name}</div>
                            <div className="text-sm text-gray-500">{doctor.experience}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-gray-700">{doctor.specialty}</td>
                      <td className="py-4 px-6 text-gray-700">{doctor.department}</td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-1">
                          <span className="text-yellow-500">★</span>
                          <span className="font-medium">{doctor.rating}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(doctor)}
                            disabled={usingFallback}
                            className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-500"
                            title={usingFallback ? 'Unavailable while the backend is unreachable' : 'Edit'}
                          >
                            <FaEdit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(doctor)}
                            disabled={usingFallback}
                            className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-red-500"
                            title={usingFallback ? 'Unavailable while the backend is unreachable' : 'Delete'}
                          >
                            <FaTrash className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {doctors.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  No doctors found. Add your first doctor using the button above.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}