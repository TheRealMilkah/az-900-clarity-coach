import {
  Brain, AlertTriangle, ArrowRight, Sparkles, BookOpen, CheckCircle2,
  TrendingUp, RotateCcw, Search,
  Cloud, Layers, ShieldCheck, Server, Network, Gavel, DollarSign,
  Activity, HardDrive, Lock, Database, BarChart3, Eye, Code2,
  LifeBuoy, FileCheck,
} from 'lucide-react';
import type { ViewId } from '@/App';
import type { QuestionResult, TopicIconName } from '@/types';
import { TOPICS } from '@/data/topics';
import { QUESTIONS } from '@/data/questions';
import { Disclaimer } from '@/components/Disclaimer';

interface HomeViewProps {
  results: QuestionResult[];
  onNavigate: (view: ViewId) => void;
  onReset: () => void;
}

const ICON_MAP: Record<TopicIconName, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  cloud: Cloud,
  layers: Layers,
  shield: ShieldCheck,
  compute: Server,
  network: Network,
  governance: Gavel,
  pricing: DollarSign,
  availability: Activity,
  storage: HardDrive,
  security: Lock,
  database: Database,
  analytics: BarChart3,
  monitor: Eye,
  iac: Code2,
  support: LifeBuoy,
  compliance: FileCheck,
};

function topicIcon(iconName: TopicIconName) {
  return ICON_MAP[iconName] ?? Cloud;
}

