import { Menu, X } from 'lucide-react';

interface TopBarProps {
  title: string;
  subtitle?: string;
  onOpenMobile: () => void;
}

export function TopBar({ title, subtitle, onOpenMobile }: TopBarProps) {
  return (
    <header className="sticky top-0 z-20 border-b border-navy-100 bg-white/80 backdrop-blur-md">
      <div className="flex h-16 items-center gap-3 px-4 sm:px-6 lg:px-8">
        <button
          onClick={onOpenMobile}
          className="rounded-lg p-2 text-navy-600 hover:bg-navy-50 lg:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div className="min-w-0">
          <h1 className="truncate text-lg font-bold text-navy-800">{title}</h1>
          {subtitle && (
            <p className="truncate text-xs text-navy-400">{subtitle}</p>
          )}
        </div>
      </div>
    </header>
  );
}

export function MobileCloseButton({ onClose }: { onClose: () => void }) {
  return (
    <button
      onClick={onClose}
      className="absolute right-3 top-3 rounded-lg p-1.5 text-navy-400 hover:bg-navy-50 lg:hidden"
      aria-label="Close menu"
    >
      <X className="h-5 w-5" />
    </button>
  );
}
