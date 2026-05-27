import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Courses from './pages/Courses';
import Dashboard from './pages/Dashboard';
import Practice from './pages/Practice';
import Interview from './pages/Interview';
import Admin from './pages/Admin';
import Profile from './pages/Profile';
import Documents from './pages/Documents';
import MyCourses from './pages/MyCourses';
import ComingSoon from './pages/ComingSoon';
import SharedDocument from './pages/SharedDocument';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import ProtectedRoute from './components/ProtectedRoute';
import { AnimatePresence } from 'framer-motion';

const PageWrapper = ({ children }) => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <div key={location.pathname}>
        {children}
      </div>
    </AnimatePresence>
  );
};

const MainLayout = ({ isDarkMode, toggleDarkMode }) => {
  const location = useLocation();
  const hideNavbar = location.pathname.startsWith('/shared') || 
                     location.pathname.startsWith('/forgot-password') || 
                     location.pathname.startsWith('/reset-password') ||
                     location.pathname.startsWith('/admin');
  
  const isOverlayPage = location.pathname === '/' || 
                        location.pathname === '/login' || 
                        location.pathname === '/signup' ||
                        location.pathname === '/admin';
  
  return (
    <>
      {!hideNavbar && <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />}
      <main className={(!hideNavbar && !isOverlayPage) ? "pt-24" : ""}>
        <PageWrapper>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="/shared/:filename" element={<SharedDocument />} />
            <Route path="/courses" element={<ProtectedRoute><Courses /></ProtectedRoute>} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/practice" element={<ProtectedRoute><Practice /></ProtectedRoute>} />
            <Route path="/interview" element={<ProtectedRoute><Interview /></ProtectedRoute>} />
            <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/documents" element={<ProtectedRoute><Documents /></ProtectedRoute>} />
            <Route path="/my-courses" element={<ProtectedRoute><MyCourses /></ProtectedRoute>} />
            <Route path="/coming-soon" element={<ProtectedRoute><ComingSoon /></ProtectedRoute>} />
          </Routes>
        </PageWrapper>
      </main>
    </>
  );
};

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  return (
    <Router>
      <div className="min-h-screen transition-colors duration-300">
        <MainLayout isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      </div>
    </Router>
  );
}

export default App;
