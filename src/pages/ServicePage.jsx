import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaHeart, FaBrain, FaBone, FaBaby, FaEye, FaPills, FaStethoscope, FaUserCheck, FaPhone, FaClock, FaCheckCircle, FaAmbulance, FaFlask } from 'react-icons/fa';
import { MdMedicalServices } from 'react-icons/md';

const departments = [
  {
    id: 'cardiology',
    icon: FaHeart,
    title: 'Cardiology',
    shortDesc: 'Comprehensive heart care services',
    description: 'Our Cardiology department offers complete cardiovascular care, from prevention to treatment. We have a team of experienced cardiologists and state-of-the-art equipment to provide the best possible care for heart conditions.',
    services: [
      'ECG & Echocardiography',
      'Stress Testing',
      'Cardiac Catheterization',
      'Angioplasty & Stenting',
      'Pacemaker Implantation',
      'Heart Failure Management',
      'Cardiac Surgery',
      '24/7 Emergency Cardiac Care',
    ],
    features: ['State-of-the-art Cath Lab', 'Dedicated Cardiac ICU', 'Expert Cardiologists'],
  },
  {
    id: 'neurology',
    icon: FaBrain,
    title: 'Neurology',
    shortDesc: 'Advanced brain & nervous system care',
    description: 'Our Neurology department provides comprehensive care for disorders of the brain, spine, and nervous system. We use advanced technology and techniques to diagnose and treat neurological conditions.',
    services: [
      'Brain & Spine Surgery',
      'Stroke Treatment (Thrombolysis)',
      'EEG & EMG Testing',
      'Movement Disorders Treatment',
      'Epilepsy Management',
      'Headache & Migraine Treatment',
      'Neuro-rehabilitation',
      'Neuroradiology',
    ],
    features: ['Advanced Neuro-imaging', 'Stroke Unit', 'Expert Neurologists'],
  },
  {
    id: 'orthopedics',
    icon: FaBone,
    title: 'Orthopedics',
    shortDesc: 'Expert bone & joint care',
    description: 'Our Orthopedics department provides comprehensive care for musculoskeletal conditions. From sports injuries to joint replacements, our expert team delivers personalized treatment plans.',
    services: [
      'Joint Replacement Surgery',
      'Arthroscopic Surgery',
      'Sports Medicine',
      'Spine Surgery',
      'Fracture Management',
      'Pediatric Orthopedics',
      'Physical Therapy',
      'Bone Density Testing',
    ],
    features: ['Modern Operation Theaters', 'Dedicated Physiotherapy Unit', 'Expert Orthopedic Surgeons'],
  },
  {
    id: 'pediatrics',
    icon: FaBaby,
    title: 'Pediatrics',
    shortDesc: 'Specialized care for children',
    description: 'Our Pediatrics department provides comprehensive healthcare services for infants, children, and adolescents. We create a child-friendly environment to ensure comfort and effective treatment.',
    services: [
      'Well-child Care',
      'Immunization Programs',
      'Neonatal Care',
      'Pediatric Emergency',
      'Growth & Development Monitoring',
      'Pediatric Surgery',
      'Allergy & Asthma Management',
      'Nutrition Counseling',
    ],
    features: ['Child-friendly Environment', 'Level III NICU', 'Expert Pediatricians'],
  },
  {
    id: 'ophthalmology',
    icon: FaEye,
    title: 'Ophthalmology',
    shortDesc: 'Complete eye care services',
    description: 'Our Ophthalmology department offers comprehensive eye care, from routine checkups to advanced surgical procedures. We use the latest technology to diagnose and treat various eye conditions.',
    services: [
      'Cataract Surgery',
      'LASIK & Refractive Surgery',
      'Glaucoma Treatment',
      'Retina Services',
      'Corneal Transplants',
      'Pediatric Ophthalmology',
      'Ocular Trauma',
      'Optical Services',
    ],
    features: ['Advanced Surgical Suite', 'Modern Diagnostic Equipment', 'Expert Ophthalmologists'],
  },
  {
    id: 'emergency',
    icon: FaAmbulance,
    title: 'Emergency Care',
    shortDesc: '24/7 emergency medical services',
    description: 'Our Emergency department is staffed 24/7 with trained emergency physicians and nurses. We provide immediate care for all types of medical emergencies with state-of-the-art equipment.',
    services: [
      '24/7 Emergency Services',
      'Trauma Center',
      'Ambulance Services',
      'ICU & CCU',
      'Burn Unit',
      'Poison Control',
      'Disaster Management',
      'Triage Services',
    ],
    features: ['Fully Equipped Ambulances', 'Trauma Bay', 'Dedicated Emergency Team'],
  },
];

