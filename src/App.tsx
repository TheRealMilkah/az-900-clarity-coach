import { useState, useEffect, type ReactNode } from 'react';
import { GraduationCap, Loader2 } from 'lucide-react';
import { Sidebar } from '@/components/Sidebar';
import { TopBar } from '@/components/TopBar';
import { HomeView } from '@/components/HomeView';
import { QuizView } from '@/components/QuizView';
import { ExamTrapsView } from '@/components/ExamTrapsView';
import { InsightsView } from '@/components/InsightsView';
import { LandingView } from '@/components/LandingView';
import { AboutView } from '@/components/AboutView';
import { SignUpView } from '@/components/SignUpView';
import { SignInView } from '@/components/SignInView';
import { ForgotPasswordView } from '@/components/ForgotPasswordView';
import { ResetPasswordView } from '@/components/ResetPasswordView';
import { LearningSpaceView } from '@/components/LearningSpaceView';
import { ProgressView } from '@/components/ProgressView';
import { AccountView } from '@/components/AccountView';
import { PublicNav } from '@/components/PublicNav';
import { useProgress } from '@/hooks/useProgress';
import { AuthProvider, useAuth } from '@/hooks/useAuth';

export type ViewId =
  | 'landing'
  | 'about'
  | 'practice'
  | 'signal'
  | 'traps'
  | 'insights'
  | 'signin'
  | 'signup'
  | 'forgot-password'
  | 'reset-password'
  | 'learning-space'
  | 'progress'
  | 'account'
  | 'home';

// Views that require authentication
const PROTECTED_VIEWS: ViewId[] = [
  'learning-space',
  'progress',
  'account',
  'home',
];

// Views that use the public layout (no sidebar)
const PUBLIC_LAYOUT_VIEWS: ViewId[] = [
  'landing',
  'about',
  'signin',
  'signup',
  'forgot-password',
  'reset-password',
];

// Authenticated sidebar views with their topbar meta
const AUTH_META: Partial<Record<ViewId, { title: string; subtitle: string }>> = {
  'learning-space': { title: 'Learning Space', subtitle: 'Your AZ-900 study home' },
  practice: { title: 'Practice', subtitle: 'Read the question. Spot the clue. Choose.' },
  signal: { title: 'Spot the Signal', subtitle: 'Learn to read the wording that points to the answer' },
  traps: { title: 'Exam Traps', subtitle: 'Tell apart the services that sound alike' },
  insights: { title: 'Insights', subtitle: 'Your practice performance at a glance' },
  progress: { title: 'Your Progress', subtitle: 'See how your practice is developing' },
  account: { title: 'Your Account', subtitle: 'Manage your profile' },
  home: { title: 'Dashboard', subtitle: 'Your AZ-900 study home' },
};

