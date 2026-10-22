import {
  BookOpen, Search, Lightbulb, CheckCircle2, GraduationCap, ArrowRight, Brain,
} from 'lucide-react';
import type { ViewId } from '@/App';
import { Disclaimer } from '@/components/Disclaimer';

interface AboutViewProps {
  onNavigate: (view: ViewId) => void;
}

export function AboutView({ onNavigate }: AboutViewProps) {
  const helps: { icon: React.ReactNode; text: string }[] = [
    { icon: <BookOpen className="h-5 w-5" />, text: 'Understand what a question is asking' },
    { icon: <Search className="h-5 w-5" />, text: 'Identify important wording' },
    { icon: <Lightbulb className="h-5 w-5" />, text: 'Spot clues' },
    { icon: <CheckCircle2 className="h-5 w-5" />, text: 'Connect clues to Azure concepts' },
    { icon: <GraduationCap className="h-5 w-5" />, text: 'Understand why an answer fits' },
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <span className="chip bg-azure-50 text-azure-700">
        <GraduationCap className="h-3.5 w-3.5" />
        About
      </span>
      <h1 className="mt-4 text-3xl font-bold text-navy-800 sm:text-4xl">
        About AZ-900 Clarity Coach
      </h1>

      <div className="card mt-8 p-6 sm:p-8">
        <p className="text-base leading-relaxed text-navy-600">
          AZ-900 Clarity Coach is an independent educational project designed to
          help beginners understand Azure Fundamentals practice questions.
        </p>
        <p className="mt-4 text-base leading-relaxed text-navy-600">
          The tool focuses on question interpretation rather than memorization
          alone. It helps learners:
        </p>
        <ul className="mt-5 space-y-3">
          {helps.map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="mt-0.5 flex h-8 w-8 flex-none items-center justify-center rounded-lg bg-azure-50 text-azure-600">
                {item.icon}
              </span>
              <span className="text-sm font-medium text-navy-700">{item.text}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="card mt-6 p-6 text-center sm:p-8">
        <p className="text-lg font-semibold text-navy-800">
          Understand the question. Spot the clue. Learn with confidence.
        </p>
      </div>

      <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50/50 p-5">
        <p className="text-sm leading-relaxed text-amber-800">
          AZ-900 Clarity Coach is not an official Microsoft product and is not
          affiliated with or endorsed by Microsoft.
        </p>
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <button className="btn-primary" onClick={() => onNavigate('practice')}>
          <Brain className="h-4 w-4" />
          Start Practising
        </button>
        <button className="btn-secondary" onClick={() => onNavigate('landing')}>
          Back to Home
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-10">
        <Disclaimer />
      </div>
    </div>
  );
}
