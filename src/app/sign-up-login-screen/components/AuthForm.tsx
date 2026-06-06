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
  const { signIn, signUp } = useAuth();
  const router = useRouter();

  const signupForm = useForm<SignUpData>({ mode: 'onBlur' });
  const loginForm = useForm<LoginData>({ mode: 'onBlur' });

  const handleSignup = signupForm.handleSubmit(async (data) => {
    if (!data.terms) return;
    setIsLoading(true);
    try {
      await signUp(data.email, data.password, {
        fullName: data.fullName,
      });
      toast.success(`Welcome to FounderMark, ${data.fullName.split(' ')[0]}! Let's set up your product.`);
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
        <AppLogo size={32} />
        <span className="font-bold text-lg text-foreground">FounderMark</span>
      </div>

      {/* Tab switcher */}
      <div className="flex bg-muted rounded-xl p-1 mb-8">
        {(['login', 'signup'] as const).map((t) => (
          <button
            key={`tab-${t}`}
            onClick={() => setTab(t)}
            className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all duration-150 ${
              tab === t
                ? 'bg-card text-foreground shadow-card'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {t === 'login' ? 'Log In' : 'Sign Up'}
          </button>
        ))}
      </div>

      {tab === 'login' ? (
        <form onSubmit={handleLogin} className="space-y-5">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-foreground">Welcome back</h1>
            <p className="text-sm text-muted-foreground mt-1">Log in to continue generating content</p>
          </div>

          {/* Social auth */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              className="flex items-center justify-center gap-2.5 px-4 py-2.5 border border-border rounded-xl text-sm font-medium text-foreground hover:bg-muted transition-all duration-150 active:scale-95"
            >
              <svg width="16" height="16" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
              Google
            </button>
            <button
              type="button"
              className="flex items-center justify-center gap-2.5 px-4 py-2.5 border border-border rounded-xl text-sm font-medium text-foreground hover:bg-muted transition-all duration-150 active:scale-95"
            >
              <svg width="16" height="16" viewBox="0 0 24 24"><path fill="#181717" d="M2.56 12.25c0-5.42 4.48-9.89 9.89-9.89s9.89 4.47 9.89 9.89-4.48 9.89-9.89 9.89S2.56 17.67 2.56 12.25z"/><path fill="#181717" d="M12 23c7.16 0 12-2.84 12-6s-4.84-6-12-6S0 9.16 0 12s4.84 6 12 6z"/><path fill="#181717" d="M6.14 10.59l4.12-4.12L12 6l6 6l-6 6l-6-6z"/></svg>
              GitHub
            </button>
          </div>

          <div className="relative flex items-center gap-3">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-muted-foreground">or</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-1.5" htmlFor="login-email">
              Email address
            </label>
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
              <p className="text-xs text-rose-500 mt-1.5">{loginForm.formState.errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-sm font-semibold text-foreground" htmlFor="login-password">
                Password
              </label>
              <a href="#" className="text-xs text-primary hover:text-violet-700 font-medium transition-colors">
                Forgot password?
              </a>
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
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {loginForm.formState.errors.password && (
              <p className="text-xs text-rose-500 mt-1.5">{loginForm.formState.errors.password.message}</p>
            )}
          </div>

          {/* Remember me */}
          <div className="flex items-center gap-2.5">
            <input
              id="remember-me"
              type="checkbox"
              className="w-4 h-4 rounded accent-primary"
              {...loginForm.register('rememberMe')}
            />
            <label htmlFor="remember-me" className="text-sm text-muted-foreground cursor-pointer">
              Remember me for 30 days
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary w-full flex items-center justify-center gap-2 text-sm"
          >
            {isLoading ? (
              <>
                <Loader2 size={15} className="animate-spin" />
                <span>Logging in…</span>
              </>
            ) : (
              'Log In to FounderMark'
            )}
          </button>

          <p className="text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{' '}
            <button type="button" onClick={() => setTab('signup')} className="text-primary font-semibold hover:text-violet-700 transition-colors">
              Sign up free
            </button>
          </p>
        </form>
      ) : (
        <form onSubmit={handleSignup} className="space-y-5">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-foreground">Start building your audience</h1>
            <p className="text-sm text-muted-foreground mt-1">Free account · No credit card required</p>
          </div>

          {/* Social auth */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              className="flex items-center justify-center gap-2.5 px-4 py-2.5 border border-border rounded-xl text-sm font-medium text-foreground hover:bg-muted transition-all duration-150 active:scale-95"
            >
              <svg width="16" height="16" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
              Google
            </button>
            <button
              type="button"
              className="flex items-center justify-center gap-2.5 px-4 py-2.5 border border-border rounded-xl text-sm font-medium text-foreground hover:bg-muted transition-all duration-150 active:scale-95"
            >
              <svg width="16" height="16" viewBox="0 0 24 24"><path fill="#181717" d="M2.56 12.25c0-5.42 4.48-9.89 9.89-9.89s9.89 4.47 9.89 9.89-4.48 9.89-9.89 9.89S2.56 17.67 2.56 12.25z"/><path fill="#181717" d="M12 23c7.16 0 12-2.84 12-6s-4.84-6-12-6S0 9.16 0 12s4.84 6 12 6z"/><path fill="#181717" d="M6.14 10.59l4.12-4.12L12 6l6 6l-6 6l-6-6z"/></svg>
              GitHub
            </button>
          </div>

          <div className="relative flex items-center gap-3">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-muted-foreground">or</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Full name */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-1.5" htmlFor="signup-name">
              Full name
            </label>
            <input
              id="signup-name"
              type="text"
              className="input-base"
              placeholder="Priya Sharma"
              {...signupForm.register('fullName', { required: 'Full name is required' })}
            />
            {signupForm.formState.errors.fullName && (
              <p className="text-xs text-rose-500 mt-1.5">{signupForm.formState.errors.fullName.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-1.5" htmlFor="signup-email">
              Work email
            </label>
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
              <p className="text-xs text-rose-500 mt-1.5">{signupForm.formState.errors.email.message}</p>
            )}
          </div>

          {/* Product name */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-1.5" htmlFor="signup-product">
              Product name
            </label>
            <p className="text-xs text-muted-foreground mb-1.5">This helps us personalize your AI-generated content</p>
            <input
              id="signup-product"
              type="text"
              className="input-base"
              placeholder="e.g. BuildFast, Launchpad, Kite"
              {...signupForm.register('productName', { required: 'Product name is required' })}
            />
            {signupForm.formState.errors.productName && (
              <p className="text-xs text-rose-500 mt-1.5">{signupForm.formState.errors.productName.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-1.5" htmlFor="signup-password">
              Password
            </label>
            <p className="text-xs text-muted-foreground mb-1.5">At least 8 characters</p>
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
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {signupForm.formState.errors.password && (
              <p className="text-xs text-rose-500 mt-1.5">{signupForm.formState.errors.password.message}</p>
            )}
          </div>

          {/* Terms */}
          <div className="flex items-start gap-2.5">
            <input
              id="terms"
              type="checkbox"
              className="w-4 h-4 rounded mt-0.5 accent-primary"
              {...signupForm.register('terms', { required: 'You must accept the terms to continue' })}
            />
            <label htmlFor="terms" className="text-sm text-muted-foreground cursor-pointer leading-relaxed">
              I agree to FounderMark&apos;s{' '}
              <a href="#" className="text-primary hover:text-violet-700 font-medium transition-colors">Terms of Service</a>
              {' '}and{' '}
              <a href="#" className="text-primary hover:text-violet-700 font-medium transition-colors">Privacy Policy</a>
            </label>
          </div>
          {signupForm.formState.errors.terms && (
            <p className="text-xs text-rose-500">{signupForm.formState.errors.terms.message}</p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary w-full flex items-center justify-center gap-2 text-sm"
          >
            {isLoading ? (
              <>
                <Loader2 size={15} className="animate-spin" />
                <span>Creating your account…</span>
              </>
            ) : (
              'Create Free Account'
            )}
          </button>

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{' '}
            <button type="button" onClick={() => setTab('login')} className="text-primary font-semibold hover:text-violet-700 transition-colors">
              Log in
            </button>
          </p>
        </form>
      )}
    </div>
  );
}