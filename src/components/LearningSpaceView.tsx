import {
  Brain, ArrowRight, CheckCircle2, Target, TrendingUp, BookOpen,
  Clock, BarChart3, AlertCircle, History,
} from 'lucide-react';
import type { ViewId } from '@/App';
import type { QuestionResult } from '@/types';
import { TOPICS, TOPIC_MAP } from '@/data/topics';
import { QUESTIONS } from '@/data/questions';

interface LearningSpaceViewProps {
  displayName: string;
  results: QuestionResult[];
  loading: boolean;
  onNavigate: (view: ViewId) => void;
}

export function LearningSpaceView({ displayName, results, loading, onNavigate }: LearningSpaceViewProps) {
  const completed = results.length;
  const correct = results.filter((r) => r.correct).length;
  const accuracy = completed > 0 ? Math.round((correct / completed) * 100) : 0;
  const topicsPracticed = new Set(results.map((r) => r.topicId)).size;

  const wrongByTopic = TOPICS.map((t) => {
    const topicResults = results.filter((r) => r.topicId === t.id);
    const wrong = topicResults.filter((r) => !r.correct);
    return { topic: t, wrongCount: wrong.length, total: topicResults.length };
  }).filter((x) => x.wrongCount > 0);

  const recent = [...results].sort((a, b) => b.timestamp - a.timestamp).slice(0, 5);
  const nextQuestion = QUESTIONS.find((q) => !results.some((r) => r.questionId === q.id));

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Greeting */}
      <div>
        <h1 className="text-2xl font-bold text-navy-800 sm:text-3xl">
          Your Learning Space
        </h1>
        <p className="mt-2 text-base text-navy-500">
          Welcome back, <span className="font-semibold text-navy-700">{displayName}</span>.
        </p>
        <p className="mt-1 text-sm text-navy-400">
          Keep building your AZ-900 understanding one question at a time.
        </p>
      </div>

      {/* Stats */}
      <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          icon={<BookOpen className="h-5 w-5" />}
          label="Questions Completed"
          value={loading ? '—' : String(completed)}
        />
        <StatCard
          icon={<CheckCircle2 className="h-5 w-5" />}
          label="Correct Answers"
          value={loading ? '—' : String(correct)}
        />
        <StatCard
          icon={<Target className="h-5 w-5" />}
          label="Accuracy"
          value={loading ? '—' : `${accuracy}%`}
        />
        <StatCard
          icon={<TrendingUp className="h-5 w-5" />}
          label="Topics Practiced"
          value={loading ? '—' : String(topicsPracticed)}
        />
      </div>

      {/* Continue practising */}
      <div className="mt-6 card overflow-hidden">
        <div className="relative p-6 sm:p-8">
          <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-azure-100/50 blur-3xl" aria-hidden="true" />
          <div className="relative flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="flex items-center gap-2 text-lg font-bold text-navy-800">
                <Brain className="h-5 w-5 text-azure-600" />
                Continue Practising
              </h2>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-navy-500">
                {nextQuestion
                  ? 'Pick up where you left off and keep building your understanding.'
                  : "You've worked through every available question. Great work!"}
              </p>
            </div>
            <button
              className="btn-primary flex-none"
              onClick={() => onNavigate('practice')}
            >
              <Brain className="h-4 w-4" />
              Continue Practising
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {/* Recent practice */}
        <div className="card p-5">
          <h3 className="flex items-center gap-2 text-sm font-semibold text-navy-800">
            <History className="h-4 w-4 text-azure-600" />
            Recent Practice
          </h3>
          {loading ? (
            <div className="mt-4 space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-12 animate-pulse rounded-xl bg-navy-50" />
              ))}
            </div>
          ) : recent.length === 0 ? (
            <div className="mt-5 flex flex-col items-center justify-center rounded-xl border border-dashed border-navy-200 bg-navy-50/40 px-6 py-10 text-center">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-azure-50 text-azure-500">
                <Clock className="h-5 w-5" />
              </div>
              <p className="mt-3 text-sm font-medium text-navy-700">
                No practice sessions yet.
              </p>
              <p className="mt-1 max-w-xs text-xs leading-relaxed text-navy-400">
                Start your first practice session and your activity will appear here.
              </p>
              <button className="btn-primary mt-4" onClick={() => onNavigate('practice')}>
                <Brain className="h-4 w-4" />
                Start Practising
              </button>
            </div>
          ) : (
            <ul className="mt-4 divide-y divide-navy-100">
              {recent.map((r) => {
                const q = QUESTIONS.find((q) => q.id === r.questionId);
                if (!q) return null;
                return (
                  <li key={r.questionId} className="flex items-start gap-3 py-3">
                    <span
                      className={`mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full text-[11px] font-bold ${
                        r.correct ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                      }`}
                    >
                      {r.correct ? '+' : '−'}
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-azure-600">
                        {TOPIC_MAP[r.topicId]?.shortName}
                      </p>
                      <p className="truncate text-sm text-navy-600">{q.prompt}</p>
                    </div>
                    <span className="ml-auto flex-none text-[11px] text-navy-400">
                      {new Date(r.timestamp).toLocaleDateString()}
                    </span>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Topics to review */}
        <div className="card p-5">
          <h3 className="flex items-center gap-2 text-sm font-semibold text-navy-800">
            <AlertCircle className="h-4 w-4 text-rose-500" />
            Topics to Review
          </h3>
          {loading ? (
            <div className="mt-4 space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-10 animate-pulse rounded-xl bg-navy-50" />
              ))}
            </div>
          ) : wrongByTopic.length === 0 ? (
            <div className="mt-5 flex flex-col items-center justify-center rounded-xl border border-dashed border-navy-200 bg-navy-50/40 px-6 py-10 text-center">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-50 text-emerald-500">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <p className="mt-3 text-sm font-medium text-navy-700">
                {completed === 0
                  ? 'Complete some practice questions and your areas for review will appear here.'
                  : 'Everything correct so far. Keep it up!'}
              </p>
            </div>
          ) : (
            <ul className="mt-4 space-y-2">
              {wrongByTopic.map(({ topic, wrongCount, total }) => (
                <li
                  key={topic.id}
                  className="flex items-center justify-between rounded-xl bg-amber-50/60 px-4 py-2.5"
                >
                  <span className="text-sm font-medium text-navy-700">
                    {topic.shortName}
                  </span>
                  <span className="text-xs font-medium text-amber-700">
                    {wrongCount} of {total} to review
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Quick links */}
      <div className="mt-6 flex flex-wrap gap-3">
        <button className="btn-secondary" onClick={() => onNavigate('progress')}>
          <BarChart3 className="h-4 w-4" />
          View Full Progress
        </button>
        <button className="btn-secondary" onClick={() => onNavigate('signal')}>
          <Target className="h-4 w-4" />
          Spot the Signal
        </button>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="card p-5">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-azure-50 text-azure-600">
        {icon}
      </div>
      <p className="mt-3 text-3xl font-bold text-navy-800">{value}</p>
      <p className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-navy-400">
        {label}
      </p>
    </div>
  );
}
