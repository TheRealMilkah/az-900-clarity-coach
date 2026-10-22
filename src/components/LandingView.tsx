import {
  Brain, ArrowRight, Search, BookOpen, Lightbulb, TrendingUp,
  CheckCircle2, GraduationCap, Sparkles,
} from 'lucide-react';
import type { ViewId } from '@/App';
import { TOPICS } from '@/data/topics';
import { QUESTIONS } from '@/data/questions';
import { Disclaimer } from '@/components/Disclaimer';

interface LandingViewProps {
  onNavigate: (view: ViewId) => void;
}

export function LandingView({ onNavigate }: LandingViewProps) {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-azure-50/50 to-white">
        <div className="absolute -right-16 -top-16 h-72 w-72 rounded-full bg-azure-100/50 blur-3xl" aria-hidden="true" />
        <div className="absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-navy-100/40 blur-3xl" aria-hidden="true" />
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <span className="chip bg-azure-50 text-azure-700">
              <Sparkles className="h-3.5 w-3.5" />
              AZ-900 Fundamentals
            </span>
            <h1 className="mt-5 text-3xl font-bold leading-tight text-navy-800 sm:text-4xl lg:text-5xl">
              Understand the question.<br />
              Spot the clue.<br />
              <span className="text-azure-600">Learn with confidence.</span>
            </h1>
            <p className="mt-5 text-base leading-relaxed text-navy-500 sm:text-lg">
              Practice AZ-900 questions, identify the wording that matters, and
              understand why an answer fits.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <button className="btn-primary" onClick={() => onNavigate('practice')}>
                <Brain className="h-4 w-4" />
                Start Practising
              </button>
              <button className="btn-secondary" onClick={() => onNavigate('signup')}>
                Create Free Account
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Problem section */}
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-navy-800 sm:text-3xl">
            Why AZ-900 questions can feel confusing
          </h2>
          <p className="mt-4 text-base leading-relaxed text-navy-500">
            Many learners know the Azure terms but still struggle with questions
            because the wording can hide the actual requirement.
          </p>
          <p className="mt-3 text-base leading-relaxed text-navy-500">
            AZ-900 Clarity Coach helps learners slow the question down, identify
            the important clue, connect it to the Azure concept being tested, and
            understand the answer.
          </p>
        </div>
      </section>

      {/* Three-step section */}
      <section className="bg-navy-50/50 py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-3">
            <StepCard
              number="01"
              title="Read the Question"
              description="Understand what the question is actually asking."
              icon={<BookOpen className="h-5 w-5" />}
            />
            <StepCard
              number="02"
              title="Spot the Signal"
              description="Identify the words and requirements that point toward the answer."
              icon={<Search className="h-5 w-5" />}
            />
            <StepCard
              number="03"
              title="Understand the Answer"
              description="Learn why the correct option fits and why the other options do not."
              icon={<Lightbulb className="h-5 w-5" />}
            />
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <StatBadge icon={<BookOpen className="h-5 w-5" />} value={String(QUESTIONS.length)} label="Practice questions" />
          <StatBadge icon={<TrendingUp className="h-5 w-5" />} value={String(TOPICS.length)} label="Topics covered" />
          <StatBadge icon={<Search className="h-5 w-5" />} value="3" label="Steps per question" />
          <StatBadge icon={<CheckCircle2 className="h-5 w-5" />} value="100%" label="Free to use" />
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-4xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl border border-azure-200 bg-gradient-to-br from-azure-50 to-white p-8 text-center shadow-card sm:p-12">
          <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-azure-100/60 blur-3xl" aria-hidden="true" />
          <div className="relative">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-azure-600 text-white shadow-sm">
              <GraduationCap className="h-6 w-6" />
            </div>
            <h2 className="mt-5 text-2xl font-bold text-navy-800 sm:text-3xl">
              Ready to practice?
            </h2>
            <p className="mt-3 text-base text-navy-500">
              Create a free account and keep your learning progress in one place.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <button className="btn-primary" onClick={() => onNavigate('signup')}>
                Create Free Account
                <ArrowRight className="h-4 w-4" />
              </button>
              <button className="btn-secondary" onClick={() => onNavigate('practice')}>
                <Brain className="h-4 w-4" />
                Start Practising
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 pb-10 sm:px-6 lg:px-8">
        <Disclaimer />
      </div>
    </div>
  );
}

function StepCard({ number, title, description, icon }: { number: string; title: string; description: string; icon: React.ReactNode }) {
  return (
    <div className="card p-6">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-azure-50 text-azure-600">
          {icon}
        </div>
        <span className="text-2xl font-bold text-navy-200">{number}</span>
      </div>
      <h3 className="mt-4 text-base font-semibold uppercase tracking-wide text-navy-800">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-navy-500">{description}</p>
    </div>
  );
}

function StatBadge({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="card flex flex-col items-center p-5 text-center">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-azure-50 text-azure-600">
        {icon}
      </div>
      <p className="mt-3 text-2xl font-bold text-navy-800">{value}</p>
      <p className="mt-1 text-xs font-medium uppercase tracking-wide text-navy-400">{label}</p>
    </div>
  );
}
