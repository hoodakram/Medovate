import { useEffect } from 'react';
import { FaTimes, FaTicketAlt, FaExternalLinkAlt } from 'react-icons/fa';
import { MdLocalHospital } from 'react-icons/md';

export const N8N_FORM_URL =
  import.meta.env.VITE_N8N_FORM_URL ||
  'https://rajaahmad.app.n8n.cloud/form-test/844e602f-fd21-4021-8a42-e39b8ec539c0';

export default function OpdTokenModal({ isOpen, onClose }) {
  // Escape key to close
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.75)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl flex flex-col max-h-[90vh]">

        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center">
              <FaTicketAlt className="text-white w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-800">Generate OPD Token</h2>
              <p className="text-gray-500 text-xs">Fill the form to get your token number</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <a
              href={N8N_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-green-600 transition-colors p-2 rounded-lg hover:bg-gray-100"
              title="Open in new tab"
            >
              <FaExternalLinkAlt className="w-4 h-4" />
            </a>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-700 transition-colors p-2 rounded-lg hover:bg-gray-100"
            >
              <FaTimes className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center py-20 gap-4 text-center px-8">
          <p className="text-lg font-semibold text-gray-800">Open the form in a new tab</p>
          <p className="text-sm text-gray-500 max-w-md">
            This external form cannot be embedded because the provider blocks iframe embedding using X-Frame-Options.
          </p>
          <a
            href={N8N_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-green-600 text-white py-3 px-6 rounded-xl font-medium hover:bg-green-700 transition-colors"
          >
            <FaExternalLinkAlt className="w-4 h-4" />
            Open form in new tab
          </a>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 bg-gray-50 rounded-b-2xl border-t border-gray-100 shrink-0">
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <MdLocalHospital className="w-4 h-4 text-green-500 shrink-0" />
            <span>Medovate Hospital — Your token will be confirmed via SMS/Email after submission</span>
          </div>
        </div>

      </div>
    </div>
  );
}