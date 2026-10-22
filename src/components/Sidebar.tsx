import {
  LayoutDashboard, Brain, AlertTriangle, BarChart3, GraduationCap,
  Search, User, TrendingUp, LogOut,
} from 'lucide-react';
import type { ViewId } from '@/App';

interface NavItem {
  id: ViewId;
  label: string;
  icon: typeof LayoutDashboard;
}

interface SidebarProps {
  current: ViewId;
  onNavigate: (view: ViewId) => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
  displayName: string;
  onSignOut: () => void;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'learning-space', label: 'Learning Space', icon: LayoutDashboard },
  { id: 'practice', label: 'Practice', icon: Brain },
  { id: 'progress', label: 'Progress', icon: TrendingUp },
  { id: 'signal', label: 'Spot the Signal', icon: Search },
  { id: 'traps', label: 'Exam Traps', icon: AlertTriangle },
  { id: 'insights', label: 'Insights', icon: BarChart3 },
];

export function Sidebar({ current, onNavigate, mobileOpen, onCloseMobile, displayName, onSignOut }: SidebarProps) {
  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-navy-900/40 backdrop-blur-sm lg:hidden"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-navy-100 bg-white transition-transform duration-300 lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-16 items-center gap-3 border-b border-navy-100 px-5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-azure-500 to-azure-700 text-white shadow-sm">
            <GraduationCap className="h-5 w-5" strokeWidth={2.2} />
          </div>
          <div className="leading-tight">
            <p className="text-sm font-bold text-navy-800">Clarity Coach</p>
            <p className="text-[11px] font-medium text-navy-400">AZ-900 Study Aid</p>
          </div>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = current === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  onCloseMobile();
                }}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                  active
                    ? 'bg-azure-50 text-azure-700'
                    : 'text-navy-600 hover:bg-navy-50 hover:text-navy-800'
                }`}
              >
                <Icon
                  className={`h-4.5 w-4.5 ${active ? 'text-azure-600' : 'text-navy-400'}`}
                  strokeWidth={2}
                />
                {item.label}
                {active && (
                  <span className="ml-auto h-1.5 w-1.5 rounded-full bg-azure-500" />
                )}
              </button>
            );
          })}
        </nav>

        <div className="border-t border-navy-100 p-3">
          <button
            onClick={() => {
              onNavigate('account');
              onCloseMobile();
            }}
            className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
              current === 'account'
                ? 'bg-azure-50 text-azure-700'
                : 'text-navy-600 hover:bg-navy-50 hover:text-navy-800'
            }`}
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-azure-500 to-azure-700 text-white">
              <User className="h-3.5 w-3.5" />
            </div>
            <span className="truncate">{displayName}</span>
          </button>
          <button
            onClick={onSignOut}
            className="mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-navy-500 transition-all hover:bg-rose-50 hover:text-rose-600"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </div>
      </aside>
    </>
  );
}
