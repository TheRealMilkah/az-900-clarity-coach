import { User, Mail, LogOut, ArrowLeft } from 'lucide-react';
import type { ViewId } from '@/App';
import { useAuth } from '@/hooks/useAuth';

interface AccountViewProps {
  onNavigate: (view: ViewId) => void;
}

export function AccountView({ onNavigate }: AccountViewProps) {
  const { profile, signOut } = useAuth();

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-navy-800 sm:text-3xl">
        Your Account
      </h1>

      <div className="card mt-6 p-6 sm:p-8">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-azure-500 to-azure-700 text-white shadow-sm">
            <User className="h-8 w-8" />
          </div>
          <div>
            <p className="text-lg font-bold text-navy-800">
              {profile?.display_name ?? 'Learner'}
            </p>
            <p className="text-sm text-navy-400">
              {profile?.email ?? '—'}
            </p>
          </div>
        </div>

        <div className="mt-6 space-y-4 border-t border-navy-100 pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-navy-50 text-navy-500">
                <User className="h-4 w-4" />
              </div>
              <span className="text-sm font-semibold text-navy-600">Name</span>
            </div>
            <span className="text-sm font-medium text-navy-800">
              {profile?.display_name ?? '—'}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-navy-50 text-navy-500">
                <Mail className="h-4 w-4" />
              </div>
              <span className="text-sm font-semibold text-navy-600">Email address</span>
            </div>
            <span className="text-sm font-medium text-navy-800">
              {profile?.email ?? '—'}
            </span>
          </div>
        </div>

        <div className="mt-6 border-t border-navy-100 pt-6">
          <button
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-5 py-3 text-sm font-semibold text-rose-700 transition-all hover:bg-rose-100"
            onClick={async () => {
              await signOut();
              onNavigate('landing');
            }}
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </div>
      </div>

      <button
        className="mt-4 flex items-center gap-2 text-sm font-medium text-navy-500 hover:text-navy-700"
        onClick={() => onNavigate('learning-space')}
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Learning Space
      </button>
    </div>
  );
}
