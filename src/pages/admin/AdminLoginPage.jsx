import React, { useState } from 'react';
import { useNavigate, useLocation, Link, Navigate } from 'react-router-dom';
import { ShieldCheck, Lock, Mail, Eye, EyeOff, ArrowLeft, AlertCircle } from 'lucide-react';

// TODO: Replace with real backend authentication API (POST /api/auth/login)
const SUPERADMIN_CREDENTIALS = {
  email: 'superadmin@hujrah.ae',
  password: 'Hujrah@2026',
  role: 'superadmin',
  name: 'SuperAdmin'
};

export default function AdminLoginPage({ isAuthenticated, onLogin }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const from = location.state?.from?.pathname || '/admin';

  if (isAuthenticated) {
    return <Navigate to={from} replace />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const normalizedEmail = email.trim().toLowerCase();
    if (
      normalizedEmail === SUPERADMIN_CREDENTIALS.email.toLowerCase() &&
      password === SUPERADMIN_CREDENTIALS.password
    ) {
      onLogin({
        email: SUPERADMIN_CREDENTIALS.email,
        role: SUPERADMIN_CREDENTIALS.role,
        name: SUPERADMIN_CREDENTIALS.name,
        loggedInAt: new Date().toISOString()
      });
      navigate(from, { replace: true });
    } else {
      setError('Invalid SuperAdmin email or password.');
    }
  };

  const handleFillDemo = () => {
    setEmail(SUPERADMIN_CREDENTIALS.email);
    setPassword(SUPERADMIN_CREDENTIALS.password);
    setError('');
  };

  return (
    <div className="min-h-screen bg-[#FAFAF9] text-[#141414] flex flex-col justify-center items-center px-4 py-10 font-sans">
      <div className="w-full max-w-md space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2.5">
          <img
            src="/images/logo.png"
            alt="HUJRAH // حجره"
            className="h-12 w-auto object-contain mx-auto"
          />
          <div className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] font-semibold bg-white border border-[#EAE8E4] px-3 py-1 rounded-full text-[#141414]">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
            <span>SuperAdmin Access</span>
          </div>
          <p className="text-xs text-neutral-500 font-light">
            Sign in to manage catalog, categories, orders, and client inquiries
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white border border-[#EAE8E4] rounded-sm p-6 sm:p-8 shadow-2xs space-y-5">
          {error && (
            <div className="flex items-center gap-2.5 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xs">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block text-[10px] uppercase tracking-wider font-semibold text-neutral-600 mb-1.5">
                SuperAdmin Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="superadmin@hujrah.ae"
                  className="w-full pl-9 pr-3 py-2.5 bg-[#FAFAF9] border border-[#DDD8CF] rounded-xs text-[#141414] focus:outline-none focus:border-black"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-wider font-semibold text-neutral-600 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-9 pr-10 py-2.5 bg-[#FAFAF9] border border-[#DDD8CF] rounded-xs text-[#141414] focus:outline-none focus:border-black"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(prev => !prev)}
                  className="p-1 text-neutral-400 hover:text-black absolute right-2.5 top-1/2 -translate-y-1/2 cursor-pointer"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#141414] hover:bg-neutral-800 text-white py-3 rounded-full text-xs uppercase tracking-[0.18em] font-medium transition-colors cursor-pointer"
            >
              Sign In to Admin
            </button>
          </form>

          {/* Hardcoded Demo Credentials Helper */}
          <div className="pt-4 border-t border-[#F0EEE9] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-wider font-semibold text-neutral-400">
                SuperAdmin Credentials (Frontend)
              </span>
              <button
                type="button"
                onClick={handleFillDemo}
                className="text-[10px] uppercase tracking-wider font-semibold text-[#141414] underline hover:opacity-70 cursor-pointer"
              >
                Auto-fill
              </button>
            </div>
            <div className="bg-[#FAFAF9] border border-[#EAE8E4] rounded-xs p-2.5 text-[11px] font-mono text-neutral-600 space-y-0.5">
              <div>Email: {SUPERADMIN_CREDENTIALS.email}</div>
              <div>Pass: {SUPERADMIN_CREDENTIALS.password}</div>
            </div>
          </div>
        </div>

        {/* Back to Storefront */}
        <div className="text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.16em] text-neutral-500 hover:text-black transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Storefront</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
