import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const defaultDoctors = [
  {
    _id: '1',
    name: 'Dr. Muhammad Ahmed',
    specialty: 'Cardiologist',
    department: 'Cardiology',
    experience: '20+ Years',
    qualification: 'FCPS (Cardiology), MD',
    languages: ['English', 'Urdu', 'Punjabi'],
    image: { url: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face' },
    rating: 4.9,
    patients: '15000+',
    about: 'Dr. Muhammad Ahmed is a renowned cardiologist with over 20 years of experience in treating heart conditions. He specializes in interventional cardiology and has performed thousands of successful procedures.',
    schedule: 'Mon - Sat: 9:00 AM - 5:00 PM',
  },
  {
    _id: '2',
    name: 'Dr. Fatima Khan',
    specialty: 'Neurologist',
    department: 'Neurology',
    experience: '15+ Years',
    qualification: 'FCPS (Neurology), MD',
    languages: ['English', 'Urdu'],
    image: { url: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face' },
    rating: 4.8,
    patients: '12000+',
    about: 'Dr. Fatima Khan is a highly skilled neurologist specializing in stroke treatment, epilepsy management, and neurodegenerative disorders. She is known for her compassionate patient care.',
    schedule: 'Mon - Fri: 10:00 AM - 6:00 PM',
  },
  {
    _id: '3',
    name: 'Dr. Ahmad Raza',
    specialty: 'Orthopedic Surgeon',
    department: 'Orthopedics',
    experience: '18+ Years',
    qualification: 'FCPS (Orthopedics), Fellowship',
    languages: ['English', 'Urdu', 'Punjabi'],
    image: { url: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop&crop=face' },
    rating: 4.9,
    patients: '18000+',
    about: 'Dr. Ahmad Raza is an expert orthopedic surgeon specializing in joint replacement, sports medicine, and minimally invasive surgeries. He has helped thousands of patients regain mobility.',
    schedule: 'Mon - Sat: 8:00 AM - 4:00 PM',
  },
  {
    _id: '4',
    name: 'Dr. Sarah Malik',
    specialty: 'Pediatrician',
    department: 'Pediatrics',
    experience: '12+ Years',
    qualification: 'FCPS (Pediatrics), MD',
    languages: ['English', 'Urdu', 'Punjabi'],
    image: { url: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop&crop=face' },
    rating: 4.8,
    patients: '10000+',
    about: 'Dr. Sarah Malik is a compassionate pediatrician dedicated to childrens health. She specializes in neonatal care, vaccination programs, and childhood development.',
    schedule: 'Mon - Fri: 9:00 AM - 5:00 PM',
  },
  {
    _id: '5',
    name: 'Dr. Omar Hassan',
    specialty: 'Ophthalmologist',
    department: 'Ophthalmology',
    experience: '14+ Years',
    qualification: 'FCPS (Ophthalmology), Fellowship',
    languages: ['English', 'Urdu'],
    image: { url: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&h=400&fit=crop&crop=face' },
    rating: 4.7,
    patients: '8000+',
    about: 'Dr. Omar Hassan is a skilled ophthalmologist specializing in cataract surgery, LASIK, and retinal diseases. He uses the latest technology to ensure best outcomes.',
    schedule: 'Mon - Sat: 10:00 AM - 6:00 PM',
  },
  {
    _id: '6',
    name: 'Dr. Aisha Sheikh',
    specialty: 'General Physician',
    department: 'General Medicine',
    experience: '10+ Years',
    qualification: 'MBBS, FCPS (Medicine)',
    languages: ['English', 'Urdu', 'Punjabi'],
    image: { url: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=400&h=400&fit=crop&crop=face' },
    rating: 4.9,
    patients: '20000+',
    about: 'Dr. Aisha Sheikh is an experienced general physician providing comprehensive healthcare. She is known for accurate diagnosis and effective treatment plans.',
    schedule: 'Mon - Sat: 8:00 AM - 8:00 PM',
  },
  {
    _id: '7',
    name: 'Dr. Imran Ali',
    specialty: 'General Surgeon',
    department: 'Surgery',
    experience: '16+ Years',
    qualification: 'FCPS (Surgery), Fellowship',
    languages: ['English', 'Urdu', 'Punjabi'],
    image: { url: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop&crop=face' },
    rating: 4.8,
    patients: '14000+',
    about: 'Dr. Imran Ali is an experienced general surgeon specializing in laparoscopic surgery, hernia repair, and gallbladder surgery. He has performed over 5000 successful surgeries.',
    schedule: 'Mon - Fri: 9:00 AM - 5:00 PM',
  },
  {
    _id: '8',
    name: 'Dr. Nadia Abbas',
    specialty: 'Gynecologist',
    department: 'Gynecology',
    experience: '15+ Years',
    qualification: 'FCPS (Gynecology), MD',
    languages: ['English', 'Urdu', 'Punjabi'],
    image: { url: 'https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?w=400&h=400&fit=crop&crop=face' },
    rating: 4.9,
    patients: '16000+',
    about: 'Dr. Nadia Abbas is a renowned gynecologist specializing in prenatal care, high-risk pregnancies, and minimally invasive gynecological surgeries.',
    schedule: 'Mon - Sat: 9:00 AM - 5:00 PM',
  },
];

const DoctorsContext = createContext(undefined);

export function DoctorsProvider({ children }) {
  const [doctors, setDoctors] = useState(defaultDoctors);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch doctors from backend on load
  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.doctors.getAll();
      // If backend returns doctors use them, otherwise keep defaults
      if (data.doctors && data.doctors.length > 0) {
        setDoctors(data.doctors);
      }
    } catch (err) {
      // Backend not available — fall back to default doctors
      console.warn('Backend unavailable, using default doctors:', err.message);
      setDoctors(defaultDoctors);
    } finally {
      setLoading(false);
    }
  };

  const addDoctor = async (doctorData, imageFile = null) => {
    try {
      const data = await api.doctors.create(doctorData, imageFile);
      setDoctors(prev => [data.doctor, ...prev]);
    } catch (err) {
      throw new Error(err.message || 'Failed to add doctor');
    }
  };

  const updateDoctor = async (id, doctorData, imageFile = null) => {
    try {
      const data = await api.doctors.update(id, doctorData, imageFile);
      setDoctors(prev => prev.map(d => (d._id === id ? data.doctor : d)));
    } catch (err) {
      throw new Error(err.message || 'Failed to update doctor');
    }
  };

  const deleteDoctor = async (id) => {
    try {
      await api.doctors.delete(id);
      setDoctors(prev => prev.filter(d => d._id !== id));
    } catch (err) {
      throw new Error(err.message || 'Failed to delete doctor');
    }
  };

  return (
    <DoctorsContext.Provider value={{ doctors, loading, error, addDoctor, updateDoctor, deleteDoctor, fetchDoctors }}>
      {children}
    </DoctorsContext.Provider>
  );
}

export function useDoctors() {
  const context = useContext(DoctorsContext);
  if (!context) {
    throw new Error('useDoctors must be used within a DoctorsProvider');
  }
  return context;
}