import { FaTicketAlt, FaExternalLinkAlt, FaCheckCircle, FaClock, FaPhone } from 'react-icons/fa';
import { MdLocalHospital } from 'react-icons/md';
import { N8N_FORM_URL } from '../components/Opdtoken';

const steps = [
  { step: '01', title: 'Fill the Form', desc: 'Enter your name, phone, department and preferred date.' },
  { step: '02', title: 'Submit', desc: 'Click submit and your request will be processed instantly.' },
  { step: '03', title: 'Get Token', desc: 'Receive your OPD token number via SMS or Email.' },
  { step: '04', title: 'Visit Hospital', desc: 'Come at your scheduled time with your token number.' },
];

export default function OpdTokenPage() {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero */}
      <section className="bg-green-800 pt-32 pb-16">
        <div className="container-custom text-center">
          <div className="inline-flex items-center gap-2 bg-green-700 px-4 py-2 rounded-full mb-6">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            <span className="text-sm text-green-200 font-medium">Online Token Available</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            OPD Token System
          </h1>
          <p className="text-green-100 max-w-2xl mx-auto text-lg">
            Skip the queue! Generate your OPD token online and visit at your scheduled time.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="py-12 bg-white border-b">
        <div className="container-custom">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-10">How It Works</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <div key={i} className="text-center">
                <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <span className="text-green-700 font-bold text-lg">{s.step}</span>
                </div>
                <h3 className="font-semibold text-gray-800 mb-1">{s.title}</h3>
                <p className="text-sm text-gray-500">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Form Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-8 items-start">

            {/* Info Panel */}
            <div className="space-y-5">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <MdLocalHospital className="text-green-600 w-5 h-5" />
                  OPD Information
                </h3>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <FaCheckCircle className="text-green-500 mt-0.5 shrink-0" />
                    Token is valid for the selected date only
                  </li>
                  <li className="flex items-start gap-2">
                    <FaCheckCircle className="text-green-500 mt-0.5 shrink-0" />
                    Bring your token number when visiting
                  </li>
                  <li className="flex items-start gap-2">
                    <FaCheckCircle className="text-green-500 mt-0.5 shrink-0" />
                    Arrive 15 minutes before your slot
                  </li>
                  <li className="flex items-start gap-2">
                    <FaCheckCircle className="text-green-500 mt-0.5 shrink-0" />
                    Bring original CNIC for verification
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <FaClock className="text-green-600 w-4 h-4" />
                  OPD Hours
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-gray-600">
                    <span>Monday – Friday</span>
                    <span className="font-medium">8:00 AM – 8:00 PM</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Saturday</span>
                    <span className="font-medium">9:00 AM – 5:00 PM</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Sunday</span>
                    <span className="font-medium text-red-500">Emergency Only</span>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 rounded-2xl border border-green-100 p-6">
                <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                  <FaPhone className="text-green-600 w-4 h-4" />
                  Need Help?
                </h3>
                <p className="text-sm text-gray-600 mb-3">Call us for assistance with token booking.</p>
                <a
                  href="tel:+923253829124"
                  className="block text-center bg-green-600 text-white py-2 rounded-xl font-medium hover:bg-green-700 transition-colors text-sm"
                >
                  +92 325 3829124
                </a>
              </div>

              {/* Open in new tab */}
              <a
                href={N8N_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 text-sm text-gray-500 hover:text-green-600 transition-colors"
              >
                <FaExternalLinkAlt className="w-3 h-3" />
                Open form in new tab
              </a>
            </div>

            {/* Form iFrame */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="flex items-center gap-3 p-5 border-b border-gray-100">
                <div className="w-9 h-9 bg-green-600 rounded-xl flex items-center justify-center">
                  <FaTicketAlt className="text-white w-4 h-4" />
                </div>
                <div>
                  <h2 className="font-bold text-gray-800">Generate Your Token</h2>
                  <p className="text-xs text-gray-500">Fill all fields and submit</p>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center py-24 gap-6 text-center px-8">
                <div className="w-full max-w-2xl">
                  <div className="rounded-3xl border border-gray-100 bg-green-50 p-8">
                    <p className="text-lg font-semibold text-gray-800 mb-3">Open the OPD form in a new tab</p>
                    <p className="text-sm text-gray-500 mb-6">
                      This form cannot be embedded inside the app because the provider blocks iframe embedding (X-Frame-Options: sameorigin).
                    </p>
                    <a
                      href={N8N_FORM_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 bg-green-600 text-white py-3 px-6 rounded-xl font-medium hover:bg-green-700 transition-colors"
                    >
                      <FaExternalLinkAlt className="w-3 h-3" />
                      Open form in new tab
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}