const otherServices = [
  { icon: FaStethoscope, name: 'General Medicine' },
  { icon: FaPills, name: 'Pharmacy' },
  { icon: MdMedicalServices, name: 'Radiology & Imaging' },
  { icon: FaFlask, name: 'Laboratory Services' },
  { icon: FaUserCheck, name: 'Health Checkups' },
];

export default function ServicesPage() {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredDepartments = activeFilter === 'all' 
    ? departments 
    : departments.filter(d => d.id === activeFilter);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-green-800">
        <div className="absolute inset-0 bg-hospital-pattern opacity-20"></div>
        <div className="container-custom relative z-10">
          <div className="text-center text-white">
            <h1 className="heading-1 mb-6">Our Services</h1>
            <p className="text-xl text-white/80 max-w-3xl mb-6 mx-auto">
              Comprehensive healthcare services across multiple specialties to meet all your medical needs.
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
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-5 py-2 rounded-full font-medium transition-all ${
                activeFilter === 'all' 
                  ? 'bg-primary-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-primary-50'
              }`}
            >
              All Services
            </button>
            {departments.map((dept) => (
              <button
                key={dept.id}
                onClick={() => setActiveFilter(dept.id)}
                className={`px-5 py-2 rounded-full font-medium transition-all ${
                  activeFilter === dept.id 
                    ? 'bg-primary-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-primary-50'
                }`}
              >
                {dept.title}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12 bg-primary-50">
        <div className="container-custom">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="card p-6 bg-white">
              <div className="w-12 h-12 bg-primary-100 rounded-2xl flex items-center justify-center mb-4">
                <FaCheckCircle className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Trusted Specialists</h3>
              <p className="text-gray-600 leading-relaxed">
                Our doctors have decades of experience and are dedicated to providing patient-centered care.
              </p>
            </div>
            <div className="card p-6 bg-white">
              <div className="w-12 h-12 bg-primary-100 rounded-2xl flex items-center justify-center mb-4">
                <FaHeart className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Modern Facilities</h3>
              <p className="text-gray-600 leading-relaxed">
                We use advanced medical technology and modern equipment for accurate diagnosis and treatment.
              </p>
            </div>
            <div className="card p-6 bg-white">
              <div className="w-12 h-12 bg-primary-100 rounded-2xl flex items-center justify-center mb-4">
                <FaClock className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">24/7 Support</h3>
              <p className="text-gray-600 leading-relaxed">
                Our team is available around the clock to respond to emergencies and patient needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Departments Grid */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="space-y-8">
            {filteredDepartments.map((dept) => (
              <div 
                key={dept.id}
                id={dept.id}
                className="bg-white rounded-2xl shadow-md overflow-hidden"
              >
                <div className="p-6 md:p-8">
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center shrink-0">
                      <dept.icon className="w-8 h-8 text-primary-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">{dept.title}</h3>
                      <p className="text-gray-600 mb-4">{dept.description}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {dept.features.map((feature, i) => (
                          <span key={i} className="inline-flex items-center gap-1 text-sm bg-primary-50 text-primary-700 px-3 py-1 rounded-full">
                            <FaCheckCircle className="w-4 h-4" />
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Services List */}
                  <div className="mt-6 pt-6 border-t">
                    <h4 className="font-semibold text-gray-800 mb-4">Services Offered:</h4>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
                      {dept.services.map((service, i) => (
                        <div key={i} className="flex items-center gap-2 text-gray-600">
                          <FaCheckCircle className="w-4 h-4 text-primary-500 shrink-0" />
                          <span className="text-sm">{service}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-4">
                    <Link to="/contact" className="btn-primary">
                      Book Appointment
                      <FaArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                    <Link to="/doctors" className="btn-secondary">
                      Our Doctors
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Other Services */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-2 text-gray-800 mb-4">Additional Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We also provide these essential healthcare services to complete our comprehensive care offerings.
            </p>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
            {otherServices.map((service, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 text-center hover:bg-primary-50 transition-colors">
                <service.icon className="w-10 h-10 mx-auto mb-3 text-primary-600" />
                <p className="font-medium text-gray-800">{service.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Banner */}
      <section className="py-8 bg-red-600">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-white">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <FaClock className="w-6 h-6" />
              </div>
              <div>
                <p className="font-semibold">24/7 Emergency Services</p>
                <p className="text-red-100 text-sm">We are always here to help</p>
              </div>
            </div>
            <a href="tel:+923253829124" className="inline-flex items-center justify-center px-6 py-3 bg-white text-red-600 font-medium rounded-xl hover:bg-red-50 transition-all">
              <FaPhone className="w-5 h-5 mr-2" />
              Emergency: +92 325 3829124
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
