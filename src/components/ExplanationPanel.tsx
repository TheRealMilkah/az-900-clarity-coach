import { useState } from 'react';
import { Lightbulb, Search, Building2, ChevronDown, Check, X, ArrowRight } from 'lucide-react';
import type { PracticeQuestion, AnswerOption } from '@/types';

interface ExplanationPanelProps {
  question: PracticeQuestion;
}

export function ExplanationPanel({ question }: ExplanationPanelProps) {
  const correctOption = question.options.find((o) => o.id === question.correctOptionId)!;
  const hasSteps = question.signal.steps && question.signal.steps.length > 0;

  return (
    <div className="mt-6 space-y-4">
      {/* Spot the Signal */}
      <div className="rounded-xl border border-amber-200 bg-amber-50/60 p-4">
        <h4 className="flex items-center gap-2 text-sm font-semibold text-amber-800">
          <Search className="h-4 w-4" />
          Spot the Signal
        </h4>
        <p className="mt-2 text-sm leading-relaxed text-navy-700">
          <HighlightedPrompt prompt={question.prompt} phrase={question.signal.phrase} />
        </p>

        {hasSteps ? (
          <div className="mt-3 space-y-3">
            {question.signal.steps!.map((step, i) => (
              <div key={i} className="rounded-lg bg-white/60 p-3">
                <p className="text-xs font-semibold text-amber-700">
                  Signal {i + 1}: &ldquo;{step.phrase}&rdquo;
                </p>
                <p className="mt-1 text-sm leading-relaxed text-navy-600">{step.reasoning}</p>
              </div>
            ))}
            {question.signal.conclusion && (
              <div className="flex items-start gap-2 rounded-lg bg-amber-100/50 p-3">
                <ArrowRight className="mt-0.5 h-4 w-4 flex-none text-amber-700" />
                <p className="text-sm font-medium leading-relaxed text-navy-700">
                  {question.signal.conclusion}
                </p>
              </div>
            )}
          </div>
        ) : (
          <p className="mt-2 text-sm leading-relaxed text-navy-600">
            {question.signal.suggests}
          </p>
        )}
      </div>

      {/* Correct answer explanation */}
      <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-4">
        <h4 className="flex items-center gap-2 text-sm font-semibold text-emerald-800">
          <Lightbulb className="h-4 w-4" />
          Correct answer: {correctOption.id.toUpperCase()}. {correctOption.text}
        </h4>
      </div>

      {/* Structured explanations */}
      <div className="grid gap-4 sm:grid-cols-2">
        <ExplainerCard
          icon={<Lightbulb className="h-4 w-4" />}
          title="In simple terms"
          body={question.explanation.simpleTerms}
          tint="azure"
        />
        <ExplainerCard
          icon={<Building2 className="h-4 w-4" />}
          title="Real-life example"
          body={question.explanation.realLifeExample}
          tint="navy"
        />
      </div>

      {/* Why not the others? — expandable per option */}
      <div className="rounded-xl border border-navy-100 bg-navy-50/30 p-4">
        <h4 className="text-sm font-semibold text-navy-800">Why not the others?</h4>
        <p className="mt-1 text-xs text-navy-400">
          Tap any option to see why it may seem right, why it does not fit here, and when it would fit.
        </p>
        <div className="mt-3 space-y-2">
          {question.options.map((opt) => {
            const isCorrect = opt.id === question.correctOptionId;
            return (
              <OptionExplainer
                key={opt.id}
                letter={opt.id.toUpperCase()}
                text={opt.text}
                correct={isCorrect}
                option={opt}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

/** Highlights the signal phrase within the full question prompt. */
function HighlightedPrompt({ prompt, phrase }: { prompt: string; phrase: string }) {
  const idx = prompt.toLowerCase().indexOf(phrase.toLowerCase());
  if (idx === -1) {
    return (
      <>
        <span className="font-semibold text-navy-800">"{phrase}"</span>
        <span className="mt-1 block text-navy-500">{prompt}</span>
      </>
    );
  }
  const before = prompt.slice(0, idx);
  const match = prompt.slice(idx, idx + phrase.length);
  const after = prompt.slice(idx + phrase.length);
  return (
    <>
      {before}
      <mark className="rounded bg-amber-200/70 px-1 py-0.5 font-semibold text-navy-900">
        {match}
      </mark>
      {after}
    </>
  );
}

function OptionExplainer({
  letter,
  text,
  correct,
  option,
}: {
  letter: string;
  text: string;
  correct: boolean;
  option: AnswerOption;
}) {
  const [open, setOpen] = useState(false);
  const d = option.distractor;
  const fallback = option.whyIncorrect;
  return (
    <div className={`rounded-lg border ${correct ? 'border-emerald-200' : 'border-navy-200'} bg-white`}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center gap-2 px-3 py-2.5 text-left text-sm"
      >
        <span
          className={`flex h-6 w-6 flex-none items-center justify-center rounded-full text-[11px] font-semibold ${
            correct ? 'bg-emerald-500 text-white' : 'bg-navy-100 text-navy-500'
          }`}
        >
          {letter}
        </span>
        <span className="flex-1 font-medium text-navy-700">{text}</span>
        {correct ? (
          <Check className="h-4 w-4 flex-none text-emerald-600" />
        ) : (
          <X className="h-4 w-4 flex-none text-rose-400" />
        )}
        <ChevronDown
          className={`h-4 w-4 flex-none text-navy-400 transition-transform ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>
      {open && (
        <div className="px-3 pb-3 text-xs leading-relaxed text-navy-600">
          {correct ? (
            <p>This is the correct answer for this question.</p>
          ) : d ? (
            <div className="space-y-2">
              <p><span className="font-semibold text-navy-700">What it means: </span>{d.whatItMeans}</p>
              <p><span className="font-semibold text-amber-700">Why it may seem right: </span>{d.whyItMaySeemRight}</p>
              <p><span className="font-semibold text-navy-700">Why it is not right here: </span>{d.whyNotHere}</p>
              <p><span className="font-semibold text-azure-600">When it would fit: </span>{d.whenItWouldFit}</p>
            </div>
          ) : (
            <p>{fallback}</p>
          )}
        </div>
      )}
    </div>
  );
}

const TINTS: Record<string, { wrap: string; title: string; icon: string }> = {
  azure: { wrap: 'bg-azure-50 border-azure-100', title: 'text-azure-800', icon: 'text-azure-600' },
  navy: { wrap: 'bg-navy-50 border-navy-100', title: 'text-navy-800', icon: 'text-navy-500' },
  rose: { wrap: 'bg-rose-50 border-rose-100', title: 'text-rose-800', icon: 'text-rose-600' },
};

function ExplainerCard({
  icon,
  title,
  body,
  tint,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
  tint: keyof typeof TINTS | string;
}) {
  const t = TINTS[tint] ?? TINTS.navy;
  return (
    <div className={`rounded-xl border p-4 ${t.wrap}`}>
      <h5 className={`flex items-center gap-2 text-xs font-semibold uppercase tracking-wide ${t.title}`}>
        <span className={t.icon}>{icon}</span>
        {title}
      </h5>
      <p className="mt-2 text-sm leading-relaxed text-navy-600">{body}</p>
    </div>
  );
}
