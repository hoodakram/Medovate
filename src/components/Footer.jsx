import { Link } from 'react-router-dom';
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin
} from "react-icons/fa";

import {
  MdEmail,
  MdPhone,
  MdLocationOn,
  MdAccessTime,
  MdArrowRight
} from "react-icons/md";

const quickLinks = [
  { name: 'About Us', href: '/about' },
  { name: 'Our Services', href: '/services' },
  { name: 'Our Doctors', href: '/doctors' },
  { name: 'Contact', href: '/contact' },
  { name: 'Emergency', href: '/contact' },
];

const services = [
  { name: 'Cardiology', href: '/services#cardiology' },
  { name: 'Neurology', href: '/services#neurology' },
  { name: 'Orthopedics', href: '/services#orthopedics' },
  { name: 'Pediatrics', href: '/services#pediatrics' },
  { name: 'General Medicine', href: '/services#general' },
];

const socialLinks = [
  { icon: FaFacebook, href: '#', label: 'Facebook' },
  { icon: FaTwitter, href: '#', label: 'Twitter' },
  { icon: FaInstagram, href: '#', label: 'Instagram' },
  { icon: FaLinkedin, href: '#', label: 'LinkedIn' },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">

      {/* Main Footer */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center">
                <span className="text-white text-2xl font-bold">+</span>
              </div>
              <div>
                <span className="block font-bold text-xl">
                  Medovate
                </span>
                <span className="block text-sm text-gray-400">
                  Hospital Faisalabad
                </span>
              </div>
            </Link>

            <p className="text-gray-400 mb-6 leading-relaxed">
              Providing quality healthcare services to the community for over 30 years.
              Your health is our priority.
            </p>

            {/* Social */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center
                  hover:bg-green-600 hover:scale-110 transition-all duration-300"
                >
                  <social.icon className="text-xl" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-green-400 flex items-center gap-2 hover:translate-x-1 transition"
                  >
                    <MdArrowRight />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold text-lg mb-6">Services</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <Link
                    to={service.href}
                    className="text-gray-400 hover:text-green-400 flex items-center gap-2 hover:translate-x-1 transition"
                  >
                    <MdArrowRight />
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-6">Contact Info</h3>

            <div className="space-y-4 text-gray-400">

              <div className="flex items-start gap-2">
                <MdLocationOn className="text-green-500 text-xl" />
                <p>
                  Medovate Hospital<br />
                  Jinnah Road, Faisalabad
                </p>
              </div>

              <div className="flex items-center gap-2">
                <MdPhone className="text-green-500 text-xl" />
                +92 325 3829124
              </div>

              <div className="flex items-center gap-2">
                <MdEmail className="text-green-500 text-xl" />
                info@medovatehospital.org
              </div>

              <div className="flex items-start gap-2">
                <MdAccessTime className="text-green-500 text-xl" />
                24/7 Emergency Service
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-800 text-center py-6 text-gray-500 text-sm">
        © {new Date().getFullYear()} Medovate Hospital Faisalabad. All rights reserved.
      </div>

    </footer>
  );
}