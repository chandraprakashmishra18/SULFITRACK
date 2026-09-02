import React, { useState, useRef, useEffect } from 'react';
import { ScreenId } from '../types';

interface HeaderProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  onBack: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentScreen, onNavigate, onBack }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const backBtnRef = useRef<HTMLButtonElement>(null);

  // Determine if this screen displays a back button or the main SulfoTrack branding
  const isSubScreen = ['analysis', 'result', 'workers', 'report', 'how-it-works'].includes(currentScreen);

  useEffect(() => {
    if (backBtnRef.current) {
      backBtnRef.current.setAttribute('onclick', 'history.back()');
    }
  }, [isSubScreen, currentScreen]);

  const getSubScreenTitle = () => {
    switch (currentScreen) {
      case 'analysis':
        return 'Analysis';
      case 'result':
        return 'Result';
      case 'workers':
        return 'Profile';
      case 'report':
        return 'Report';
      case 'how-it-works':
        return 'Technical Explanation';
      default:
        return '';
    }
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-white/95 text-slate-800 border-b border-slate-200 backdrop-blur-md shadow-sm pt-safe">
      <div className="h-16 px-4 flex items-center justify-between max-w-5xl mx-auto">
        {isSubScreen ? (
          <div className="flex items-center gap-3">
            <button
              ref={backBtnRef}
              id="header-back-btn"
              className="w-9 h-9 flex items-center justify-center text-slate-700 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer border border-slate-200"
              onClick={onBack}
              title="Go back"
            >
              <span className="material-symbols-outlined text-[20px]">arrow_back</span>
            </button>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-orange-600 rounded-xs flex items-center justify-center font-bold text-xs text-white">S</div>
              <span className="font-semibold text-slate-900 text-base tracking-tight">{getSubScreenTitle()}</span>
            </div>
          </div>
        ) : (
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => onNavigate('landing')}
          >
            <div className="w-8 h-8 bg-orange-600 rounded-sm flex items-center justify-center font-bold text-lg text-white shadow-sm shadow-orange-600/20">
              S
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold tracking-tight text-slate-900 uppercase">SulfoTrack</span>
              <span className="text-[10px] text-slate-500 font-medium tracking-wider uppercase">
                Facility: Refinery Alpha-7
              </span>
            </div>
          </div>
        )}

        <div className="flex items-center gap-3">
          {/* Facility & Shift badge on medium screens */}
          <div className="hidden sm:flex items-center gap-2 text-slate-500 text-xs px-2.5 py-1 bg-slate-100 rounded-md border border-slate-200">
            <span className="font-medium text-slate-700">Refinery Alpha-7</span>
            <span className="w-1 h-1 bg-slate-400 rounded-full"></span>
            <span>Shift B (Night)</span>
          </div>

          <span className="px-2 py-0.5 rounded bg-orange-50 border border-orange-200 text-orange-700 font-mono text-xs font-semibold">
            DEMO
          </span>

          <button
            id="notifications-btn"
            className="w-9 h-9 flex items-center justify-center text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 relative transition-colors cursor-pointer border border-slate-200"
            onClick={() => setShowNotifications(!showNotifications)}
            title="Notifications"
          >
            <span className="material-symbols-outlined text-[20px]">notifications</span>
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-orange-600 ring-2 ring-white"></span>
          </button>

          {/* User Profile Info from Theme */}
          <div
            id="profile-btn"
            className="flex items-center gap-2.5 cursor-pointer pl-1 py-1 rounded-lg hover:bg-slate-50 transition-colors"
            onClick={() => onNavigate('workers')}
            title="Worker Profile: Marcus Vane"
          >
            <div className="text-right hidden md:block">
              <div className="text-xs font-semibold text-slate-800 leading-tight">Marcus Vane</div>
              <div className="text-[10px] text-slate-500">Safety Officer</div>
            </div>
            <div className="w-9 h-9 rounded-full bg-slate-200 border border-slate-300 flex items-center justify-center font-bold text-xs text-slate-700 shadow-xs">
              MV
            </div>
          </div>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-4 top-14 w-80 bg-white text-slate-900 rounded-xl shadow-xl p-3.5 border border-slate-200 z-50 animate-fadeIn">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Telemetry Alerts</span>
                <button
                  className="text-xs text-orange-600 font-medium hover:underline"
                  onClick={() => setShowNotifications(false)}
                >
                  Dismiss
                </button>
              </div>
              <div className="mt-2.5 space-y-2 text-xs">
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="flex items-center justify-between text-slate-900 font-semibold">
                    <span>Badge Calibration</span>
                    <span className="text-[10px] text-slate-400">02m ago</span>
                  </div>
                  <p className="text-slate-600 mt-0.5">Model ST-X7 #8492 synchronized with Alpha-7 base station.</p>
                </div>
                <div className="p-2.5 bg-orange-50/60 rounded-lg border border-orange-200">
                  <div className="flex items-center justify-between text-orange-800 font-semibold">
                    <span>Sector 4-G Attention</span>
                    <span className="text-[10px] text-orange-600">15m ago</span>
                  </div>
                  <p className="text-slate-700 mt-0.5">Atmospheric H₂S delta approaching threshold limits.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
