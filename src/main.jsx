import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { DoctorsProvider } from './context/Doctorscontext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <DoctorsProvider>
        <App />
      </DoctorsProvider>
    </AuthProvider>
  </StrictMode>,
)
