import { useState } from 'react';
import { ChevronDown, Search, Info } from 'lucide-react';
import { EXAM_TRAPS } from '@/data/examTraps';

export function ExamTrapsView() {
  const [openId, setOpenId] = useState<string | null>(EXAM_TRAPS[0].id);
  const [query, setQuery] = useState('');

  const filtered = EXAM_TRAPS.filter((g) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      g.title.toLowerCase().includes(q) ||
      g.summary.toLowerCase().includes(q) ||
      g.items.some(
        (i) =>
          i.name.toLowerCase().includes(q) ||
          i.whatItDoes.toLowerCase().includes(q) ||
          i.examClue.toLowerCase().includes(q),
      )
    );
  });

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-navy-800 sm:text-2xl">Exam Traps</h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-navy-500">
          Azure has many services that sound alike but do different jobs. Learn
          what each one does, when it fits, and the wording that helps you tell
          them apart.
        </p>
      </div>

      {/* Search */}
      <div className="relative mb-5">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search services or clues…"
          className="w-full rounded-xl border border-navy-200 bg-white py-2.5 pl-9 pr-3 text-sm text-navy-700 placeholder:text-navy-300 focus:border-azure-400 focus:outline-none focus:ring-2 focus:ring-azure-100"
        />
      </div>

      {/* Accordion */}
      <div className="space-y-3">
        {filtered.map((group) => {
          const open = openId === group.id;
          return (
            <div key={group.id} className="card overflow-hidden">
              <button
                onClick={() => setOpenId(open ? null : group.id)}
                className="flex w-full items-center justify-between gap-3 p-4 text-left sm:p-5"
              >
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold text-navy-800 sm:text-base">
                    {group.title}
                  </h3>
                  <p className="mt-1 line-clamp-1 text-xs text-navy-400">
                    {group.summary}
                  </p>
                </div>
                <ChevronDown
                  className={`h-5 w-5 flex-none text-navy-400 transition-transform ${
                    open ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {open && (
                <div className="border-t border-navy-100 p-4 sm:p-5">
                  <p className="mb-4 text-sm leading-relaxed text-navy-500">
                    {group.summary}
                  </p>
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {group.items.map((item) => (
                      <div
                        key={item.name}
                        className="flex flex-col rounded-xl border border-navy-100 bg-navy-50/30 p-4"
                      >
                        <h4 className="text-sm font-semibold text-azure-700">
                          {item.name}
                        </h4>
                        <Field label="What it does" body={item.whatItDoes} />
                        <Field label="When to use it" body={item.whenToUse} />
                        <div className="mt-3 rounded-lg border border-amber-200 bg-amber-50/60 p-3">
                          <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-amber-700">
                            <Info className="h-3 w-3" /> Exam clue
                          </p>
                          <p className="mt-1 text-xs leading-relaxed text-navy-600">
                            {item.examClue}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="card p-8 text-center">
            <p className="text-sm font-medium text-navy-600">No matches found</p>
            <p className="mt-1 text-xs text-navy-400">
              Try a different search term.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function Field({ label, body }: { label: string; body: string }) {
  return (
    <div className="mt-3">
      <p className="text-[11px] font-semibold uppercase tracking-wide text-navy-400">
        {label}
      </p>
      <p className="mt-1 text-xs leading-relaxed text-navy-600">{body}</p>
    </div>
  );
}