export function HomeView({ results, onNavigate, onReset }: HomeViewProps) {
  const completed = results.length;
  const correct = results.filter((r) => r.correct).length;
  const avgScore = completed > 0 ? Math.round((correct / completed) * 100) : null;

  const wrongByTopic = TOPICS.map((t) => {
    const topicResults = results.filter((r) => r.topicId === t.id);
    const wrong = topicResults.filter((r) => !r.correct);
    return { topic: t, wrongCount: wrong.length, total: topicResults.length };
  }).filter((x) => x.wrongCount > 0);

  const nextQuestion = QUESTIONS.find((q) => !results.some((r) => r.questionId === q.id));

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-2xl border border-navy-100 bg-gradient-to-br from-white via-azure-50/40 to-white p-6 sm:p-10 shadow-card">
        <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-azure-100/50 blur-3xl" aria-hidden="true" />
        <div className="absolute -bottom-20 -left-10 h-48 w-48 rounded-full bg-navy-100/40 blur-3xl" aria-hidden="true" />
        <div className="relative">
          <span className="chip bg-azure-50 text-azure-700">
            <Sparkles className="h-3.5 w-3.5" />
            AZ-900 Fundamentals
          </span>
          <h1 className="mt-4 max-w-2xl text-2xl font-bold leading-tight text-navy-800 sm:text-3xl">
            Let's make Azure easier to understand.
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-navy-500 sm:text-base">
            Understand the question. Spot the clue. Learn with confidence. Clarity
            Coach breaks down exam-style questions so you learn the why, not just
            the answer.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button className="btn-primary" onClick={() => onNavigate('practice')}>
              <Brain className="h-4 w-4" />
              Start Practice
            </button>
            <button className="btn-secondary" onClick={() => onNavigate('signal')}>
              <Search className="h-4 w-4" />
              Spot the Signal
            </button>
            <button className="btn-secondary" onClick={() => onNavigate('traps')}>
              <AlertTriangle className="h-4 w-4" />
              Explore Exam Traps
            </button>
          </div>
        </div>
      </section>

      {/* Topics */}
      <section className="mt-10">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-navy-400">
            What you'll learn
          </h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TOPICS.map((t) => {
            const Icon = topicIcon(t.icon);
            const topicResults = results.filter((r) => r.topicId === t.id);
            const topicCorrect = topicResults.filter((r) => r.correct).length;
            return (
              <button
                key={t.id}
                onClick={() => onNavigate('practice')}
                className="card group p-5 text-left transition-all hover:-translate-y-0.5 hover:shadow-cardHover"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-azure-50 text-azure-600 transition-colors group-hover:bg-azure-100">
                  <Icon className="h-5 w-5" strokeWidth={1.8} />
                </div>
                <h3 className="mt-4 text-base font-semibold text-navy-800">{t.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-500">{t.description}</p>
                {topicResults.length > 0 ? (
                  <p className="mt-3 text-xs font-medium text-azure-600">
                    {topicCorrect}/{topicResults.length} correct so far
                  </p>
                ) : (
                  <p className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-navy-400">
                    Not started yet
                    <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                  </p>
                )}
              </button>
            );
          })}
        </div>
      </section>

      {/* Progress + Continue */}
      <section className="mt-10 grid gap-5 lg:grid-cols-3">
        <div className="card p-5 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-base font-semibold text-navy-800">
              <TrendingUp className="h-4 w-4 text-azure-600" />
              Your progress
            </h2>
            {completed > 0 && (
              <button onClick={onReset} className="btn-ghost text-xs">
                <RotateCcw className="h-3.5 w-3.5" />
                Reset
              </button>
            )}
          </div>

          {completed === 0 ? (
            <div className="mt-6 flex flex-col items-center justify-center rounded-xl border border-dashed border-navy-200 bg-navy-50/40 px-6 py-10 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-azure-50 text-azure-500">
                <BookOpen className="h-6 w-6" />
              </div>
              <p className="mt-4 text-sm font-medium text-navy-700">
                No practice yet — that's perfectly okay
              </p>
              <p className="mt-1 max-w-sm text-xs leading-relaxed text-navy-400">
                Every learner starts somewhere. Once you answer a few questions,
                your progress, average score, and topics to revisit will appear
                right here.
              </p>
              <button className="btn-primary mt-5" onClick={() => onNavigate('practice')}>
                <Brain className="h-4 w-4" />
                Try your first question
              </button>
            </div>
          ) : (
            <>
              <div className="mt-5 grid grid-cols-3 gap-3">
                <StatCard
                  icon={<CheckCircle2 className="h-4 w-4" />}
                  label="Questions completed"
                  value={String(completed)}
                />
                <StatCard
                  icon={<TrendingUp className="h-4 w-4" />}
                  label="Average score"
                  value={`${avgScore}%`}
                />
                <StatCard
                  icon={<AlertTriangle className="h-4 w-4" />}
                  label="Topics to revisit"
                  value={String(wrongByTopic.length)}
                />
              </div>

              {wrongByTopic.length > 0 && (
                <div className="mt-5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-navy-400">
                    Topics to revisit
                  </p>
                  <ul className="mt-2 space-y-2">
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
                </div>
              )}
            </>
          )}
        </div>

        <div className="card flex flex-col p-5">
          <h2 className="flex items-center gap-2 text-base font-semibold text-navy-800">
            <BookOpen className="h-4 w-4 text-azure-600" />
            Continue learning
          </h2>
          {nextQuestion ? (
            <>
              <p className="mt-2 text-xs text-navy-400">
                {TOPICS.find((t) => t.id === nextQuestion.topicId)?.shortName}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-navy-600 line-clamp-3">
                {nextQuestion.prompt}
              </p>
              <button
                className="btn-secondary mt-auto pt-3"
                onClick={() => onNavigate('practice')}
              >
                Continue
                <ArrowRight className="h-4 w-4" />
              </button>
            </>
          ) : (
            <>
              <p className="mt-4 text-sm text-navy-600">
                You've answered every available question. Great work!
              </p>
              <button
                className="btn-secondary mt-auto pt-3"
                onClick={() => onNavigate('insights')}
              >
                See your insights
                <ArrowRight className="h-4 w-4" />
              </button>
            </>
          )}
        </div>
      </section>

      <div className="mt-10">
        <Disclaimer />
      </div>
    </div>
  );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-xl bg-navy-50/60 p-4">
      <div className="flex items-center gap-2 text-azure-600">{icon}</div>
      <p className="mt-2 text-2xl font-bold text-navy-800">{value}</p>
      <p className="text-[11px] font-medium uppercase tracking-wide text-navy-400">{label}</p>
    </div>
  );
}
