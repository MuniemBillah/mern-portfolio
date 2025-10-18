import React, { useState } from 'react';
import { Lock, Mail, Eye, EyeOff, LogIn } from 'lucide-react';

export default function AdminLogin({ onLogin }) {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (formData.email === 'admin@portfolio.com' && formData.password === 'admin123') {
        localStorage.setItem('adminToken', 'demo-token');
        onLogin();
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="inline-block p-4 bg-purple-600 rounded-full mb-4">
            <Lock size={48} className="text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Admin Login</h1>
          <p className="text-gray-400">Access your portfolio dashboard</p>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20">
          {error && (
            <div className="mb-4 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300">
              {error}
            </div>
          )}

          <div className="mb-6">
            <label className="block text-gray-300 mb-2 flex items-center gap-2">
              <Mail size={18} />
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 bg-slate-700 border border-purple-500/30 rounded-lg focus:outline-none focus:border-purple-500 transition text-white"
              placeholder="admin@portfolio.com"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-300 mb-2 flex items-center gap-2">
              <Lock size={18} />
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-3 bg-slate-700 border border-purple-500/30 rounded-lg focus:outline-none focus:border-purple-500 transition text-white pr-12"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition disabled:opacity-50 text-white"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Logging in...
              </>
            ) : (
              <>
                <LogIn size={20} />
                Login
              </>
            )}
          </button>

          <div className="mt-6 text-center text-gray-400 text-sm">
            <p>Demo Credentials:</p>
            <p className="text-purple-400">Email: admin@portfolio.com</p>
            <p className="text-purple-400">Password: admin123</p>
          </div>
        </div>
      </div>
    </div>
  );
}