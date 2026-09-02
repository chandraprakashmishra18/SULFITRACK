import React, { useState, useRef, useEffect } from 'react';
import { ScreenId } from '../types';
import { PIPELINE_STAGES } from '../data/mockData';

interface HowItWorksScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onBack: () => void;
}

export const HowItWorksScreen: React.FC<HowItWorksScreenProps> = ({ onNavigate, onBack }) => {
  const [downloaded, setDownloaded] = useState(false);
  const backBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (backBtnRef.current) {
      backBtnRef.current.setAttribute('onclick', 'history.back()');
    }
  }, []);

  const handleDownload = () => {
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  return (
    <div className="flex flex-col w-full gap-4 pb-16 animate-fadeIn">
      {/* Top Navigation Back Action */}
      <div className="flex items-center justify-between pb-1">
        <button
          ref={backBtnRef}
          id="how-it-works-back-btn"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 border border-slate-200 transition-colors cursor-pointer text-xs font-semibold"
          onClick={onBack}
          title="Back to landing screen"
        >
          <span className="material-symbols-outlined text-[16px]">arrow_back</span>
          <span>Back to Home</span>
        </button>
        <span className="font-mono text-slate-500 text-xs">Section: System Architecture</span>
      </div>

      {/* System Architecture Card */}
      <div className="bg-slate-900 text-white rounded-xl p-5 flex flex-col gap-3 shadow-sm border border-slate-800 relative overflow-hidden">
        <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-orange-600/10 pointer-events-none blur-xl"></div>
        <div className="flex items-center justify-between">
          <span className="px-2 py-0.5 rounded bg-orange-600/20 text-orange-400 font-mono font-bold text-xs border border-orange-500/30">
            SYSTEM ARCHITECTURE
          </span>
          <span className="font-mono text-slate-400 text-xs">v4.2-STABLE</span>
        </div>
        <h1 className="text-xl text-white font-bold">Technical Explanation</h1>
        <p className="text-sm text-slate-300 leading-relaxed">
          SulfiTrack does not directly measure instantaneous H₂S concentration. The passive chemical
          response is calibrated against known concentration-duration exposures and digitally
          interpreted to estimate cumulative exposure.
        </p>
      </div>

      {/* Visual Processing Pipeline (10 STAGES) */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between px-1">
          <span className="font-mono text-xs text-slate-500 font-bold uppercase tracking-wider">
            Visual Processing Pipeline
          </span>
          <span className="font-mono text-orange-600 font-bold text-xs">10 STAGES</span>
        </div>

        <div className="flex flex-col gap-3">
          {PIPELINE_STAGES.map((stage) => {
            const isFinal = stage.num === '10';
            return (
              <div
                key={stage.num}
                className="bg-white rounded-xl p-4 flex items-start gap-4 shadow-sm relative border border-slate-200"
              >
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono flex-shrink-0 font-bold text-xs ${
                    isFinal ? 'bg-orange-600 text-white shadow-sm shadow-orange-950/20' : 'bg-slate-900 text-white'
                  }`}
                >
                  {stage.num}
                </div>
                <div className="flex flex-col gap-1 min-w-0 flex-grow">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-900 font-bold truncate">
                      {stage.title}
                    </span>
                    <span className="material-symbols-outlined text-orange-600 text-[20px]">
                      {stage.icon}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 leading-normal">{stage.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Digital Safety Record Card */}
      <div className="bg-white rounded-xl p-5 flex flex-col gap-3 shadow-sm border border-slate-200">
        <div className="flex items-center gap-2 text-orange-600">
          <span className="material-symbols-outlined text-[20px]">verified_user</span>
          <h2 className="text-sm font-bold text-slate-900">Digital Safety Record</h2>
        </div>
        <p className="text-xs text-slate-500 leading-relaxed">
          All computed exposure metrics are securely stamped with device telemetry, location
          hashes, and operator identifiers, forming an immutable audit trail for enterprise EHS
          compliance.
        </p>

        {downloaded && (
          <div className="p-3 bg-emerald-50 text-emerald-800 rounded-lg text-xs font-semibold flex items-center gap-2 border border-emerald-200 animate-fadeIn">
            <span className="material-symbols-outlined text-[16px]">check_circle</span>
            <span>Technical Protocol Whitepaper v4.2 downloaded successfully.</span>
          </div>
        )}

        <button
          id="download-whitepaper-btn"
          type="button"
          className="w-full h-11 bg-orange-600 text-white rounded-lg font-semibold text-xs flex items-center justify-center gap-2 active:scale-[0.99] transition-all hover:bg-orange-700 cursor-pointer shadow-sm shadow-orange-950/20"
          onClick={handleDownload}
        >
          <span className="material-symbols-outlined text-[18px]">download</span>
          <span>Download Full Protocol Whitepaper</span>
        </button>
      </div>
    </div>
  );
};
