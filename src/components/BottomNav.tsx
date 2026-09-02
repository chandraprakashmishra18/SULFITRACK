import React from 'react';
import { ScreenId } from '../types';

interface BottomNavProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentScreen, onNavigate }) => {
  const navItems = [
    { path: 'landing' as ScreenId, icon: 'home', label: 'Home' },
    { path: 'scan' as ScreenId, icon: 'qr_code_scanner', label: 'Scan' },
    { path: 'workers' as ScreenId, icon: 'badge', label: 'Workers' },
    { path: 'history' as ScreenId, icon: 'history', label: 'History' },
    { path: 'dashboard' as ScreenId, icon: 'dashboard', label: 'Dashboard' }
  ];

  return (
    <nav
      className="fixed bottom-0 inset-x-0 z-50 pb-safe bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-lg"
      data-active-classes="text-orange-600 font-semibold"
    >
      <div className="flex justify-around items-center h-16 px-2 max-w-5xl mx-auto">
        {navItems.map((item) => {
          const isActive = currentScreen === item.path;
          return (
            <a
              key={item.path}
              id={`nav-${item.path}`}
              data-path={item.path}
              href={`#${item.path}`}
              aria-current={isActive ? 'page' : undefined}
              className={`flex flex-col items-center justify-center gap-1 w-16 h-12 rounded-lg transition-colors cursor-pointer ${
                isActive
                  ? 'text-orange-600 font-semibold'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
              onClick={(e) => {
                e.preventDefault();
                onNavigate(item.path);
              }}
            >
              <span
                className="material-symbols-outlined text-[20px]"
                style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
              >
                {item.icon}
              </span>
              <span className="text-[11px] tracking-tight">{item.label}</span>
            </a>
          );
        })}
      </div>
    </nav>
  );
};
