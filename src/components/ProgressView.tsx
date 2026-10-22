import { BarChart3, BookOpen, CheckCircle2, Target, TrendingUp, ArrowRight, Brain } from 'lucide-react';
import type { ViewId } from '@/App';
import type { QuestionResult } from '@/types';
import { TOPICS } from '@/data/topics';

interface ProgressViewProps {
  results: QuestionResult[];
  loading: boolean;
  onNavigate: (view: ViewId) => void;
}

export function ProgressView({ results, loading, onNavigate }: ProgressViewProps) {
  const completed = results.length;
  const correct = results.filter((r) => r.correct).length;
  const accuracy = completed > 0 ? Math.round((correct / completed) * 100) : 0;
  const topicsPracticed = new Set(results.map((r) => r.topicId)).size;

  const byTopic = TOPICS.map((t) => {
    const tr = results.filter((r) => r.topicId === t.id);
    const tc = tr.filter((r) => r.correct).length;
    return {
      topic: t,
      total: tr.length,
      correct: tc,
      pct: tr.length ? Math.round((tc / tr.length) * 100) : 0,
    };
  });

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-navy-800 sm:text-3xl">
        Your Progress
      </h1>
      <p className="mt-2 text-sm text-navy-500">
        See how your practice is developing across AZ-900 topics.
      </p>

      {/* Summary stats */}
      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <SummaryStat
          icon={<BookOpen className="h-5 w-5" />}
          label="Questions attempted"
          value={loading ? '—' : String(completed)}
        />
        <SummaryStat
          icon={<CheckCircle2 className="h-5 w-5" />}
          label="Correct answers"
          value={loading ? '—' : String(correct)}
        />
        <SummaryStat
          icon={<Target className="h-5 w-5" />}
          label="Accuracy"
          value={loading ? '—' : `${accuracy}%`}
        />
        <SummaryStat
          icon={<TrendingUp className="h-5 w-5" />}
          label="Topics practiced"
          value={loading ? '—' : String(topicsPracticed)}
        />
      </div>

      {/* Topic progress */}
      <div className="card mt-6 p-5">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-navy-800">
          <BarChart3 className="h-4 w-4 text-azure-600" />
          Topic progress
        </h3>
        <div className="mt-4 space-y-4">
          {byTopic.map(({ topic, total, correct: c, pct }) => (
            <div key={topic.id}>
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-navy-700">{topic.name}</span>
                <span className="text-xs text-navy-400">
                  {total > 0 ? `${c}/${total} · ${pct}%` : 'Not started'}
                </span>
              </div>
              <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-navy-100">
                <div
                  className={`h-full rounded-full transition-all ${
                    total === 0 ? 'bg-navy-200' : pct >= 70 ? 'bg-emerald-500' : 'bg-azure-500'
                  }`}
                  style={{ width: total === 0 ? '0%' : `${pct}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <button className="btn-primary" onClick={() => onNavigate('practice')}>
          <Brain className="h-4 w-4" />
          Keep Practising
          <ArrowRight className="h-4 w-4" />
        </button>
        <button className="btn-secondary" onClick={() => onNavigate('learning-space')}>
          Back to Learning Space
        </button>
      </div>
    </div>
  );
}

function SummaryStat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="card p-5">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-azure-50 text-azure-600">
        {icon}
      </div>
      <p className="mt-3 text-2xl font-bold text-navy-800">{value}</p>
      <p className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-navy-400">
        {label}
      </p>
    </div>
  );
}
