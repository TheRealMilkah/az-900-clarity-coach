import { useState, useEffect, type FormEvent } from 'react';
import {
  GraduationCap, Eye, EyeOff, ArrowRight, AlertCircle, ArrowLeft,
  CheckCircle2, Loader2,
} from 'lucide-react';
import type { ViewId } from '@/App';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/supabase';

interface ResetPasswordViewProps {
  onNavigate: (view: ViewId) => void;
}

export function ResetPasswordView({ onNavigate }: ResetPasswordViewProps) {
  const { updatePassword } = useAuth();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [ready, setReady] = useState(false);
  const [checking, setChecking] = useState(true);

  // The PASSWORD_RECOVERY event from onAuthStateChange sets a session, making
  // updateUser available. We wait for the auth state to settle before showing
  // the form. If no valid recovery session exists, show the expired-link state.
  useEffect(() => {
    let mounted = true;
    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      if (data.session) {
        setReady(true);
      }
      setChecking(false);
    });
    return () => { mounted = false; };
  }, []);

  function validate(): string | null {
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
    const { error: updateError } = await updatePassword(password);
    setSubmitting(false);
    if (updateError) {
      setError(updateError);
      return;
    }
    setSuccess(true);
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
          {checking ? (
            <div className="flex flex-col items-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-azure-500" />
              <p className="mt-4 text-sm text-navy-400">Verifying your reset link...</p>
            </div>
          ) : success ? (
            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-500">
                <CheckCircle2 className="h-7 w-7" />
              </div>
              <h1 className="mt-5 text-2xl font-bold text-navy-800">Password updated</h1>
              <p className="mt-3 text-sm leading-relaxed text-navy-500">
                Your password has been changed successfully. You can now sign in
                with your new password.
              </p>
              <button
                className="btn-primary mt-6 w-full"
                onClick={() => onNavigate('signin')}
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Sign In
              </button>
            </div>
          ) : !ready ? (
            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-rose-50 text-rose-500">
                <AlertCircle className="h-7 w-7" />
              </div>
              <h1 className="mt-5 text-2xl font-bold text-navy-800">
                This link has expired
              </h1>
              <p className="mt-3 text-sm leading-relaxed text-navy-500">
                The password reset link is invalid or has expired. Reset links are
                valid for one hour. Please request a new link to continue.
              </p>
              <button
                className="btn-primary mt-6 w-full"
                onClick={() => onNavigate('forgot-password')}
              >
                Request a new reset link
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <>
              <h1 className="text-2xl font-bold text-navy-800">
                Set a new password
              </h1>
              <p className="mt-2 text-sm leading-relaxed text-navy-500">
                Enter your new password below. Make sure it's at least 6 characters.
              </p>

              {error && (
                <div className="mt-5 flex items-start gap-2 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3">
                  <AlertCircle className="mt-0.5 h-4 w-4 flex-none text-rose-500" />
                  <p className="text-sm text-rose-700">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div>
                  <label htmlFor="new-password" className="mb-1.5 block text-sm font-semibold text-navy-700">
                    New password
                  </label>
                  <div className="relative">
                    <input
                      id="new-password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="At least 6 characters"
                      className="auth-input pr-10"
                      autoComplete="new-password"
                      disabled={submitting}
                      autoFocus
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

                <div>
                  <label htmlFor="confirm-new-password" className="mb-1.5 block text-sm font-semibold text-navy-700">
                    Confirm new password
                  </label>
                  <input
                    id="confirm-new-password"
                    type={showPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter your new password"
                    className="auth-input"
                    autoComplete="new-password"
                    disabled={submitting}
                  />
                </div>

                <button type="submit" className="btn-primary w-full" disabled={submitting}>
                  {submitting ? 'Updating...' : 'Reset Password'}
                  {!submitting && <ArrowRight className="h-4 w-4" />}
                </button>
              </form>
            </>
          )}
        </div>

        {success && (
          <p className="mt-6 text-center text-sm text-navy-500">
            <button
              onClick={() => onNavigate('signin')}
              className="font-semibold text-azure-600 hover:text-azure-700"
            >
              Back to Sign In
            </button>
          </p>
        )}
      </div>
    </div>
  );
}
