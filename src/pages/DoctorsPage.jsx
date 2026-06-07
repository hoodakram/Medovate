import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaCalendar, FaPhone, FaEnvelope, FaAward, FaClock, FaArrowRight, FaTimes } from 'react-icons/fa';
import { useDoctors } from '../context/Doctorscontext';

const departments = ['All', 'Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics', 'Ophthalmology', 'General Medicine', 'Surgery', 'Gynecology'];

export default function DoctorsPage() {
  const { doctors } = useDoctors();
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const filteredDoctors = activeFilter === 'All' 
    ? doctors 
    : doctors.filter(d => d.department === activeFilter);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-linear-to-br from-primary-800 via-primary-700 to-primary-900">
        <div className="absolute inset-0 bg-hospital-pattern bg-green-800 "></div>
        <div className="container-custom relative z-10">
          <div className="text-center text-white">
            <h1 className="heading-1 mb-6">Our Doctors</h1>
            <p className="text-xl text-white/80 max-w-3xl mb-6 mx-auto">
              Meet our team of highly qualified and experienced medical professionals dedicated to your health.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-white border-b">
        <div className="container-custom">
          <div className="flex flex-wrap justify-center gap-3">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setActiveFilter(dept)}
                className={`px-5 py-2 rounded-full font-medium transition-all ${
                  activeFilter === dept 
                    ? 'bg-primary-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-primary-50'
                }`}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Summary Bar */}
      <section className="py-10 bg-white border-b">
        <div className="container-custom">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="card p-6 flex flex-col">
              <span className="text-sm uppercase tracking-[0.2em] text-primary-600 mb-3">Doctors on Duty</span>
              <p className="text-4xl font-bold text-gray-800">{doctors.length}</p>
              <p className="text-gray-600 mt-3">Highly skilled professionals ready to care for you.</p>
            </div>
            <div className="card p-6 flex flex-col">
              <span className="text-sm uppercase tracking-[0.2em] text-primary-600 mb-3">Departments</span>
              <p className="text-4xl font-bold text-gray-800">{new Set(doctors.map(doc => doc.department)).size}</p>
              <p className="text-gray-600 mt-3">A wide range of specialty services across the hospital.</p>
            </div>
            <div className="card p-6 flex flex-col">
              <span className="text-sm uppercase tracking-[0.2em] text-primary-600 mb-3">Patients Served</span>
              <p className="text-4xl font-bold text-gray-800">{doctors.reduce((sum, doc) => sum + (parseInt(doc.patients.replace(/[^\d]/g, '')) || 0), 0).toLocaleString()}+</p>
              <p className="text-gray-600 mt-3">Trusted by thousands of patients every year.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Doctors Grid */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredDoctors.map((doctor) => (
              <div 
                key={doctor._id} 
                className="card overflow-hidden group"
              >
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={doctor.image?.url || doctor.image}
                    alt={doctor.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
                    <FaStar className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-sm font-medium">{doctor.rating}</span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-lg text-gray-800">{doctor.name}</h3>
                  <p className="text-primary-600 font-medium">{doctor.specialty}</p>
                  <p className="text-gray-500 text-sm mt-1">{doctor.department}</p>
                  
                  <div className="mt-4 pt-4 border-t space-y-3">
                    <div className="flex flex-wrap gap-2 text-sm">
                      <span className="inline-flex items-center gap-2 rounded-full bg-primary-50 text-primary-700 px-3 py-1">
                        <FaAward className="w-4 h-4" /> {doctor.experience}
                      </span>
                      <span className="inline-flex items-center gap-2 rounded-full bg-yellow-50 text-yellow-700 px-3 py-1">
                        <FaStar className="w-4 h-4" /> {doctor.patients}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <FaClock className="w-4 h-4" />
                      <span>{doctor.schedule}</span>
                    </div>
                  </div>

                  <button 
                    onClick={() => setSelectedDoctor(doctor)}
                    className="w-full mt-4 py-2 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700 transition-colors"
                  >
                    View Profile
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Doctor Modal */}
      {selectedDoctor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
              <h3 className="text-xl font-semibold">Doctor Profile</h3>
              <button 
                onClick={() => setSelectedDoctor(null)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <FaTimes className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <img 
                  src={selectedDoctor.image?.url || selectedDoctor.image}
                  alt={selectedDoctor.name}
                  className="w-48 h-48 rounded-2xl object-cover"
                />
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">{selectedDoctor.name}</h2>
                  <p className="text-primary-600 font-medium">{selectedDoctor.specialty}</p>
                  <p className="text-gray-500">{selectedDoctor.department}</p>
                  
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <FaAward className="w-4 h-4" />
                      <span>{selectedDoctor.qualification}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <FaClock className="w-4 h-4" />
                      <span>{selectedDoctor.schedule}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="font-semibold text-gray-800 mb-2">About</h4>
                <p className="text-gray-600">{selectedDoctor.about}</p>
              </div>

              <div className="mt-6">
                <h4 className="font-semibold text-gray-800 mb-2">Languages</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedDoctor.languages.map((lang, i) => (
                    <span key={i} className="bg-gray-100 px-3 py-1 rounded-full text-sm">{lang}</span>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-6 border-t flex flex-wrap gap-4">
                <Link 
                  to="/contact" 
                  className="flex-1 inline-flex items-center justify-center px-5 py-3 bg-primary-600 text-white font-medium rounded-xl hover:bg-primary-700 transition-all"
                >
                  <FaCalendar className="w-5 h-5 mr-2" />
                  Book Appointment
                </Link>
                <a 
                  href="tel:+923253829124" 
                  className="inline-flex items-center justify-center px-5 py-3 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition-all"
                >
                  <FaPhone className="w-5 h-5 mr-2" />
                  Call Now
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <section className="section-padding bg-white">
        <div className="container-custom text-center">
          <h2 className="heading-2 text-gray-800 mb-4">Need to Book an Appointment?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Schedule a consultation with our expert doctors today. We&apos;re here to help with all your healthcare needs.
          </p>
          <Link to="/contact" className="btn-primary">
            Book Appointment
            <FaArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </section>
    </div>
  );
}
