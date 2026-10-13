import React, { useState, useRef, useEffect } from 'react';
import { ScreenId } from '../types';
import { REFINERY_FACILITY, CURRENT_SAFETY_OFFICER } from '../data/mockData';

interface HeaderProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  onBack: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentScreen, onNavigate, onBack }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notificationsRead, setNotificationsRead] = useState(false);
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
        return 'SpectroCV Analysis';
      case 'result':
        return 'Dosimetry Result';
      case 'workers':
        return 'Personnel Dossier';
      case 'report':
        return 'OISD Compliance Report';
      case 'how-it-works':
        return 'Engineering Architecture';
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
              <div className="w-6 h-6 bg-orange-600 rounded-sm flex items-center justify-center font-bold text-xs text-white shadow-xs">
                S
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-slate-900 text-sm tracking-tight">{getSubScreenTitle()}</span>
                <span className="text-[10px] text-slate-500 font-mono hidden sm:inline">
                  {REFINERY_FACILITY.name} · {REFINERY_FACILITY.division}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => onNavigate('landing')}
          >
            <div className="w-9 h-9 bg-orange-600 rounded-md flex items-center justify-center font-bold text-lg text-white shadow-sm shadow-orange-600/20">
              S
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-base font-bold tracking-tight text-slate-900 uppercase">SulfoTrack</span>
                <span className="hidden xs:inline-block px-1.5 py-0.2 bg-orange-100 text-orange-800 text-[10px] font-mono font-bold rounded">
                  SIH-MRPL
                </span>
              </div>
              <span className="text-[10px] text-slate-500 font-medium tracking-wide">
                {REFINERY_FACILITY.name} · Mangaluru
              </span>
            </div>
          </div>
        )}

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Shift badge */}
          <div className="hidden sm:flex items-center gap-2 text-slate-600 text-xs px-2.5 py-1 bg-slate-100 rounded-md border border-slate-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-semibold text-slate-800">Shift B (Evening)</span>
            <span className="w-1 h-1 bg-slate-400 rounded-full"></span>
            <span className="text-slate-500 font-mono text-[11px]">14:00 - 22:00 IST</span>
          </div>

          {/* OISD Status Pill */}
          <span className="px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200 text-emerald-800 font-mono text-[11px] font-bold hidden md:inline-flex items-center gap-1">
            <span className="material-symbols-outlined text-[13px] text-emerald-600">verified</span>
            OISD-114
          </span>

          {/* Notifications Button */}
          <button
            id="notifications-btn"
            className="w-9 h-9 flex items-center justify-center text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 relative transition-colors cursor-pointer border border-slate-200"
            onClick={() => {
              setShowNotifications(!showNotifications);
              setNotificationsRead(true);
            }}
            title="Refinery Safety Notifications"
          >
            <span className="material-symbols-outlined text-[20px]">notifications</span>
            {!notificationsRead && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-orange-600 ring-2 ring-white"></span>
            )}
          </button>

          {/* Safety Officer Profile */}
          <div
            id="profile-btn"
            className="flex items-center gap-2 cursor-pointer pl-1 py-1 rounded-lg hover:bg-slate-50 transition-colors"
            onClick={() => onNavigate('workers')}
            title={`Safety Officer: ${CURRENT_SAFETY_OFFICER.name} (${CURRENT_SAFETY_OFFICER.role})`}
          >
            <div className="text-right hidden md:block">
              <div className="text-xs font-semibold text-slate-800 leading-tight">
                {CURRENT_SAFETY_OFFICER.name}
              </div>
              <div className="text-[10px] text-slate-500 font-medium">
                Chief HSE Officer
              </div>
            </div>
            <div className="w-9 h-9 rounded-full bg-orange-100 border border-orange-300 flex items-center justify-center font-bold text-xs text-orange-900 shadow-xs">
              {CURRENT_SAFETY_OFFICER.initials}
            </div>
          </div>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-4 top-14 w-84 sm:w-96 bg-white text-slate-900 rounded-xl shadow-xl p-4 border border-slate-200 z-50 animate-fadeIn">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-orange-600 text-[18px]">emergency_home</span>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    MRPL Plant Safety Alerts
                  </span>
                </div>
                <button
                  className="text-xs text-orange-600 font-semibold hover:underline"
                  onClick={() => setShowNotifications(false)}
                >
                  Close
                </button>
              </div>

              <div className="mt-3 space-y-2.5 text-xs max-h-80 overflow-y-auto">
                <div className="p-2.5 bg-amber-50/70 rounded-lg border border-amber-200">
                  <div className="flex items-center justify-between text-amber-900 font-semibold">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[15px] text-amber-600">warning</span>
                      Approaching Shift Limit
                    </span>
                    <span className="text-[10px] text-amber-700 font-mono">04m ago</span>
                  </div>
                  <p className="text-slate-700 mt-1 leading-relaxed">
                    Worker <strong>Rajesh Kumar (WRK-1048)</strong> logged <strong>10.2 PPM·h</strong> at HCU-2. Shift rotation recommended.
                  </p>
                </div>

                <div className="p-2.5 bg-red-50/70 rounded-lg border border-red-200">
                  <div className="flex items-center justify-between text-red-900 font-semibold">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[15px] text-red-600">crisis_alert</span>
                      Confined Space Critical Peak
                    </span>
                    <span className="text-[10px] text-red-700 font-mono">Shift C Record</span>
                  </div>
                  <p className="text-slate-700 mt-1 leading-relaxed">
                    Tank Farm 3B Sludge Pit: <strong>Deepak Sharma (WRK-1077)</strong> logged <strong>14.8 PPM·h</strong>. SCBA ventilation activated.
                  </p>
                </div>

                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="flex items-center justify-between text-slate-900 font-semibold">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[15px] text-emerald-600">check_circle</span>
                      Batch Calibration Sync
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">1h ago</span>
                  </div>
                  <p className="text-slate-600 mt-1 leading-relaxed">
                    Central Analytical Lab (Pooja Deshmukh) verified calibration swatches for Batch #2026-SRU-09.
                  </p>
                </div>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span>Emergency Control Room: <strong>Ext. 2222</strong></span>
                <button
                  onClick={() => {
                    setShowNotifications(false);
                    onNavigate('dashboard');
                  }}
                  className="text-orange-600 font-bold hover:underline"
                >
                  View Feed →
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
