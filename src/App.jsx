import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Chatbot from './components/Chatbot';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicePage';
import DoctorsPage from './pages/DoctorsPage';
import ContactPage from './pages/ContactPage';
import AdminPanel from './pages/AdminPanel';
import OpdTokenPage from './pages/Opd';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout><HomePage /></Layout>} />
        <Route path="/about" element={<Layout><AboutPage /></Layout>} />
        <Route path="/services" element={<Layout><ServicesPage /></Layout>} />
        <Route path="/doctors" element={<Layout><DoctorsPage /></Layout>} />
        <Route path="/contact" element={<Layout><ContactPage /></Layout>} />
        <Route path="/opd-token" element={<Layout><OpdTokenPage /></Layout>} />
        <Route path="/admin" element={<AdminPanel />} />
        {/* <Route path="/portal" element={<PortalPage />} /> */}
      </Routes>
      <Chatbot />
    </Router>
  );
}

export default App;
