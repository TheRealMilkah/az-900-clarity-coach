import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';

export interface UserProfile {
  id: string;
  display_name: string;
  email: string;
}

interface AuthState {
  session: Session | null;
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
}

interface AuthContextValue extends AuthState {
  signUp: (params: { email: string; password: string; displayName: string }) => Promise<{ error: string | null }>;
  signIn: (params: { email: string; password: string }) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: string | null }>;
  updatePassword: (newPassword: string) => Promise<{ error: string | null }>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function mapError(message: string): string {
  const m = message.toLowerCase();
  if (m.includes('already registered') || m.includes('already been registered')) {
    return 'An account with this email already exists. Try signing in instead.';
  }
  if (m.includes('invalid login') || m.includes('invalid credentials')) {
    return 'Incorrect email or password. Please try again.';
  }
  if (m.includes('email not confirmed')) {
    return 'Email confirmation is required. Please check your inbox.';
  }
  if (m.includes('password') && m.includes('at least')) {
    return 'Password must be at least 6 characters.';
  }
  if (m.includes('network') || m.includes('fetch')) {
    return 'A network error occurred. Please check your connection and try again.';
  }
  return message;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    session: null,
    user: null,
    profile: null,
    loading: true,
  });

  const fetchProfile = useCallback(async (user: User): Promise<UserProfile | null> => {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('id, display_name')
      .eq('id', user.id)
      .maybeSingle();
    if (error) return null;
    if (data) {
      return { id: data.id, display_name: data.display_name, email: user.email ?? '' };
    }
    return null;
  }, []);

  useEffect(() => {
    let mounted = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      const session = data.session;
      if (session?.user) {
        fetchProfile(session.user).then((profile) => {
          if (!mounted) return;
          setState({ session, user: session.user, profile, loading: false });
        });
      } else {
        setState({ session: null, user: null, profile: null, loading: false });
      }
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      (async () => {
        if (!mounted) return;
        if (session?.user) {
          const profile = await fetchProfile(session.user);
          if (!mounted) return;
          setState({ session, user: session.user, profile, loading: false });
        } else {
          setState({ session: null, user: null, profile: null, loading: false });
        }
      })();
    });

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, [fetchProfile]);

  const signUp = useCallback<AuthContextValue['signUp']>(
    async ({ email, password, displayName }) => {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { display_name: displayName } },
      });
      if (error) return { error: mapError(error.message) };
      if (data.user) {
        const { error: profileError } = await supabase
          .from('user_profiles')
          .insert({ id: data.user.id, display_name: displayName });
        if (profileError) {
          // profile insert failed but auth succeeded; session will still be set
          return { error: null };
        }
      }
      return { error: null };
    },
    [],
  );

  const signIn = useCallback<AuthContextValue['signIn']>(async ({ email, password }) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { error: mapError(error.message) };
    return { error: null };
  }, []);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    setState({ session: null, user: null, profile: null, loading: false });
  }, []);

  const resetPassword = useCallback<AuthContextValue['resetPassword']>(async (email) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/#/reset-password`,
    });
    if (error) return { error: mapError(error.message) };
    return { error: null };
  }, []);

  const updatePassword = useCallback<AuthContextValue['updatePassword']>(async (newPassword) => {
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) return { error: mapError(error.message) };
    return { error: null };
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, signUp, signIn, signOut, resetPassword, updatePassword }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
