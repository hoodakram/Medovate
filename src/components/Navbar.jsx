import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MdMenu, MdClose, MdPhone, MdKeyboardArrowDown } from 'react-icons/md';
import { FaTicketAlt } from 'react-icons/fa';
import OpdTokenModal from './Opdtoken';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Doctors', href: '/doctors' },
  { name: 'Contact', href: '/contact' },
];

const departments = [
  { name: 'Cardiology', href: '/services#cardiology' },
  { name: 'Neurology', href: '/services#neurology' },
  { name: 'Orthopedics', href: '/services#orthopedics' },
  { name: 'Pediatrics', href: '/services#pediatrics' },
  { name: 'Emergency', href: '/services#emergency' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [departmentsOpen, setDepartmentsOpen] = useState(false);
  const [opdModalOpen, setOpdModalOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setDepartmentsOpen(false);
  }, [location]);

  const isActive = (href) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg py-3'
          : 'bg-transparent py-5'
      }`}>
        <div className="container-custom">
          <div className="flex items-center justify-between">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white text-2xl font-bold">+</span>
              </div>
              <div className={`transition-colors duration-300 ${isScrolled ? 'text-gray-800' : 'text-white'}`}>
                <span className="block font-display font-bold text-xl">Medovate</span>
                <span className="block text-sm opacity-80">Hospital Faisalabad</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-6">
              {navigation.map((item) => (
                <div key={item.name} className="relative">
                  {item.name === 'Services' ? (
                    <button
                      onClick={() => setDepartmentsOpen(!departmentsOpen)}
                      className={`flex items-center gap-1 font-medium transition-colors duration-200 ${
                        isScrolled ? 'text-gray-700 hover:text-primary-600' : 'text-white hover:text-primary-300'
                      } ${isActive(item.href) ? (isScrolled ? 'text-primary-500' : 'text-primary-300') : ''}`}
                    >
                      {item.name}
                      <MdKeyboardArrowDown className={`w-4 h-4 transition-transform ${departmentsOpen ? 'rotate-180' : ''}`} />
                    </button>
                  ) : (
                    <Link
                      to={item.href}
                      className={`font-medium transition-colors duration-200 ${
                        isScrolled ? 'text-gray-700 hover:text-primary-600' : 'text-white hover:text-primary-300'
                      } ${isActive(item.href) ? (isScrolled ? 'text-primary-500' : 'text-primary-300') : ''}`}
                    >
                      {item.name}
                    </Link>
                  )}

                  {/* Departments Dropdown */}
                  {item.name === 'Services' && departmentsOpen && (
                    <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
                      {departments.map((dept) => (
                        <Link
                          key={dept.name}
                          to={dept.href}
                          className="block px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                          onClick={() => setDepartmentsOpen(false)}
                        >
                          {dept.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* OPD Token Button */}
              <button
                onClick={() => setOpdModalOpen(true)}
                className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-xl font-medium hover:bg-orange-600 transition-colors cursor-pointer"
              >
                <FaTicketAlt className="w-4 h-4" />
                OPD Token
              </button>

              {/* Emergency Button */}
              <a
                href="tel:+923253829124"
                className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-xl font-medium hover:bg-red-700 transition-colors"
              >
                <MdPhone className="w-4 h-4" />
                <span className="hidden xl:inline">Emergency</span>
              </a>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`lg:hidden p-2 rounded-lg ${isScrolled ? 'text-gray-800' : 'text-white'}`}
            >
              {isOpen ? <MdClose className="w-6 h-6" /> : <MdMenu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="lg:hidden mt-4 bg-white rounded-xl shadow-lg p-4">
              {navigation.map((item) => (
                <div key={item.name}>
                  {item.name === 'Services' ? (
                    <>
                      <button
                        onClick={() => setDepartmentsOpen(!departmentsOpen)}
                        className="flex items-center justify-between w-full px-4 py-3 font-medium text-gray-700"
                      >
                        {item.name}
                        <MdKeyboardArrowDown className={`w-4 h-4 transition-transform ${departmentsOpen ? 'rotate-180' : ''}`} />
                      </button>
                      {departmentsOpen && (
                        <div className="bg-gray-50 rounded-lg ml-4">
                          {departments.map((dept) => (
                            <Link
                              key={dept.name}
                              to={dept.href}
                              className="block px-4 py-2 text-gray-600 hover:text-primary-600"
                              onClick={() => setIsOpen(false)}
                            >
                              {dept.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      to={item.href}
                      className={`block px-4 py-3 font-medium ${
                        isActive(item.href) ? 'text-primary-600' : 'text-gray-700'
                      }`}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}

              <div className="pt-4 border-t mt-4 space-y-3">
                {/* OPD Token — Mobile */}
                <button
                  onClick={() => { setIsOpen(false); setOpdModalOpen(true); }}
                  className="flex items-center justify-center gap-2 w-full bg-orange-500 text-white px-4 py-3 rounded-xl font-medium hover:bg-orange-600 transition-colors"
                >
                  <FaTicketAlt className="w-4 h-4" />
                  Get OPD Token
                </button>

                {/* Emergency — Mobile */}
                <a
                  href="tel:+923253829124"
                  className="flex items-center justify-center gap-2 bg-red-600 text-white px-4 py-3 rounded-xl font-medium"
                >
                  <MdPhone className="w-4 h-4" />
                  Emergency: +92 325 3829124
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* OPD Token Modal */}
      <OpdTokenModal isOpen={opdModalOpen} onClose={() => setOpdModalOpen(false)} />
    </>
  );
}