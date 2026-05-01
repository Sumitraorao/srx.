
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AlertCircle, Loader2, Mail, Lock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '@/src/services/firebase';
import { getUser } from '@/src/services/firestore';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
        navigate('/dashboard', { replace: true });
    }
  }, [navigate]);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError('');
    const provider = new GoogleAuthProvider();
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        
        const profile = await getUser(user.uid);
        
        const userData = {
            id: user.uid,
            email: user.email,
            name: user.displayName || 'Google User',
            role: profile?.role || 'User',
            picture: user.photoURL
        };

        localStorage.setItem('accessToken', 'firebase_auth_active');
        localStorage.setItem('user', JSON.stringify(userData));

        if (!profile) {
            navigate('/complete-profile');
        } else if (userData.role.includes('Admin')) {
            navigate('/admin');
        } else {
            navigate('/dashboard');
        }
    } catch (err: any) {
        setError(err.message || "Google Sign-In failed.");
    } finally {
        setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        // Use SrxAdmin check for the specific user requested
        let role = 'User';
        if (user.email === 'sr9723612@gmail.com') {
            role = 'Super Admin';
        }

        const profile = await getUser(user.uid);
        
        const userData = {
            id: user.uid,
            email: user.email,
            name: profile?.name || user.displayName || 'User',
            role: profile?.role || role,
            phone: profile?.phone || ''
        };

        localStorage.setItem('accessToken', 'firebase_auth_active');
        localStorage.setItem('user', JSON.stringify(userData));

        if (userData.role.includes('Admin')) {
            navigate('/admin');
        } else {
            navigate('/dashboard');
        }
    } catch (err: any) {
        console.error("Login Error:", err);
        setError("Invalid email or password. Please try again.");
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden bg-[#0f172a] font-sans selection:bg-cyan-500 selection:text-white">
      
      {/* Animated Cosmic Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-purple-600/30 rounded-full blur-[120px] animate-blob"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-600/30 rounded-full blur-[120px] animate-blob animation-delay-2000"></div>
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
      </div>

      {/* Navigation Return */}
      <Link to="/" className="absolute top-8 left-8 z-20 flex items-center text-slate-400 hover:text-white transition-colors active:scale-95">
          <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center mr-3 border border-white/10 backdrop-blur-md">
             <span className="font-bold text-lg text-white">S</span>
          </div>
          <span className="text-sm font-medium tracking-wide">Back to Home</span>
      </Link>

      <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 w-full max-w-md px-6"
      >
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl overflow-hidden p-8 sm:p-10">
              
              <div className="text-center mb-10">
                  <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Welcome Back</h2>
                  <p className="text-slate-400 text-sm">Enter your credentials to access your workspace.</p>
              </div>
              
              <form className="space-y-6" onSubmit={handleSubmit}>
                  {error && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="rounded-xl bg-red-500/10 border border-red-500/20 p-4 flex items-center gap-3"
                      >
                          <AlertCircle className="h-5 w-5 text-red-400 shrink-0" />
                          <p className="text-sm font-medium text-red-200">{error}</p>
                      </motion.div>
                  )}

                  <div className="space-y-4">
                      <div className="relative group">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-cyan-400 transition-colors" size={20} />
                          <input
                              type="email"
                              required
                              className="w-full bg-slate-900/50 border border-slate-700 text-white rounded-xl px-12 py-4 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all placeholder-slate-500"
                              placeholder="Email address"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                          />
                      </div>
                      <div className="relative group">
                          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-cyan-400 transition-colors" size={20} />
                          <input
                              type="password"
                              required
                              className="w-full bg-slate-900/50 border border-slate-700 text-white rounded-xl px-12 py-4 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all placeholder-slate-500"
                              placeholder="Password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                          />
                      </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                      <label className="flex items-center text-slate-300 cursor-pointer hover:text-white transition-colors">
                          <input type="checkbox" className="w-4 h-4 rounded border-slate-600 bg-slate-800 text-cyan-500 focus:ring-offset-slate-900 focus:ring-cyan-500" />
                          <span className="ml-2">Remember me</span>
                      </label>
                      <a href="#" className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors">Forgot Password?</a>
                  </div>

                  <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-cyan-500/20 transition-all transform hover:-translate-y-1 active:translate-y-0 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                      {isLoading ? <Loader2 className="animate-spin h-5 w-5" /> : (
                          <>Sign In <ArrowRight size={18} className="ml-2" /></>
                      )}
                  </button>

                  <button
                      type="button"
                      onClick={() => {
                          setEmail('sr9723612@gmail.com');
                          setPassword('010python@@@');
                          setTimeout(() => {
                              (document.querySelector('button[type="submit"]') as any)?.click();
                          }, 500);
                      }}
                      className="w-full bg-white/5 hover:bg-white/10 text-slate-400 font-bold py-4 rounded-xl border border-white/10 transition-all text-xs tracking-widest active:scale-95"
                  >
                      AUTO-FILL ADMIN CREDENTIALS
                  </button>
              </form>

              <div className="mt-8">
                  <div className="relative">
                      <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-700" /></div>
                      <div className="relative flex justify-center text-xs uppercase tracking-widest"><span className="px-4 bg-[#161f32] text-slate-500 rounded-full">Or continue with</span></div>
                  </div>

                   <button
                      type="button"
                      onClick={handleGoogleLogin}
                      disabled={isLoading}
                      className="mt-6 w-full flex justify-center items-center py-3 px-4 border border-slate-700 rounded-xl bg-white/5 hover:bg-white/10 text-white transition-all font-medium active:scale-[0.98]"
                  >
                      <svg className="h-5 w-5 mr-3" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg>
                      Google
                  </button>
              </div>

              <div className="mt-8 text-center text-sm text-slate-400">
                  Don't have an account?{' '}
                  <Link to="/register" className="text-cyan-400 hover:text-cyan-300 font-bold hover:underline transition-colors">
                      Sign Up Free
                  </Link>

                  <div className="mt-6 pt-6 border-t border-slate-700/50">
                      <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-slate-500 mb-2">Platform Administration</p>
                      <Link to="/login" className="text-xs text-slate-400 hover:text-cyan-400 transition-colors flex items-center justify-center gap-1">
                          <Lock size={10} /> Internal Admin Access
                      </Link>
                  </div>
              </div>
          </div>
      </motion.div>
    </div>
  );
};

export default Login;
