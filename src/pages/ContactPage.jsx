import { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

import {
  FaPhone,
  FaEnvelope,
  FaCheckCircle,
  FaPaperPlane,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin
} from 'react-icons/fa';

import { MdLocationOn, MdAccessTime } from 'react-icons/md';

const departments = [
  { name: 'General Inquiry', email: 'info@medovatehospital.org' },
  { name: 'Appointments', email: 'appointments@medovatehospital.org' },
  { name: 'Emergency', email: 'emergency@medovatehospital.org' },
  { name: 'Feedback', email: 'feedback@medovatehospital.org' },
];

// ✅ FIXED: use FaFacebook etc directly (NOT Facebook variable)
const socialLinks = [
  { icon: FaFacebook, href: '#', label: 'Facebook' },
  { icon: FaTwitter, href: '#', label: 'Twitter' },
  { icon: FaInstagram, href: '#', label: 'Instagram' },
  { icon: FaLinkedin, href: '#', label: 'LinkedIn' },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: '',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.contact.submit(formData);
      setIsSubmitted(true);
    } catch (err) {
      alert('Failed to send message. Please try again.');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>

      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-green-800">
        <div className="container-custom text-center text-white ">
          <h1 className="text-4xl font-bold mb-4 text-white">Contact Us</h1>
          <p className="text-white/80 max-w-2xl mx-auto">
            We’re here to help you anytime.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-white">
        <div className="container-custom grid lg:grid-cols-2 gap-12">

          {/* INFO */}
          <div className="space-y-8">
            <div className="bg-green-50 rounded-3xl p-8 shadow-lg border border-green-100">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Get in Touch</h2>
              <p className="text-gray-600 leading-relaxed">
                Our friendly team is ready to answer your questions and help you schedule the right care.
              </p>
            </div>

            <div className="grid gap-4">
              <div className="card p-6">
                <div className="flex items-start gap-4">
                  <MdLocationOn className="text-green-600 text-3xl" />
                  <div>
                    <h3 className="font-semibold text-gray-800">Visit Us</h3>
                    <p className="text-gray-600">Medovate Hospital, Jinnah Road, Faisalabad, Pakistan</p>
                  </div>
                </div>
              </div>
              <div className="card p-6">
                <div className="flex items-start gap-4">
                  <FaPhone className="text-green-600 text-3xl" />
                  <div>
                    <h3 className="font-semibold text-gray-800">Call Us</h3>
                    <p className="text-gray-600">+92 325 3829124</p>
                  </div>
                </div>
              </div>
              <div className="card p-6">
                <div className="flex items-start gap-4">
                  <FaEnvelope className="text-green-600 text-3xl" />
                  <div>
                    <h3 className="font-semibold text-gray-800">Email</h3>
                    <p className="text-gray-600">info@hospital.org</p>
                  </div>
                </div>
              </div>
              <div className="card p-6">
                <div className="flex items-start gap-4">
                  <MdAccessTime className="text-green-600 text-3xl" />
                  <div>
                    <h3 className="font-semibold text-gray-800">Hours</h3>
                    <p className="text-gray-600">Open 24/7 for emergency care</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-3xl p-6 border border-gray-100">
              <h3 className="font-semibold text-gray-800 mb-4">Department Contacts</h3>
              <div className="space-y-3">
                {departments.map((d, i) => (
                  <div key={i} className="flex items-center justify-between text-sm text-gray-700">
                    <span>{d.name}</span>
                    <a href={`mailto:${d.email}`} className="text-primary-600 hover:text-primary-700">{d.email}</a>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* FORM */}
          <div className="bg-primary-50 rounded-3xl p-8 shadow-lg border border-primary-100">
            {isSubmitted ? (
              <div className="text-center">
                <FaCheckCircle className="text-green-600 text-5xl mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Message Sent!</h3>
                <p className="text-gray-600">Our team will contact you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-4 md:grid-cols-2">
                  <input
                    name="name"
                    placeholder="Name"
                    onChange={handleChange}
                    className="w-full p-4 border border-gray-200 rounded-3xl focus:ring-2 focus:ring-primary-200 focus:border-transparent"
                    required
                  />
                  <input
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    className="w-full p-4 border border-gray-200 rounded-3xl focus:ring-2 focus:ring-primary-200 focus:border-transparent"
                    required
                  />
                </div>
                <input
                  name="phone"
                  placeholder="Phone"
                  onChange={handleChange}
                  className="w-full p-4 border border-gray-200 rounded-3xl focus:ring-2 focus:ring-primary-200 focus:border-transparent"
                />
                <textarea
                  name="message"
                  placeholder="Message"
                  onChange={handleChange}
                  className="w-full p-4 border border-gray-200 rounded-3xl focus:ring-2 focus:ring-primary-200 focus:border-transparent"
                  rows="6"
                  required
                />
                <button className="w-full btn-primary justify-center gap-2">
                  <FaPaperPlane />
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* SOCIAL */}
      <section className="py-10 text-center">
        <div className="flex justify-center gap-4">
          {socialLinks.map((s, i) => (
            <a key={i} href={s.href} className="text-2xl text-green-600">
              <s.icon />
            </a>
          ))}
        </div>
      </section>

    </div>
  );
}