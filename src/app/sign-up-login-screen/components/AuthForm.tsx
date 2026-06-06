'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import AppLogo from '@/components/ui/AppLogo';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

type SignUpData = {
  fullName: string;
  email: string;
  productName: string;
  password: string;
  terms: boolean;
};

type LoginData = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export default function AuthForm() {
  const [tab, setTab] = useState<'login' | 'signup'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { signIn, signUp, signInWithGoogle } = useAuth();
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      await signInWithGoogle();
      // Redirect is handled by Supabase OAuth flow
    } catch (error: any) {
      toast.error(error?.message || 'Google sign in failed. Please try again.');
      setIsLoading(false);
    }
  };

  const signupForm = useForm<SignUpData>({ mode: 'onBlur' });
  const loginForm = useForm<LoginData>({ mode: 'onBlur' });

  const handleSignup = signupForm.handleSubmit(async (data) => {
    if (!data.terms) return;
    setIsLoading(true);
    try {
      await signUp(data.email, data.password, { fullName: data.fullName });
      toast.success(`Welcome to FounderMark, ${data.fullName.split(' ')[0]}!`);
      router.push('/product-setup');
      router.refresh();
    } catch (error: any) {
      toast.error(error?.message || 'Sign up failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  });

  const handleLogin = loginForm.handleSubmit(async (data) => {
    setIsLoading(true);
    try {
      await signIn(data.email, data.password);
      toast.success('Logged in successfully. Welcome back!');
      router.push('/');
      router.refresh();
    } catch (error: any) {
      toast.error(error?.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  });

  return (
    <div className="w-full max-w-md">
      {/* Mobile logo */}
      <div className="flex items-center gap-2 mb-8 lg:hidden">
        <div className="w-[32px] h-[32px] rounded-[8px] flex items-center justify-center" style={{ background: '#000', border: '1px solid #1f1f1f' }}>
          <AppLogo size={22} />
        </div>
        <span className="font-bold text-[15px]" style={{ color: '#ededed' }}>FounderMark</span>
      </div>

      {/* Tab switcher */}
      <div className="flex rounded-[10px] p-[3px] mb-8" style={{ background: '#161616', border: '1px solid #1f1f1f' }}>
        {(['login', 'signup'] as const).map((t) => (
          <button
            key={`tab-${t}`}
            onClick={() => setTab(t)}
            className="flex-1 py-2.5 text-[13px] font-semibold rounded-[8px] transition-all duration-150"
            style={{
              background: tab === t ? 'linear-gradient(#1c1c1c, #141414)' : 'transparent',
              color: tab === t ? '#ededed' : '#8a8a8a',
              boxShadow: tab === t ? 'inset 0 0 0 1px rgba(255,255,255,0.08)' : 'none',
            }}
          >
            {t === 'login' ? 'Log In' : 'Sign Up'}
          </button>
        ))}
      </div>

      {tab === 'login' ? (
        <form onSubmit={handleLogin} className="space-y-5">
          <div className="text-center mb-6">
            <h1 className="text-[22px] font-bold tracking-[-0.4px]" style={{ color: '#ededed' }}>Welcome back</h1>
            <p className="text-[13px] mt-[4px]" style={{ color: '#8a8a8a' }}>Log in to continue generating content</p>
          </div>

          {/* Social auth */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className="flex items-center justify-center gap-2.5 px-4 py-2.5 rounded-[10px] text-[13px] font-medium transition-all duration-150 hover:border-[#3a3a3a] disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ border: '1px solid #1f1f1f', color: '#ededed', background: 'transparent' }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
              Google
            </button>
            <button
              type="button"
              className="flex items-center justify-center gap-2.5 px-4 py-2.5 rounded-[10px] text-[13px] font-medium transition-all duration-150 hover:border-[#3a3a3a]"
              style={{ border: '1px solid #1f1f1f', color: '#ededed', background: 'transparent' }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              GitHub
            </button>
          </div>

          <div className="relative flex items-center gap-3">
            <div className="flex-1 h-px" style={{ background: '#1f1f1f' }} />
            <span className="text-[11px]" style={{ color: '#8a8a8a' }}>or</span>
            <div className="flex-1 h-px" style={{ background: '#1f1f1f' }} />
          </div>

          {/* Email */}
          <div>
            <label className="block text-[12px] font-semibold uppercase tracking-[0.4px] mb-[6px]" style={{ color: '#8a8a8a' }} htmlFor="login-email">Email address</label>
            <input
              id="login-email"
              type="email"
              className="input-base"
              placeholder="you@company.com"
              {...loginForm.register('email', {
                required: 'Email is required',
                pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email address' },
              })}
            />
            {loginForm.formState.errors.email && (
              <p className="text-[11px] mt-1" style={{ color: '#f87171' }}>{loginForm.formState.errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between mb-[6px]">
              <label className="block text-[12px] font-semibold uppercase tracking-[0.4px]" style={{ color: '#8a8a8a' }} htmlFor="login-password">Password</label>
              <a href="#" className="text-[11px] font-semibold transition-opacity hover:opacity-70" style={{ color: '#ededed' }}>Forgot password?</a>
            </div>
            <div className="relative">
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                className="input-base pr-10"
                placeholder="Your password"
                {...loginForm.register('password', {
                  required: 'Password is required',
                  minLength: { value: 8, message: 'Password must be at least 8 characters' },
                })}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
                style={{ color: '#8a8a8a' }}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
            {loginForm.formState.errors.password && (
              <p className="text-[11px] mt-1" style={{ color: '#f87171' }}>{loginForm.formState.errors.password.message}</p>
            )}
          </div>

          {/* Remember me */}
          <div className="flex items-center gap-2.5">
            <input
              id="remember-me"
              type="checkbox"
              className="w-4 h-4 rounded"
              style={{ accentColor: '#ededed' }}
              {...loginForm.register('rememberMe')}
            />
            <label htmlFor="remember-me" className="text-[12px] cursor-pointer" style={{ color: '#8a8a8a' }}>Remember me for 30 days</label>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary w-full flex items-center justify-center gap-2 text-[14px] min-h-[44px] rounded-[10px]"
          >
            {isLoading ? (
              <><Loader2 size={15} className="animate-spin" /><span>Logging in…</span></>
            ) : (
              'Log In to FounderMark'
            )}
          </button>

          <p className="text-center text-[13px]" style={{ color: '#8a8a8a' }}>
            Don&apos;t have an account?{' '}
            <button type="button" onClick={() => setTab('signup')} className="font-semibold transition-opacity hover:opacity-70" style={{ color: '#ededed' }}>Sign up free</button>
          </p>
        </form>
      ) : (
        <form onSubmit={handleSignup} className="space-y-5">
          <div className="text-center mb-6">
            <h1 className="text-[22px] font-bold tracking-[-0.4px]" style={{ color: '#ededed' }}>Start building your audience</h1>
            <p className="text-[13px] mt-[4px]" style={{ color: '#8a8a8a' }}>Free account · No credit card required</p>
          </div>

          {/* Social auth */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className="flex items-center justify-center gap-2.5 px-4 py-2.5 rounded-[10px] text-[13px] font-medium transition-all duration-150 hover:border-[#3a3a3a] disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ border: '1px solid #1f1f1f', color: '#ededed', background: 'transparent' }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
              Google
            </button>
            <button
              type="button"
              className="flex items-center justify-center gap-2.5 px-4 py-2.5 rounded-[10px] text-[13px] font-medium transition-all duration-150 hover:border-[#3a3a3a]"
              style={{ border: '1px solid #1f1f1f', color: '#ededed', background: 'transparent' }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              GitHub
            </button>
          </div>

          <div className="relative flex items-center gap-3">
            <div className="flex-1 h-px" style={{ background: '#1f1f1f' }} />
            <span className="text-[11px]" style={{ color: '#8a8a8a' }}>or</span>
            <div className="flex-1 h-px" style={{ background: '#1f1f1f' }} />
          </div>

          {/* Full name */}
          <div>
            <label className="block text-[12px] font-semibold uppercase tracking-[0.4px] mb-[6px]" style={{ color: '#8a8a8a' }} htmlFor="signup-name">Full name</label>
            <input
              id="signup-name"
              type="text"
              className="input-base"
              placeholder="Priya Sharma"
              {...signupForm.register('fullName', { required: 'Full name is required' })}
            />
            {signupForm.formState.errors.fullName && (
              <p className="text-[11px] mt-1" style={{ color: '#f87171' }}>{signupForm.formState.errors.fullName.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-[12px] font-semibold uppercase tracking-[0.4px] mb-[6px]" style={{ color: '#8a8a8a' }} htmlFor="signup-email">Work email</label>
            <input
              id="signup-email"
              type="email"
              className="input-base"
              placeholder="you@yourproduct.com"
              {...signupForm.register('email', {
                required: 'Email is required',
                pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email address' },
              })}
            />
            {signupForm.formState.errors.email && (
              <p className="text-[11px] mt-1" style={{ color: '#f87171' }}>{signupForm.formState.errors.email.message}</p>
            )}
          </div>

          {/* Product name */}
          <div>
            <label className="block text-[12px] font-semibold uppercase tracking-[0.4px] mb-[6px]" style={{ color: '#8a8a8a' }} htmlFor="signup-product">Product name</label>
            <p className="text-[11px] mb-[6px]" style={{ color: '#8a8a8a' }}>This helps us personalize your AI-generated content</p>
            <input
              id="signup-product"
              type="text"
              className="input-base"
              placeholder="e.g. BuildFast, Launchpad, Kite"
              {...signupForm.register('productName', { required: 'Product name is required' })}
            />
            {signupForm.formState.errors.productName && (
              <p className="text-[11px] mt-1" style={{ color: '#f87171' }}>{signupForm.formState.errors.productName.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-[12px] font-semibold uppercase tracking-[0.4px] mb-[6px]" style={{ color: '#8a8a8a' }} htmlFor="signup-password">Password</label>
            <p className="text-[11px] mb-[6px]" style={{ color: '#8a8a8a' }}>At least 8 characters</p>
            <div className="relative">
              <input
                id="signup-password"
                type={showPassword ? 'text' : 'password'}
                className="input-base pr-10"
                placeholder="Create a strong password"
                {...signupForm.register('password', {
                  required: 'Password is required',
                  minLength: { value: 8, message: 'Must be at least 8 characters' },
                })}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
                style={{ color: '#8a8a8a' }}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
            {signupForm.formState.errors.password && (
              <p className="text-[11px] mt-1" style={{ color: '#f87171' }}>{signupForm.formState.errors.password.message}</p>
            )}
          </div>

          {/* Terms */}
          <div className="flex items-start gap-2.5">
            <input
              id="terms"
              type="checkbox"
              className="w-4 h-4 rounded mt-0.5"
              style={{ accentColor: '#ededed' }}
              {...signupForm.register('terms', { required: 'You must accept the terms to continue' })}
            />
            <label htmlFor="terms" className="text-[12px] cursor-pointer leading-relaxed" style={{ color: '#8a8a8a' }}>
              I agree to FounderMark&apos;s{' '}
              <a href="#" className="font-semibold transition-opacity hover:opacity-70" style={{ color: '#ededed' }}>Terms of Service</a>
              {' '}and{' '}
              <a href="#" className="font-semibold transition-opacity hover:opacity-70" style={{ color: '#ededed' }}>Privacy Policy</a>
            </label>
          </div>
          {signupForm.formState.errors.terms && (
            <p className="text-[11px]" style={{ color: '#f87171' }}>{signupForm.formState.errors.terms.message}</p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary w-full flex items-center justify-center gap-2 text-[14px] min-h-[44px] rounded-[10px]"
          >
            {isLoading ? (
              <><Loader2 size={15} className="animate-spin" /><span>Creating your account…</span></>
            ) : (
              'Create Free Account'
            )}
          </button>

          <p className="text-center text-[13px]" style={{ color: '#8a8a8a' }}>
            Already have an account?{' '}
            <button type="button" onClick={() => setTab('login')} className="font-semibold transition-opacity hover:opacity-70" style={{ color: '#ededed' }}>Log in</button>
          </p>
        </form>
      )}
    </div>
  );
}