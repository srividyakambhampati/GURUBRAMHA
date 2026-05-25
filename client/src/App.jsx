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
        <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        <main>
          <PageWrapper>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
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
      </div>
    </Router>
  );
}

export default App;
