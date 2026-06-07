import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaArrowRight, FaPhone, FaClock, FaMapPin, FaStar,
  FaHeart, FaBrain, FaBone, FaBaby, FaEye, FaAmbulance,
  FaStethoscope, FaCalendar, FaAward,
  FaUsers, FaCheckCircle, FaMedkit, FaTimes, FaEnvelope,
  FaAward as FaAwardIcon, FaTicketAlt,
} from 'react-icons/fa';
import { useDoctors } from '../context/Doctorscontext';
import OpdTokenModal from '../components/Opdtoken';

const stats = [
  { value: '30+', label: 'Years Experience', icon: FaAward },
  { value: '50K+', label: 'Patients Treated', icon: FaUsers },
  { value: '100+', label: 'Medical Experts', icon: FaStethoscope },
  { value: '24/7', label: 'Emergency Service', icon: FaClock },
];

const services = [
  {
    id: 'cardiology',
    icon: FaHeart,
    title: 'Cardiology',
    description: 'Comprehensive heart care including diagnostics, interventional procedures, and cardiac surgery.',
    features: ['ECG & Echo', 'Angioplasty', 'Cardiac Surgery', 'Heart Failure Management'],
  },
  {
    id: 'neurology',
    icon: FaBrain,
    title: 'Neurology',
    description: 'Advanced treatment for brain and nervous system disorders with state-of-the-art technology.',
    features: ['Brain Surgery', 'Stroke Treatment', 'EEG & EMG', 'Spine Surgery'],
  },
  {
    id: 'orthopedics',
    icon: FaBone,
    title: 'Orthopedics',
    description: 'Expert bone, joint, and muscle care including sports medicine and joint replacement.',
    features: ['Joint Replacement', 'Sports Medicine', 'Spine Surgery', 'Fracture Care'],
  },
  {
    id: 'pediatrics',
    icon: FaBaby,
    title: 'Pediatrics',
    description: 'Specialized healthcare for infants, children, and adolescents with compassionate care.',
    features: ['Neonatal Care', 'Vaccination', 'Growth Monitoring', 'Pediatric Surgery'],
  },
  {
    id: 'ophthalmology',
    icon: FaEye,
    title: 'Ophthalmology',
    description: 'Complete eye care services from routine checkups to advanced surgical procedures.',
    features: ['Cataract Surgery', 'LASIK', 'Glaucoma Treatment', 'Retina Care'],
  },
  {
    id: 'emergency',
    icon: FaAmbulance,
    title: 'Emergency Care',
    description: '24/7 emergency medical services with fully equipped ambulances and trauma center.',
    features: ['24/7 Availability', 'Trauma Center', 'Ambulance Service', 'ICU & CCU'],
  },
];

const testimonials = [
  {
    name: 'Muhammad Bilal',
    relation: 'Patient',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    rating: 5,
    text: 'Excellent hospital with professional staff. My father received outstanding cardiac treatment. Highly recommended!',
  },
  {
    name: 'Aisha Rehman',
    relation: 'Patient Family',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
    rating: 5,
    text: 'The pediatric department took wonderful care of my daughter. The doctors are very attentive and caring.',
  },
  {
    name: 'Kashif Mehmood',
    relation: 'Patient',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
    rating: 5,
    text: 'Emergency services are excellent. Quick response and professional treatment. Thank you for saving my life.',
  },
];

const features = [
  { icon: FaMedkit, title: 'Quality Certified', description: 'ISO 9001:2015 certified hospital with international healthcare standards.' },
  { icon: FaCheckCircle, title: 'Expert Doctors', description: 'Team of highly qualified specialists with international experience.' },
  { icon: FaStethoscope, title: 'Modern Equipment', description: 'State-of-the-art medical technology and diagnostic equipment.' },
  { icon: FaClock, title: '24/7 Service', description: 'Round-the-clock emergency and inpatient services available.' },
];

