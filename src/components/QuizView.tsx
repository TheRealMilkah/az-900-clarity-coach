import { useState, useCallback } from 'react';
import {
  Check, X, RotateCw, Lightbulb, ArrowRight, Trophy, RefreshCw,
  Search, Brain, ClipboardList,
} from 'lucide-react';
import type { QuestionResult, SessionResult, TopicId, PracticeQuestion } from '@/types';
import { QUESTIONS } from '@/data/questions';
import { TOPIC_MAP, TOPICS } from '@/data/topics';
import { ExplanationPanel } from '@/components/ExplanationPanel';
import { SessionSummary } from '@/components/SessionSummary';

export type QuizMode = 'practice' | 'signal';

interface QuizViewProps {
  mode: QuizMode;
  results: QuestionResult[];
  onAnswered: (result: QuestionResult) => void;
  onNavigateInsights: () => void;
}

type Stage = 'answering' | 'revealed';

export function QuizView({ mode, results, onAnswered, onNavigateInsights }: QuizViewProps) {
  const [filterTopic, setFilterTopic] = useState<TopicId | 'all'>('all');
  const [queue, setQueue] = useState<PracticeQuestion[]>(() => buildQueue('all'));
  const [position, setPosition] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [stage, setStage] = useState<Stage>('answering');
  const [sessionLog, setSessionLog] = useState<SessionResult[]>([]);
  const [showSummary, setShowSummary] = useState(false);
  const [retryIds, setRetryIds] = useState<Set<string>>(new Set());

  const startQueue = useCallback((topic: TopicId | 'all') => {
    const q = buildQueue(topic);
    setQueue(q);
    setPosition(0);
    setSelected(null);
    setStage('answering');
    setSessionLog([]);
    setShowSummary(false);
    setRetryIds(new Set());
  }, []);

  function pickTopic(topic: TopicId | 'all') {
    setFilterTopic(topic);
    startQueue(topic);
  }

  const question = queue[position];
  const sessionAnsweredIds = new Set(sessionLog.map((r) => r.questionId));

  function handleSubmit() {
    if (!selected || !question) return;
    const correct = selected === question.correctOptionId;
    onAnswered({
      questionId: question.id,
      topicId: question.topicId,
      selectedOptionId: selected,
      correct,
      timestamp: Date.now(),
    });
    setSessionLog((prev) => [
      ...prev.filter((r) => r.questionId !== question.id),
      { questionId: question.id, topicId: question.topicId, selectedOptionId: selected, correct, timestamp: Date.now() },
    ]);
    if (!correct) {
      setRetryIds((prev) => new Set(prev).add(question.id));
    } else {
      setRetryIds((prev) => {
        const next = new Set(prev);
        next.delete(question.id);
        return next;
      });
    }
    setStage('revealed');
  }

  function nextQuestion() {
    if (position + 1 < queue.length) {
      setPosition(position + 1);
      setSelected(null);
      setStage('answering');
    } else {
      setShowSummary(true);
    }
  }

  function tryAgain() {
    setSelected(null);
    setStage('answering');
  }

  function retryMissed() {
    const missed = queue.filter((q) => retryIds.has(q.id));
    if (missed.length === 0) return;
    setQueue(missed);
    setPosition(0);
    setSelected(null);
    setStage('answering');
    setShowSummary(false);
    setRetryIds(new Set());
  }

  function restartFull() {
    startQueue(filterTopic);
  }

  const allDone = showSummary;
  const globalAnswered = new Set(results.map((r) => r.questionId));

  if (allDone) {
    return (
      <SessionSummary
        log={sessionLog}
        onRetryMissed={retryMissed}
        onRestartFull={restartFull}
        onNavigateInsights={onNavigateInsights}
        missedCount={retryIds.size}
      />
    );
  }

  if (!question) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="card p-8 text-center">
          <p className="text-sm font-medium text-navy-600">No questions in this queue.</p>
          <button className="btn-primary mt-4" onClick={restartFull}>
            <RefreshCw className="h-4 w-4" />
            Start again
          </button>
        </div>
      </div>
    );
  }

  const modeMeta = mode === 'signal'
    ? { label: 'Spot the Signal', icon: <Search className="h-3.5 w-3.5" />, hint: 'Focus on the key wording clue in each question before you choose.' }
    : { label: 'Practice', icon: <Brain className="h-3.5 w-3.5" />, hint: 'Read carefully, choose, then learn from the explanation.' };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Mode header */}
      <div className="mb-4 flex items-center gap-2">
        <span className="chip bg-azure-100 text-azure-700">{modeMeta.icon}{modeMeta.label}</span>
        <span className="text-xs text-navy-400">{modeMeta.hint}</span>
      </div>

      {/* Topic filter */}
      <div className="mb-6 flex flex-wrap gap-2">
        <FilterChip active={filterTopic === 'all'} onClick={() => pickTopic('all')}>
          All topics
        </FilterChip>
        {TOPICS.map((t) => (
          <FilterChip key={t.id} active={filterTopic === t.id} onClick={() => pickTopic(t.id)}>
            {t.shortName}
          </FilterChip>
        ))}
      </div>

      {/* Session progress bar */}
      <div className="mb-4">
        <div className="mb-1.5 flex items-center justify-between text-xs text-navy-400">
          <span>Session progress</span>
          <span>{position + (stage === 'revealed' ? 1 : 0)} / {queue.length}</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-navy-100">
          <div
            className="h-full rounded-full bg-azure-500 transition-all"
            style={{ width: `${((position + (stage === 'revealed' ? 1 : 0)) / queue.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="card p-5 sm:p-7">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="chip bg-azure-50 text-azure-700">
            {TOPIC_MAP[question.topicId]?.shortName}
          </span>
          <span className="text-xs font-medium text-navy-400">
            Question {position + 1} of {queue.length}
          </span>
        </div>

        {/* Prompt */}
        <h2 className="mt-4 text-lg font-semibold leading-snug text-navy-800">
          {question.prompt}
        </h2>

        {/* Spot-the-Signal pre-hint (only in signal mode, before submit) */}
        {mode === 'signal' && stage === 'answering' && (
          <div className="mt-3 rounded-lg border border-amber-200 bg-amber-50/40 px-3 py-2 text-xs text-amber-700">
            Before you choose, find the phrase that signals the right service. You'll see it highlighted after you submit.
          </div>
        )}

        {/* Options */}
        <div className="mt-5 space-y-2.5">
          {question.options.map((opt) => {
            const isCorrect = opt.id === question.correctOptionId;
            const isSelected = selected === opt.id;
            const showResult = stage === 'revealed';
            let state = 'idle';
            if (showResult && isCorrect) state = 'correct';
            else if (showResult && isSelected && !isCorrect) state = 'wrong';
            else if (isSelected) state = 'selected';
            return (
              <button
                key={opt.id}
                disabled={showResult}
                onClick={() => setSelected(opt.id)}
                className={`flex w-full items-start gap-3 rounded-xl border p-4 text-left text-sm transition-all ${
                  stateClasses(state)
                } ${!showResult ? 'hover:border-azure-300 hover:bg-azure-50/40' : ''}`}
              >
                <span className={`mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full border text-[11px] font-semibold ${
                  state === 'correct' ? 'border-emerald-500 bg-emerald-500 text-white' :
                  state === 'wrong' ? 'border-rose-500 bg-rose-500 text-white' :
                  state === 'selected' ? 'border-azure-500 bg-azure-500 text-white' :
                  'border-navy-200 text-navy-500'
                }`}>
                  {opt.id.toUpperCase()}
                </span>
                <span className="flex-1 font-medium text-navy-700">{opt.text}</span>
                {showResult && isCorrect && (
                  <Check className="mt-0.5 h-4 w-4 flex-none text-emerald-600" />
                )}
                {showResult && isSelected && !isCorrect && (
                  <X className="mt-0.5 h-4 w-4 flex-none text-rose-600" />
                )}
              </button>
            );
          })}
        </div>

        {/* Actions */}
        <div className="mt-6 flex flex-wrap gap-3">
          {stage === 'answering' ? (
            <button className="btn-primary" onClick={handleSubmit} disabled={!selected}>
              <Check className="h-4 w-4" />
              Submit answer
            </button>
          ) : (
            <>
              <div className="flex items-center gap-2 text-sm font-semibold">
                {selected === question.correctOptionId ? (
                  <span className="flex items-center gap-1.5 text-emerald-700">
                    <Check className="h-4 w-4" /> Correct!
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 text-rose-700">
                    <X className="h-4 w-4" /> Not quite — see why below.
                  </span>
                )}
              </div>
              {selected !== question.correctOptionId && (
                <button className="btn-secondary" onClick={tryAgain}>
                  <RefreshCw className="h-4 w-4" />
                  Try Again
                </button>
              )}
              <button className="btn-primary ml-auto" onClick={nextQuestion}>
                {position + 1 < queue.length ? (
                  <>Next question <ArrowRight className="h-4 w-4" /></>
                ) : (
                  <><ClipboardList className="h-4 w-4" /> Finish session</>
                )}
              </button>
            </>
          )}
        </div>

        {/* Reveal */}
        {stage === 'revealed' && <ExplanationPanel question={question} />}

        {/* Previously answered banner */}
        {stage === 'answering' && globalAnswered.has(question.id) && (
          <div className="mt-4 flex items-center gap-2 rounded-lg bg-navy-50 px-3 py-2 text-xs text-navy-500">
            <Lightbulb className="h-3.5 w-3.5 text-azure-500" />
            You've answered this one before. Choose again to update your result.
          </div>
        )}
      </div>

      {/* All questions answered globally */}
      {globalAnswered.size >= QUESTIONS.length && stage === 'answering' && sessionLog.length === 0 && (
        <div className="mt-6 flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50/60 p-4">
          <Trophy className="h-5 w-5 text-emerald-600" />
          <p className="text-sm text-navy-700">
            You've worked through every available question before. Starting a new session to reinforce your learning.
          </p>
        </div>
      )}
    </div>
  );
}

function buildQueue(topic: TopicId | 'all'): PracticeQuestion[] {
  const base = topic === 'all' ? QUESTIONS : QUESTIONS.filter((q) => q.topicId === topic);
  return [...base];
}

function stateClasses(state: string) {
  switch (state) {
    case 'correct':
      return 'border-emerald-400 bg-emerald-50/50 ring-1 ring-emerald-200';
    case 'wrong':
      return 'border-rose-400 bg-rose-50/50 ring-1 ring-rose-200';
    case 'selected':
      return 'border-azure-400 bg-azure-50/40 ring-1 ring-azure-200';
    default:
      return 'border-navy-200 bg-white';
  }
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
        active
          ? 'bg-azure-600 text-white shadow-sm'
          : 'bg-white text-navy-600 border border-navy-200 hover:border-azure-300 hover:text-azure-700'
      }`}
    >
      {children}
    </button>
  );
}


