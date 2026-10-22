import { useState } from 'react';
import { GraduationCap, Menu, X } from 'lucide-react';
import type { ViewId } from '@/App';

interface PublicNavProps {
  current: ViewId;
  onNavigate: (view: ViewId) => void;
}

const PUBLIC_LINKS: { id: ViewId; label: string }[] = [
  { id: 'landing', label: 'Home' },
  { id: 'practice', label: 'Practice' },
  { id: 'about', label: 'About' },
];

export function PublicNav({ current, onNavigate }: PublicNavProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-navy-100 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => onNavigate('landing')}
          className="flex items-center gap-2.5"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-azure-500 to-azure-700 text-white shadow-sm">
            <GraduationCap className="h-5 w-5" strokeWidth={2.2} />
          </div>
          <span className="text-sm font-bold uppercase tracking-wide text-navy-800">
            Clarity Coach
          </span>
        </button>

        <nav className="hidden items-center gap-1 md:flex">
          {PUBLIC_LINKS.map((link) => (
            <button
              key={link.id}
              onClick={() => onNavigate(link.id)}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                current === link.id
                  ? 'text-azure-700'
                  : 'text-navy-600 hover:text-navy-800'
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <button
            onClick={() => onNavigate('signin')}
            className="btn-ghost text-sm"
          >
            Sign in
          </button>
          <button
            onClick={() => onNavigate('signup')}
            className="btn-primary text-sm"
          >
            Create Account
          </button>
        </div>

        <button
          onClick={() => setMobileOpen((v) => !v)}
          className="rounded-lg p-2 text-navy-600 hover:bg-navy-50 md:hidden"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-navy-100 bg-white px-4 py-3 md:hidden">
          <nav className="flex flex-col gap-1">
            {PUBLIC_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  onNavigate(link.id);
                  setMobileOpen(false);
                }}
                className={`rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors ${
                  current === link.id
                    ? 'bg-azure-50 text-azure-700'
                    : 'text-navy-600 hover:bg-navy-50'
                }`}
              >
                {link.label}
              </button>
            ))}
            <div className="mt-2 flex flex-col gap-2 border-t border-navy-100 pt-3">
              <button
                onClick={() => {
                  onNavigate('signin');
                  setMobileOpen(false);
                }}
                className="btn-secondary w-full"
              >
                Sign in
              </button>
              <button
                onClick={() => {
                  onNavigate('signup');
                  setMobileOpen(false);
                }}
                className="btn-primary w-full"
              >
                Create Account
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
