
import React, { useState, useEffect, createContext, useContext } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import MobileNav from './components/MobileNav';
import Home from './pages/Home';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import { checkAuth } from './services/mockDb';
import { Language } from './types';

interface LanguageContextType {
  lang: Language;
  setLang: (l: Language) => void;
  isRtl: boolean;
}

export const LanguageContext = createContext<LanguageContextType>({
  lang: 'EN',
  setLang: () => {},
  isRtl: false,
});

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(checkAuth());
  const [lang, setLang] = useState<Language>('EN');

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAuthenticated(checkAuth());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const isRtl = lang === 'AR';

  return (
    <LanguageContext.Provider value={{ lang, setLang, isRtl }}>
      <Router>
        <div 
          dir={isRtl ? 'rtl' : 'ltr'} 
          className="min-h-screen bg-[#0a0a0a] text-white selection:bg-gray-700 transition-all duration-300"
        >
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route 
              path="/admin" 
              element={isAuthenticated ? <Navigate to="/admin/dashboard" /> : <AdminLogin />} 
            />
            <Route 
              path="/admin/dashboard" 
              element={isAuthenticated ? <AdminDashboard /> : <Navigate to="/admin" />} 
            />
          </Routes>
          <MobileNav />
        </div>
      </Router>
    </LanguageContext.Provider>
  );
};

export default App;
