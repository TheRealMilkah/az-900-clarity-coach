import { useState, type FormEvent } from 'react';
import { GraduationCap, Eye, EyeOff, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';
import type { ViewId } from '@/App';
import { useAuth } from '@/hooks/useAuth';

interface SignUpViewProps {
  onNavigate: (view: ViewId) => void;
}

export function SignUpView({ onNavigate }: SignUpViewProps) {
  const { signUp } = useAuth();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  function validate(): string | null {
    if (!fullName.trim()) return 'Please enter your full name.';
    if (!email.trim()) return 'Please enter your email address.';
    if (!email.includes('@')) return 'Please enter a valid email address.';
    if (password.length < 6) return 'Password must be at least 6 characters.';
    if (password !== confirmPassword) return 'Passwords do not match.';
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
    const { error: signUpError } = await signUp({
      email: email.trim(),
      password,
      displayName: fullName.trim(),
    });
    setSubmitting(false);
    if (signUpError) {
      setError(signUpError);
      return;
    }
    // Auth state change will redirect to learning space
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
            Start your AZ-900 journey
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-navy-500">
            Create a free account to keep your practice progress and learning
            activity in one place.
          </p>

          {error && (
            <div className="mt-5 flex items-start gap-2 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3">
              <AlertCircle className="mt-0.5 h-4 w-4 flex-none text-rose-500" />
              <p className="text-sm text-rose-700">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <Field label="Full name" htmlFor="fullName">
              <input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Jane Doe"
                className="auth-input"
                autoComplete="name"
                disabled={submitting}
              />
            </Field>

            <Field label="Email address" htmlFor="email">
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
            </Field>

            <Field label="Password" htmlFor="password">
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="auth-input pr-10"
                  autoComplete="new-password"
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
            </Field>

            <Field label="Confirm password" htmlFor="confirmPassword">
              <input
                id="confirmPassword"
                type={showPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter your password"
                className="auth-input"
                autoComplete="new-password"
                disabled={submitting}
              />
            </Field>

            <button type="submit" className="btn-primary w-full" disabled={submitting}>
              {submitting ? 'Creating account...' : 'Create Free Account'}
              {!submitting && <ArrowRight className="h-4 w-4" />}
            </button>
          </form>

          <p className="mt-5 flex items-start gap-2 rounded-xl bg-navy-50 px-4 py-3 text-xs leading-relaxed text-navy-500">
            <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 flex-none text-azure-500" />
            Your account is used for learning progress, practice history, and
            study preferences. We do not ask for unnecessary personal information.
          </p>
        </div>

        <p className="mt-6 text-center text-sm text-navy-500">
          Already have an account?{' '}
          <button
            onClick={() => onNavigate('signin')}
            className="font-semibold text-azure-600 hover:text-azure-700"
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
}

function Field({ label, htmlFor, children }: { label: string; htmlFor: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-semibold text-navy-700">
        {label}
      </label>
      {children}
    </div>
  );
}
