import { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { TopBar } from '@/components/TopBar';
import { HomeView } from '@/components/HomeView';
import { QuizView } from '@/components/QuizView';
import { ExamTrapsView } from '@/components/ExamTrapsView';
import { InsightsView } from '@/components/InsightsView';
import { useProgress } from '@/hooks/useProgress';

export type ViewId = 'home' | 'quiz' | 'signal' | 'traps' | 'insights';

const META: Record<ViewId, { title: string; subtitle: string }> = {
  home: { title: 'Dashboard', subtitle: 'Your AZ-900 study home' },
  quiz: { title: 'Practice', subtitle: 'Read the question. Spot the clue. Choose.' },
  signal: { title: 'Spot the Signal', subtitle: 'Learn to read the wording that points to the answer' },
  traps: { title: 'Exam Traps', subtitle: 'Tell apart the services that sound alike' },
  insights: { title: 'Insights', subtitle: 'Your practice performance at a glance' },
};

export default function App() {
  const [view, setView] = useState<ViewId>('home');
  const [mobileOpen, setMobileOpen] = useState(false);
  const { results, recordResult, reset } = useProgress();

  const meta = META[view];

  return (
    <div className="min-h-screen bg-azure-50">
      <Sidebar
        current={view}
        onNavigate={setView}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />
      <div className="lg:pl-64">
        <TopBar
          title={meta.title}
          subtitle={meta.subtitle}
          onOpenMobile={() => setMobileOpen(true)}
        />
        <main>
          {view === 'home' && (
            <HomeView results={results} onNavigate={setView} onReset={reset} />
          )}
          {view === 'quiz' && (
            <QuizView
              mode="practice"
              results={results}
              onAnswered={recordResult}
              onNavigateInsights={() => setView('insights')}
            />
          )}
          {view === 'signal' && (
            <QuizView
              mode="signal"
              results={results}
              onAnswered={recordResult}
              onNavigateInsights={() => setView('insights')}
            />
          )}
          {view === 'traps' && <ExamTrapsView />}
          {view === 'insights' && (
            <InsightsView results={results} onNavigate={setView} />
          )}
        </main>
      </div>
    </div>
  );
}