function AppContent() {
  const { user, profile, loading: authLoading, signOut } = useAuth();
  const [view, setView] = useState<ViewId>('landing');
  const [mobileOpen, setMobileOpen] = useState(false);
  const { results, recordResult, reset, loading: progressLoading } = useProgress();

  const isAuthenticated = Boolean(user);

  // Redirect logic: protected views require auth, auth pages redirect when logged in
  useEffect(() => {
    if (authLoading) return;

    if (isAuthenticated) {
      // If on a public-only page (landing, signin, signup, about), go to learning space.
      // But don't redirect from reset-password — the user is mid-recovery flow.
      if (view === 'signin' || view === 'signup' || view === 'landing' || view === 'forgot-password') {
        setView('learning-space');
      }
    } else {
      // If on a protected view and not authenticated, redirect to landing
      if (PROTECTED_VIEWS.includes(view)) {
        setView('landing');
      }
    }
  }, [authLoading, isAuthenticated, view]);

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  const navigate = (next: ViewId) => setView(next);

  // Detect hash-based routes (used by password recovery redirect)
  useEffect(() => {
    function checkHash() {
      const hash = window.location.hash;
      if (hash.includes('reset-password')) {
        setView('reset-password');
        // Clean the URL so a refresh doesn't re-trigger the view
        window.history.replaceState(null, '', window.location.pathname);
      }
    }
    checkHash();
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    setView('landing');
  };

  // Show loading screen while auth state is being determined
  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-azure-50">
        <div className="flex flex-col items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-azure-500 to-azure-700 text-white shadow-sm">
            <GraduationCap className="h-6 w-6" strokeWidth={2.2} />
          </div>
          <div className="flex items-center gap-2 text-sm text-navy-400">
            <Loader2 className="h-4 w-4 animate-spin" />
            Loading...
          </div>
        </div>
      </div>
    );
  }

  // Public layout pages (landing, about, signin, signup)
  if (PUBLIC_LAYOUT_VIEWS.includes(view) || (!isAuthenticated && view === 'practice')) {
    // Practice is accessible to unauthenticated users but uses public nav
    const usePublicNav = view !== 'signin' && view !== 'signup' && view !== 'forgot-password' && view !== 'reset-password';

    return (
      <div className="min-h-screen bg-white">
        {usePublicNav && <PublicNav current={view} onNavigate={navigate} />}
        {view === 'landing' && <LandingView onNavigate={navigate} />}
        {view === 'about' && <AboutView onNavigate={navigate} />}
        {view === 'signup' && <SignUpView onNavigate={navigate} />}
        {view === 'signin' && <SignInView onNavigate={navigate} />}
        {view === 'forgot-password' && <ForgotPasswordView onNavigate={navigate} />}
        {view === 'reset-password' && <ResetPasswordView onNavigate={navigate} />}
        {view === 'practice' && !isAuthenticated && (
          <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
            <QuizView
              mode="practice"
              results={results}
              onAnswered={recordResult}
              onNavigateInsights={() => navigate('practice')}
            />
          </div>
        )}
      </div>
    );
  }

  // If not authenticated and trying to access a protected view, show landing
  if (!isAuthenticated && PROTECTED_VIEWS.includes(view)) {
    return (
      <div className="min-h-screen bg-white">
        <PublicNav current="landing" onNavigate={navigate} />
        <LandingView onNavigate={navigate} />
      </div>
    );
  }

  // Authenticated layout (sidebar + topbar)
  const meta = AUTH_META[view] ?? { title: 'Clarity Coach', subtitle: '' };
  const displayName = profile?.display_name ?? 'Learner';

  return (
    <div className="min-h-screen bg-azure-50">
      <Sidebar
        current={view}
        onNavigate={navigate}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
        displayName={displayName}
        onSignOut={handleSignOut}
      />
      <div className="lg:pl-64">
        <TopBar
          title={meta.title}
          subtitle={meta.subtitle}
          onOpenMobile={() => setMobileOpen(true)}
        />
        <main>
          {view === 'learning-space' && (
            <LearningSpaceView
              displayName={displayName}
              results={results}
              loading={progressLoading}
              onNavigate={navigate}
            />
          )}
          {view === 'practice' && (
            <QuizView
              mode="practice"
              results={results}
              onAnswered={recordResult}
              onNavigateInsights={() => navigate('insights')}
            />
          )}
          {view === 'signal' && (
            <QuizView
              mode="signal"
              results={results}
              onAnswered={recordResult}
              onNavigateInsights={() => navigate('insights')}
            />
          )}
          {view === 'traps' && <ExamTrapsView />}
          {view === 'insights' && (
            <InsightsView results={results} onNavigate={navigate} />
          )}
          {view === 'progress' && (
            <ProgressView
              results={results}
              loading={progressLoading}
              onNavigate={navigate}
            />
          )}
          {view === 'account' && <AccountView onNavigate={navigate} />}
          {view === 'home' && (
            <HomeView results={results} onNavigate={navigate} onReset={reset} />
          )}
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
