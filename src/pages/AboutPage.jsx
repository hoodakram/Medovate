import { Link } from 'react-router-dom';
import { FaAward, FaUsers, FaClock, FaHeart, FaBullseye, FaEye, FaCheckCircle, FaArrowRight } from 'react-icons/fa';
import { IoShield } from 'react-icons/io5';

const timeline = [
  { year: '1994', title: 'Foundation', description: 'Medovate Hospital Faisalabad was established to provide quality healthcare to the community.' },
  { year: '2000', title: 'Expansion', description: 'Added new departments including Cardiology, Neurology, and Orthopedics.' },
  { year: '2005', title: 'ISO Certification', description: 'Achieved ISO 9001:2015 certification for quality management systems.' },
  { year: '2010', title: 'Modern Facilities', description: 'Introduced state-of-the-art medical equipment and expanded emergency services.' },
  { year: '2015', title: 'Recognition', description: 'Recognized as one of the leading healthcare providers in the region.' },
  { year: '2020', title: 'Growth', description: 'Expanded to 500+ beds with advanced ICU and critical care facilities.' },
  { year: '2024', title: 'Excellence', description: 'Continuing to serve the community with dedication and commitment.' },
];

const values = [
  {
    icon: FaHeart,
    title: 'Compassion',
    description: 'We treat every patient with empathy and kindness, understanding their unique needs.',
  },
  {
    icon: IoShield,
    title: 'Quality',
    description: 'We maintain the highest standards of medical care and safety protocols.',
  },
  {
    icon: FaUsers,
    title: 'Teamwork',
    description: 'Our dedicated professionals work together to provide comprehensive care.',
  },
  {
    icon: FaBullseye,
    title: 'Integrity',
    description: 'We are transparent, ethical, and accountable in all our interactions.',
  },
];

const achievements = [
  'ISO 9001:2015 Certified',
  '50,000+ Patients Treated Annually',
  '100+ Expert Medical Professionals',
  '24/7 Emergency Services',
  'Advanced Diagnostic Facilities',
  'Patient Satisfaction Rate: 95%+',
];

export default function AboutPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-green-800">
        <div className="absolute inset-0 bg-hospital-pattern opacity-20"></div>
        <div className="container-custom relative z-10">
          <div className="text-center text-white">
            <h1 className="heading-1 mb-6">About Us</h1>
            <p className="text-xl text-white/80 max-w-3xl mb-6 mx-auto">
              Learn about our journey in providing exceptional healthcare services to the community 
              for over three decades.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="card p-8 bg-primary-50 border-primary-100">
              <FaEye className="w-12 h-12 text-primary-600 mb-4" />
              <h2 className="heading-3 text-gray-800 mb-4">Our Vision</h2>
              <p className="text-gray-600 leading-relaxed">
                To be the leading healthcare provider in the region, recognized for excellence 
                in patient care, medical innovation, and community service. We strive to make 
                quality healthcare accessible to everyone.
              </p>
            </div>
            <div className="card p-8 bg-accent-50 border-accent-100">
              <FaBullseye className="w-12 h-12 text-accent-600 mb-4" />
              <h2 className="heading-3 text-gray-800 mb-4">Our Mission</h2>
              <p className="text-gray-600 leading-relaxed">
                To provide comprehensive, compassionate, and affordable healthcare services 
                using advanced medical technology and a patient-centered approach. We are 
                committed to improving the health and well-being of our community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="heading-2 text-gray-800 mb-4">Our Core Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These values guide everything we do and shape how we interact with patients, 
              families, and each other.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div key={index} className="card card-hover p-6 text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="font-semibold text-lg text-gray-800 mb-2">{value.title}</h3>
                <p className="text-gray-600 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="text-primary-600 font-semibold uppercase tracking-[0.3em] text-sm">Our Journey</span>
            <h2 className="heading-2 text-gray-800 mt-3">Milestones That Define Us</h2>
          </div>
          <div className="space-y-6">
            {timeline.map((item, index) => (
              <div key={item.year} className="flex flex-col gap-4 md:flex-row md:items-center">
                <div className="md:w-32">
                  <span className="text-2xl font-bold text-primary-600">{item.year}</span>
                </div>
                <div className="flex-1 p-6 bg-gray-50 rounded-3xl border border-gray-100 shadow-sm">
                  <h3 className="font-semibold text-lg text-gray-800 mb-2">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="section-padding bg-primary-600">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-2 text-white mb-4">Our Achievements</h2>
            <p className="text-primary-100 max-w-2xl mx-auto">
              Recognition and milestones that reflect our commitment to excellence.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((achievement, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 flex items-center gap-3">
                <FaCheckCircle className="w-6 h-6 text-primary-300 shrink-0" />
                <span className="text-white font-medium">{achievement}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: '30+', label: 'Years Experience', icon: FaAward },
              { value: '50K+', label: 'Patients Treated', icon: FaUsers },
              { value: '100+', label: 'Medical Experts', icon: FaUsers },
              { value: '24/7', label: 'Emergency Service', icon: FaClock },
            ].map((stat, index) => (
              <div key={index} className="text-center p-6">
                <stat.icon className="w-8 h-8 mx-auto mb-3 text-primary-600" />
                <div className="text-4xl font-bold text-gray-800">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-white">
        <div className="container-custom text-center">
          <h2 className="heading-2 text-gray-800 mb-4">Ready to Experience Quality Care?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Schedule an appointment with our expert doctors today and experience 
            the difference in healthcare service.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="btn-primary">
              Book Appointment
              <FaArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <Link to="/doctors" className="btn-secondary">
              Our Doctors
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