export default function HomePage() {
  const { doctors } = useDoctors();
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [opdModalOpen, setOpdModalOpen] = useState(false);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center bg-green-800 overflow-hidden">
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(34,197,94,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(34,197,94,0.05) 0%, transparent 50%)' }}></div>
        <div className="absolute top-20 right-10 w-96 h-96 bg-green-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-green-500/10 rounded-full blur-3xl"></div>

        <div className="container-custom relative z-10 pt-24 pb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-gray-800">
              <div className="inline-flex items-center gap-2 bg-green-100 px-4 py-2 rounded-full mb-6">
                <span className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></span>
                <span className="text-sm font-medium text-green-700">24/7 Emergency Services Available</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Your Health is Our{' '}
                <span className="text-orange-500">Priority</span>
              </h1>

              <p className="text-lg md:text-xl text-gray-900 mb-8 leading-relaxed max-w-xl">
                Providing exceptional healthcare services with compassion and excellence.
                Our team of expert doctors is dedicated to your well-being.
              </p>

              <div className="flex flex-wrap gap-4 mb-10">
                <Link to="/contact" className="bg-orange-500 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 hover:bg-orange-600 transition-colors">
                  Book Appointment
                  <FaArrowRight />
                </Link>

                {/* OPD Token Button — Hero */}
                <button
                  onClick={() => setOpdModalOpen(true)}
                  className="flex items-center gap-2 bg-white text-green-700 px-6 py-3 rounded-xl font-semibold hover:bg-green-50 transition-colors shadow cursor-pointer"
                >
                  <FaTicketAlt className="w-5 h-5" />
                  Get OPD Token
                </button>

                <a href="tel:+923253829124" className="btn-secondary bg-white/10 border-white/30 text-white hover:bg-white/20 flex items-center gap-2 px-4 py-3 rounded-xl">
                  <FaPhone className="w-5 h-5" />
                  Emergency
                </a>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 mb-8 border-t border-white/20">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <stat.icon className="w-6 h-6 mx-auto mb-2 text-orange-400" />
                    <div className="text-2xl md:text-3xl text-white font-bold">{stat.value}</div>
                    <div className="text-sm text-white/70">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Image Grid */}
            <div className="relative hidden lg:block">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <img src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&h=300&fit=crop" alt="Hospital" className="rounded-2xl shadow-2xl w-full h-48 object-cover" />
                  <img src="https://images.unsplash.com/photo-1581056771107-24ca5f033842?w=400&h=250&fit=crop" alt="Doctor" className="rounded-2xl shadow-2xl w-full h-40 object-cover" />
                </div>
                <div className="space-y-4 pt-8">
                  <img src="https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&h=250&fit=crop" alt="Equipment" className="rounded-2xl shadow-2xl w-full h-40 object-cover" />
                  <img src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=300&fit=crop" alt="Surgery" className="rounded-2xl shadow-2xl w-full h-48 object-cover" />
                </div>
              </div>
              <div className="absolute -left-8 top-1/3 bg-white rounded-2xl p-4 shadow-xl animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <FaCheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Verified Care</p>
                    <p className="text-sm text-gray-500">ISO Certified</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* OPD Token Banner */}
      <section className="bg-orange-50 border-y border-orange-100">
        <div className="container-custom py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center shrink-0">
                <FaTicketAlt className="text-white w-4 h-4" />
              </div>
              <div>
                <p className="font-semibold text-gray-800">Skip the Queue — Get Your OPD Token Online!</p>
                <p className="text-sm text-gray-500">Book your slot now and visit at your scheduled time.</p>
              </div>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => setOpdModalOpen(true)}
                className="bg-orange-500 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-orange-600 transition-colors flex items-center gap-2 text-sm cursor-pointer"
              >
                <FaTicketAlt className="w-4 h-4" />
                Get Token Now
              </button>
              <Link
                to="/opd-token"
                className="border border-orange-400 text-orange-600 px-5 py-2.5 rounded-xl font-medium hover:bg-orange-50 transition-colors text-sm"
              >
                Full Page →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Bar */}
      <section className="bg-white">
        <div className="container-custom py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-4 p-4 rounded-xl hover:bg-green-50 transition-colors duration-300">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center shrink-0">
                  <feature.icon className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="text-green-600 font-medium">Our Services</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2 mb-4">Comprehensive Healthcare</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">We offer a wide range of medical services across multiple specialties to meet all your healthcare needs.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div key={service.id} className="card card-hover bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 group" id={service.id}>
                <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-green-600 transition-colors duration-300">
                  <service.icon className="w-7 h-7 text-green-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-500">
                      <FaCheckCircle className="w-4 h-4 text-green-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link to={`/services#${service.id}`} className="inline-flex items-center gap-2 text-green-600 font-medium mt-4 group-hover:gap-3 transition-all duration-300">
                  Learn More <FaArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/services" className="bg-green-600 text-white px-6 py-3 rounded-xl font-semibold inline-flex items-center gap-2 hover:bg-green-700 transition-colors">
              View All Services <FaArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Doctors Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="text-green-600 font-medium">Our Doctors</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2 mb-4">Expert Medical Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Meet our team of highly qualified and experienced medical professionals dedicated to providing the best healthcare.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {doctors.slice(0, 4).map((doctor, index) => (
              <div key={doctor._id || index} className="card bg-white rounded-xl shadow-md overflow-hidden group transform transition-all duration-300 hover:scale-105">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={doctor.image?.url || doctor.image}
                    alt={doctor.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-white/95 px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                    <FaStar className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm font-semibold">{doctor.rating}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-lg text-gray-800 mb-1">{doctor.name}</h3>
                  <p className="text-green-600 font-semibold mb-2">{doctor.specialty}</p>
                  <p className="text-gray-500 text-sm mb-4">{doctor.experience} Experience</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-xs text-gray-500">Available</span>
                    </div>
                    <button
                      onClick={() => setSelectedDoctor(doctor)}
                      className="text-green-600 hover:text-green-700 font-medium text-sm hover:underline"
                    >
                      View Profile →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/doctors" className="border-2 border-green-600 text-green-600 px-8 py-4 rounded-xl font-semibold inline-flex items-center gap-3 hover:bg-green-600 hover:text-white transition-all duration-300">
              View All Doctors <FaArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-green-700">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="text-green-200 font-medium">Testimonials</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-4">What Our Patients Say</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => <FaStar key={i} className="w-5 h-5 text-yellow-500" />)}
                </div>
                <p className="text-white/90 mb-6">"{testimonial.text}"</p>
                <div className="flex items-center gap-3">
                  <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full" />
                  <div>
                    <p className="font-semibold text-white">{testimonial.name}</p>
                    <p className="text-sm text-green-200">{testimonial.relation}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
          <div className="container-custom bg-green-800 rounded-3xl shadow-lg p-8 md:p-12">
          <div className="bg-gradient-to-br from-primary-700 to-primary-900 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/15 rounded-full blur-3xl"></div>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Need Medical Assistance?</h2>
              <p className="text-primary-100 text-lg mb-8 max-w-2xl mx-auto">
                Our team of experts is available 24/7. Book an appointment or generate your OPD token online.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/contact" className="btn-secondary flex items-center gap-2">
                  <FaCalendar className="w-5 h-5" />
                  Book Appointment
                </Link>
                <button
                  onClick={() => setOpdModalOpen(true)}
                  className="btn-accent cursor-pointer flex items-center gap-2"
                >
                  <FaTicketAlt className="w-5 h-5" />
                  Get OPD Token
                </button>
                <a href="tel:+923253829124" className="bg-white/15 border border-white/30 text-white px-6 py-3 rounded-xl font-semibold inline-flex items-center gap-2 hover:bg-white/25 transition-colors">
                  <FaPhone className="w-5 h-5" />
                  Emergency
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Doctor Profile Modal */}
      {selectedDoctor && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative bg-gradient-to-r from-green-600 to-green-700 text-white p-8 rounded-t-2xl">
              <button onClick={() => setSelectedDoctor(null)} className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors">
                <FaTimes className="w-5 h-5" />
              </button>
              <div className="flex flex-col md:flex-row items-center gap-6">
                <img src={selectedDoctor.image?.url || selectedDoctor.image} alt={selectedDoctor.name} className="w-32 h-32 rounded-full border-4 border-white shadow-lg" />
                <div className="text-center md:text-left">
                  <h2 className="text-3xl font-bold mb-2 text-white">{selectedDoctor.name}</h2>
                  <p className="text-white text-xl mb-2 font-semibold">{selectedDoctor.specialty}</p>
                  <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
                    <div className="flex items-center gap-1"><FaStar className="w-5 h-5 text-yellow-300" /><span className="font-semibold text-white">{selectedDoctor.rating}</span></div>
                    <div className="flex items-center gap-1"><FaUsers className="w-5 h-5 text-yellow-200" /><span className="text-white">{selectedDoctor.patients} Patients</span></div>
                    <div className="flex items-center gap-1"><FaAwardIcon className="w-5 h-5 text-orange-300" /><span className="text-white">{selectedDoctor.experience}</span></div>
                  </div>
                  <p className="text-green-50 font-medium">{selectedDoctor.qualification}</p>
                </div>
              </div>
            </div>
            <div className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">About</h3>
                  <p className="text-gray-600 leading-relaxed mb-6">{selectedDoctor.about}</p>
                  <h4 className="text-lg font-semibold text-gray-800 mb-3">Languages</h4>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {selectedDoctor.languages?.map((lang, index) => (
                      <span key={index} className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">{lang}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Schedule & Contact</h3>
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                      <FaClock className="w-5 h-5 text-green-600" />
                      <div><p className="font-semibold text-gray-800">Working Hours</p><p className="text-gray-600">{selectedDoctor.schedule}</p></div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                      <FaPhone className="w-5 h-5 text-green-600" />
                      <div><p className="font-semibold text-gray-800">Emergency Contact</p><p className="text-gray-600">+92 325 3829124</p></div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                      <FaEnvelope className="w-5 h-5 text-green-600" />
                      <div><p className="font-semibold text-gray-800">Email</p><p className="text-gray-600">info@medovate.com</p></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t">
                <Link to="/contact" onClick={() => setSelectedDoctor(null)} className="flex-1 bg-green-600 text-white px-6 py-3 rounded-xl font-semibold text-center hover:bg-green-700 transition-colors">
                  Book Appointment
                </Link>
                <button
                  onClick={() => { setSelectedDoctor(null); setOpdModalOpen(true); }}
                  className="flex-1 bg-orange-500 text-white px-6 py-3 rounded-xl font-semibold text-center hover:bg-orange-600 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <FaTicketAlt className="w-4 h-4" />
                  Get OPD Token
                </button>
                <Link to="/doctors" onClick={() => setSelectedDoctor(null)} className="flex-1 border-2 border-green-600 text-green-600 px-6 py-3 rounded-xl font-semibold text-center hover:bg-green-600 hover:text-white transition-colors">
                  View All Doctors
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* OPD Token Modal */}
      <OpdTokenModal isOpen={opdModalOpen} onClose={() => setOpdModalOpen(false)} />
    </div>
  );
}