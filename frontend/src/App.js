import React, { useState, useEffect } from 'react';
import Portfolio from './components/Portfolio';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';

function App() {
  const [view, setView] = useState('portfolio');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      setIsAuthenticated(true);
      setView('dashboard');
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    setView('dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsAuthenticated(false);
    setView('portfolio');
  };

  const handleAdminAccess = () => {
    if (isAuthenticated) {
      setView('dashboard');
    } else {
      setView('login');
    }
  };

  return (
    <div>
      {view === 'portfolio' && (
        <>
          <Portfolio />
          <button
            onClick={handleAdminAccess}
            className="fixed bottom-4 right-4 w-12 h-12 bg-purple-600 hover:bg-purple-700 rounded-full flex items-center justify-center text-white shadow-lg transition opacity-20 hover:opacity-100 text-2xl"
            title="Admin Access"
          >
            🔐
          </button>
        </>
      )}
      
      {view === 'login' && !isAuthenticated && (
        <AdminLogin onLogin={handleLogin} />
      )}
      
      {view === 'dashboard' && isAuthenticated && (
        <AdminDashboard onLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;