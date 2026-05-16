import { createContext, useContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('guru_user');
    const savedSub = localStorage.getItem('guru_subscribed');
    if (savedUser) {
      setUser({ ...JSON.parse(savedUser), isSubscribed: savedSub === 'true' });
    }
    setLoading(false);
  }, []);

  const handleGoogleSuccess = (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      const userData = {
        uid: decoded.sub,
        displayName: decoded.name,
        email: decoded.email,
        photoURL: decoded.picture,
        token: credentialResponse.credential
      };
      setUser(userData);
      localStorage.setItem('guru_user', JSON.stringify(userData));
      return userData;
    } catch (error) {
      console.error("Google Auth Decode Error:", error);
      throw new Error("Failed to process Google account information.");
    }
  };

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('guru_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('guru_user');
    localStorage.removeItem('guru_subscribed');
  };

  const setSubscribed = (status) => {
    localStorage.setItem('guru_subscribed', status);
    if (user) {
      setUser({ ...user, isSubscribed: status });
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, handleGoogleSuccess, logout, setSubscribed, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
