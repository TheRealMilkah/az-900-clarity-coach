import { useState, type FormEvent } from 'react';
import { GraduationCap, Mail, ArrowRight, AlertCircle, ArrowLeft, CheckCircle2 } from 'lucide-react';
import type { ViewId } from '@/App';
import { useAuth } from '@/hooks/useAuth';

interface ForgotPasswordViewProps {
  onNavigate: (view: ViewId) => void;
}

export function ForgotPasswordView({ onNavigate }: ForgotPasswordViewProps) {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (!email.trim()) {
      setError('Please enter your email address.');
      return;
    }
    if (!email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    setSubmitting(true);
    const { error: resetError } = await resetPassword(email.trim());
    setSubmitting(false);
    if (resetError) {
      setError(resetError);
      return;
    }
    setSent(true);
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
          {sent ? (
            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-500">
                <CheckCircle2 className="h-7 w-7" />
              </div>
              <h1 className="mt-5 text-2xl font-bold text-navy-800">Check your email</h1>
              <p className="mt-3 text-sm leading-relaxed text-navy-500">
                If an account exists for <span className="font-semibold text-navy-700">{email.trim()}</span>,
                we've sent a password reset link. The link will expire in one hour.
              </p>
              <p className="mt-3 text-xs leading-relaxed text-navy-400">
                Don't see the email? Check your spam folder, or try again with a different address.
              </p>
              <button
                className="btn-secondary mt-6 w-full"
                onClick={() => onNavigate('signin')}
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Sign In
              </button>
            </div>
          ) : (
            <>
              <h1 className="text-2xl font-bold text-navy-800">
                Forgot your password?
              </h1>
              <p className="mt-2 text-sm leading-relaxed text-navy-500">
                Enter your email address and we'll send you a secure link to reset
                your password.
              </p>

              {error && (
                <div className="mt-5 flex items-start gap-2 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3">
                  <AlertCircle className="mt-0.5 h-4 w-4 flex-none text-rose-500" />
                  <p className="text-sm text-rose-700">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div>
                  <label htmlFor="reset-email" className="mb-1.5 block text-sm font-semibold text-navy-700">
                    Email address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-300" />
                    <input
                      id="reset-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="jane@example.com"
                      className="auth-input pl-10"
                      autoComplete="email"
                      disabled={submitting}
                      autoFocus
                    />
                  </div>
                </div>

                <button type="submit" className="btn-primary w-full" disabled={submitting}>
                  {submitting ? 'Sending...' : 'Send Reset Link'}
                  {!submitting && <ArrowRight className="h-4 w-4" />}
                </button>
              </form>
            </>
          )}
        </div>

        <p className="mt-6 text-center text-sm text-navy-500">
          Remember your password?{' '}
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
