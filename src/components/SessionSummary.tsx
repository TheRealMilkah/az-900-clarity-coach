import { Check, X, RotateCw, RefreshCw, BarChart3, ArrowRight, Target, BookOpen } from 'lucide-react';
import type { SessionResult } from '@/types';
import { TOPIC_MAP, TOPICS } from '@/data/topics';
import { QUESTIONS } from '@/data/questions';

interface SessionSummaryProps {
  log: SessionResult[];
  onRetryMissed: () => void;
  onRestartFull: () => void;
  onNavigateInsights: () => void;
  missedCount: number;
}

export function SessionSummary({
  log,
  onRetryMissed,
  onRestartFull,
  onNavigateInsights,
  missedCount,
}: SessionSummaryProps) {
  const total = log.length;
  const correct = log.filter((r) => r.correct).length;
  const pct = total > 0 ? Math.round((correct / total) * 100) : 0;
  const missed = log.filter((r) => !r.correct);

  const byTopic = TOPICS.map((t) => {
    const tr = log.filter((r) => r.topicId === t.id);
    const tc = tr.filter((r) => r.correct).length;
    return { topic: t, total: tr.length, correct: tc, pct: tr.length ? Math.round((tc / tr.length) * 100) : 0 };
  }).filter((t) => t.total > 0);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="card overflow-hidden">
        {/* Score header */}
        <div className="bg-gradient-to-br from-azure-50 to-white p-6 text-center sm:p-8">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-azure-100 text-azure-600">
            <BarChart3 className="h-7 w-7" />
          </div>
          <h2 className="mt-4 text-xl font-bold text-navy-800 sm:text-2xl">Session complete</h2>
          <p className="mt-1 text-sm text-navy-500">
            You answered {total} {total === 1 ? 'question' : 'questions'}.
          </p>
          <div className="mt-4 inline-flex items-baseline gap-1">
            <span className="text-4xl font-bold text-azure-700">{pct}%</span>
            <span className="text-sm font-medium text-navy-400">practice score</span>
          </div>
          <div className="mt-3 flex items-center justify-center gap-4 text-sm">
            <span className="inline-flex items-center gap-1.5 font-medium text-emerald-700">
              <Check className="h-4 w-4" /> {correct} correct
            </span>
            <span className="inline-flex items-center gap-1.5 font-medium text-rose-600">
              <X className="h-4 w-4" /> {total - correct} to review
            </span>
          </div>
        </div>

        {/* By topic */}
        {byTopic.length > 0 && (
          <div className="border-t border-navy-100 p-5 sm:p-6">
            <h3 className="text-sm font-semibold text-navy-800">Performance by topic</h3>
            <div className="mt-3 space-y-3">
              {byTopic.map(({ topic, total: t, correct: c, pct: p }) => (
                <div key={topic.id}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-navy-700">{topic.shortName}</span>
                    <span className="text-xs text-navy-400">{c}/{t} · {p}%</span>
                  </div>
                  <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-navy-100">
                    <div
                      className={`h-full rounded-full ${p >= 70 ? 'bg-emerald-500' : 'bg-azure-500'}`}
                      style={{ width: `${p}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Revision summary */}
        {missed.length > 0 ? (
          <div className="border-t border-navy-100 p-5 sm:p-6">
            <h3 className="flex items-center gap-2 text-sm font-semibold text-navy-800">
              <BookOpen className="h-4 w-4 text-rose-500" />
              Revision summary — questions to revisit
            </h3>
            <ul className="mt-3 space-y-2">
              {missed.map((r) => {
                const q = QUESTIONS.find((q) => q.id === r.questionId);
                if (!q) return null;
                const correctOpt = q.options.find((o) => o.id === q.correctOptionId);
                return (
                  <li key={r.questionId} className="rounded-xl bg-rose-50/40 p-3">
                    <p className="text-xs font-medium text-azure-600">
                      {TOPIC_MAP[r.topicId]?.shortName}
                    </p>
                    <p className="mt-1 text-sm leading-snug text-navy-700">{q.prompt}</p>
                    <p className="mt-1.5 text-xs text-navy-500">
                      <span className="font-semibold text-emerald-700">Correct answer:</span>{' '}
                      {correctOpt?.text}
                    </p>
                    <p className="mt-1 text-xs text-navy-500">
                      <span className="font-semibold text-amber-700">Signal:</span>{' '}
                      "{q.signal.phrase}"
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : (
          <div className="border-t border-navy-100 p-5 sm:p-6">
            <div className="flex items-center gap-2 rounded-xl bg-emerald-50/60 px-4 py-3 text-sm text-emerald-700">
              <Check className="h-4 w-4" />
              Every question correct this session. Excellent work!
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-wrap gap-3 border-t border-navy-100 p-5 sm:p-6">
          {missedCount > 0 && (
            <button className="btn-primary" onClick={onRetryMissed}>
              <RotateCw className="h-4 w-4" />
              Retry missed ({missedCount})
            </button>
          )}
          <button className="btn-secondary" onClick={onRestartFull}>
            <RefreshCw className="h-4 w-4" />
            New session
          </button>
          <button className="btn-secondary ml-auto" onClick={onNavigateInsights}>
            <Target className="h-4 w-4" />
            View insights
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
