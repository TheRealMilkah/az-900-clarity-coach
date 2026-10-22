import { useState, type FormEvent } from 'react';
import { GraduationCap, Eye, EyeOff, ArrowRight, AlertCircle } from 'lucide-react';
import type { ViewId } from '@/App';
import { useAuth } from '@/hooks/useAuth';

interface SignInViewProps {
  onNavigate: (view: ViewId) => void;
}

export function SignInView({ onNavigate }: SignInViewProps) {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  function validate(): string | null {
    if (!email.trim()) return 'Please enter your email address.';
    if (!email.includes('@')) return 'Please enter a valid email address.';
    if (!password) return 'Please enter your password.';
    return null;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    setSubmitting(true);
    const { error: signInError } = await signIn({
      email: email.trim(),
      password,
    });
    setSubmitting(false);
    if (signInError) {
      setError(signInError);
      return;
    }
    onNavigate('learning-space');
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-azure-50 via-white to-azure-50">
      <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-4 py-10 sm:px-6">
        {/* Logo */}
        <button
          onClick={() => onNavigate('landing')}
          className="mx-auto flex items-center gap-2.5"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-azure-500 to-azure-700 text-white shadow-sm">
            <GraduationCap className="h-5 w-5" strokeWidth={2.2} />
          </div>
          <span className="text-sm font-bold uppercase tracking-wide text-navy-800">
            AZ-900 Clarity Coach
          </span>
        </button>

        <div className="card mt-8 p-6 sm:p-8">
          <h1 className="text-2xl font-bold text-navy-800">
            Welcome back
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-navy-500">
            Sign in to continue your AZ-900 learning journey.
          </p>

          {error && (
            <div className="mt-5 flex items-start gap-2 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3">
              <AlertCircle className="mt-0.5 h-4 w-4 flex-none text-rose-500" />
              <p className="text-sm text-rose-700">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-navy-700">
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="jane@example.com"
                className="auth-input"
                autoComplete="email"
                disabled={submitting}
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-1.5 block text-sm font-semibold text-navy-700">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Your password"
                  className="auth-input pr-10"
                  autoComplete="current-password"
                  disabled={submitting}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-navy-400 hover:text-navy-600"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <button type="submit" className="btn-primary w-full" disabled={submitting}>
              {submitting ? 'Signing in...' : 'Sign In'}
              {!submitting && <ArrowRight className="h-4 w-4" />}
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-sm text-navy-500">
          New to AZ-900 Clarity Coach?{' '}
          <button
            onClick={() => onNavigate('signup')}
            className="font-semibold text-azure-600 hover:text-azure-700"
          >
            Create an account
          </button>
        </p>
      </div>
    </div>
  );
}
