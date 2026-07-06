import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useClientStore } from '../../../app/useClientStore';
import { useState } from 'react';
import { Sparkles, Mail, Lock, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email format'),
  password: z.string().min(4, 'Password must be at least 4 characters'),
});

type LoginFields = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const login = useClientStore((state) => state.login);
  const authLoading = useClientStore((state) => state.authLoading);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFields>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFields) => {
    setError(null);
    const success = await login({ email: data.email, password: data.password });
    if (success) {
      navigate('/overview');
    } else {
      setError('Invalid credentials. Use email: admin@pravesha.ai / password: admin123');
    }
  };

  const autofillCredentials = () => {
    setValue('email', 'admin@pravesha.ai');
    setValue('password', 'admin123');
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col justify-center py-12 sm:px-6 lg:px-8 select-none">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        {/* Brand Logo */}
        <div className="mx-auto w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-extrabold text-2xl shadow-lg shadow-indigo-100 mb-4">
          P
        </div>
        <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight flex items-center justify-center gap-1.5 leading-none m-0">
          PRAVESHA<span className="text-sm font-semibold text-blue-600 uppercase tracking-widest">AI</span>
        </h2>
        <p className="mt-2 text-sm text-slate-500">
          Enter your credentials to access the AI CRM Dashboard
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 border border-slate-200 shadow-xl rounded-2xl sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {error && (
              <div className="bg-rose-50 border border-rose-200 text-rose-700 p-3.5 rounded-xl flex items-start gap-2.5 text-xs font-semibold">
                <AlertCircle size={16} className="shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                Email Address
              </label>
              <div className="relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail size={16} />
                </div>
                <input
                  id="email"
                  type="email"
                  placeholder="admin@pravesha.ai"
                  {...register('email')}
                  className={`block w-full pl-10 pr-3 py-2.5 text-sm bg-slate-50 border rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-slate-400 ${
                    errors.email ? 'border-rose-350 focus:border-rose-500 focus:ring-rose-500/10' : 'border-slate-200'
                  }`}
                />
              </div>
              {errors.email && (
                <p className="mt-1.5 text-xs text-rose-600 font-medium">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                Password
              </label>
              <div className="relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock size={16} />
                </div>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  {...register('password')}
                  className={`block w-full pl-10 pr-3 py-2.5 text-sm bg-slate-50 border rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-slate-400 ${
                    errors.password ? 'border-rose-350 focus:border-rose-500 focus:ring-rose-500/10' : 'border-slate-200'
                  }`}
                />
              </div>
              {errors.password && (
                <p className="mt-1.5 text-xs text-rose-600 font-medium">{errors.password.message}</p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-slate-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-xs text-slate-500 font-medium">
                  Remember me
                </label>
              </div>

              <div className="text-xs font-semibold">
                <a href="#" className="text-indigo-600 hover:text-indigo-500 hover:underline">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={authLoading}
                className="w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-xl shadow-md text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 active:scale-95 transition-all shadow-indigo-100"
              >
                {authLoading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
          </form>

          {/* Quick Demo Login Help */}
          <div className="mt-6 pt-6 border-t border-slate-100">
            <button
              onClick={autofillCredentials}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-indigo-50/70 border border-indigo-100 hover:bg-indigo-100/70 text-indigo-700 text-xs font-bold rounded-xl transition-all"
            >
              <Sparkles size={14} className="text-indigo-600 animate-float" />
              <span>Autofill Mock Admin Access</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
