import { BarChart3, Target, AlertCircle, History, TrendingUp, ArrowRight, Search } from 'lucide-react';
import type { ViewId } from '@/App';
import type { QuestionResult } from '@/types';
import { TOPICS, TOPIC_MAP } from '@/data/topics';
import { QUESTIONS } from '@/data/questions';

interface InsightsViewProps {
  results: QuestionResult[];
  onNavigate: (view: ViewId) => void;
}

export function InsightsView({ results, onNavigate }: InsightsViewProps) {
  const completed = results.length;
  const correct = results.filter((r) => r.correct).length;
  const avgScore = completed > 0 ? Math.round((correct / completed) * 100) : null;

  if (completed === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        <h2 className="text-xl font-bold text-navy-800 sm:text-2xl">Learning Insights</h2>
        <div className="card mt-6 flex flex-col items-center justify-center px-6 py-14 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-azure-50 text-azure-500">
            <BarChart3 className="h-7 w-7" />
          </div>
          <p className="mt-4 text-base font-semibold text-navy-700">
            Your insights will appear here
          </p>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-navy-400">
            Once you answer a few practice questions, this page will show your
            performance by topic, the concepts you find tricky, and suggested
            revision areas.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button className="btn-primary" onClick={() => onNavigate('practice')}>
              <Target className="h-4 w-4" />
              Start practising
            </button>
            <button className="btn-secondary" onClick={() => onNavigate('signal')}>
              <Search className="h-4 w-4" />
              Try Spot the Signal
            </button>
          </div>
        </div>
      </div>
    );
  }

  const byTopic = TOPICS.map((t) => {
    const tr = results.filter((r) => r.topicId === t.id);
    const tc = tr.filter((r) => r.correct).length;
    return { topic: t, total: tr.length, correct: tc, pct: tr.length ? Math.round((tc / tr.length) * 100) : 0 };
  });

  const wrongQuestions = results
    .filter((r) => !r.correct)
    .map((r) => QUESTIONS.find((q) => q.id === r.questionId))
    .filter((q): q is NonNullable<typeof q> => Boolean(q));

  const suggestions = byTopic
    .filter((t) => t.total > 0 && t.pct < 70)
    .sort((a, b) => a.pct - b.pct);

  const recent = [...results].sort((a, b) => b.timestamp - a.timestamp).slice(0, 6);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <h2 className="text-xl font-bold text-navy-800 sm:text-2xl">Learning Insights</h2>
      <p className="mt-1 text-sm text-navy-500">Based on your {completed} answered practice {completed === 1 ? 'question' : 'questions'}.</p>

      {/* Summary */}
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
        <SummaryStat label="Questions completed" value={String(completed)} />
        <SummaryStat label="Average practice score" value={`${avgScore}%`} />
        <SummaryStat label="Correct answers" value={String(correct)} />
      </div>

      {/* By topic */}
      <section className="card mt-6 p-5">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-navy-800">
          <TrendingUp className="h-4 w-4 text-azure-600" />
          Practice performance by topic
        </h3>
        <div className="mt-4 space-y-4">
          {byTopic.map(({ topic, total, correct: c, pct }) => (
            <div key={topic.id}>
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-navy-700">{topic.shortName}</span>
                <span className="text-xs text-navy-400">
                  {total > 0 ? `${c}/${total} · ${pct}%` : 'No answers yet'}
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
      </section>

      {/* Frequently wrong */}
      <section className="card mt-6 p-5">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-navy-800">
          <AlertCircle className="h-4 w-4 text-rose-500" />
          Concepts to review
        </h3>
        {wrongQuestions.length === 0 ? (
          <p className="mt-3 rounded-xl bg-emerald-50/60 px-4 py-3 text-sm text-emerald-700">
            Everything correct so far — keep it up!
          </p>
        ) : (
          <ul className="mt-3 space-y-2">
            {wrongQuestions.map((q) => (
              <li key={q.id} className="rounded-xl bg-rose-50/40 px-4 py-3">
                <p className="text-xs font-medium text-azure-600">
                  {TOPIC_MAP[q.topicId]?.shortName}
                </p>
                <p className="mt-1 text-sm leading-snug text-navy-700">{q.prompt}</p>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Suggested revision */}
      <section className="card mt-6 p-5">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-navy-800">
          <Target className="h-4 w-4 text-azure-600" />
          Suggested revision topics
        </h3>
        {suggestions.length === 0 ? (
          <p className="mt-3 text-sm text-navy-500">
            You're doing well across all topics you've practised. Try a new topic
            to keep growing.
          </p>
        ) : (
          <ul className="mt-3 space-y-2">
            {suggestions.map(({ topic, pct }) => (
              <li
                key={topic.id}
                className="flex items-center justify-between rounded-xl bg-azure-50/50 px-4 py-3"
              >
                <div>
                  <p className="text-sm font-medium text-navy-700">{topic.shortName}</p>
                  <p className="text-xs text-navy-400">{topic.description}</p>
                </div>
                <span className="chip bg-azure-100 text-azure-700">{pct}%</span>
              </li>
            ))}
          </ul>
        )}
        <div className="mt-4 flex flex-wrap gap-3">
          <button className="btn-secondary" onClick={() => onNavigate('practice')}>
            Practise more
            <ArrowRight className="h-4 w-4" />
          </button>
          <button className="btn-secondary" onClick={() => onNavigate('signal')}>
            <Search className="h-4 w-4" />
            Practise spotting signals
          </button>
        </div>
      </section>

      {/* Recent sessions */}
      <section className="card mt-6 p-5">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-navy-800">
          <History className="h-4 w-4 text-navy-500" />
          Recent practice
        </h3>
        <ul className="mt-3 divide-y divide-navy-100">
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
      </section>
    </div>
  );
}

function SummaryStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="card p-4">
      <p className="text-2xl font-bold text-navy-800">{value}</p>
      <p className="mt-1 text-[11px] font-medium uppercase tracking-wide text-navy-400">
        {label}
      </p>
    </div>
  );
}
