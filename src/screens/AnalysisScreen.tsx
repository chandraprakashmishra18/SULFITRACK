import React, { useState, useEffect } from 'react';
import { ScreenId } from '../types';

interface AnalysisScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onBack: () => void;
}

export const AnalysisScreen: React.FC<AnalysisScreenProps> = ({ onNavigate, onBack }) => {
  const [progress, setProgress] = useState(88);
  const [step9Complete, setStep9Complete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(100);
      setStep9Complete(true);
    }, 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col w-full gap-4 pb-12 animate-fadeIn">
      {/* Visual Telemetry & Scanning Simulation Card */}
      <div className="flex flex-col relative w-full bg-slate-900 text-white rounded-xl p-5 overflow-hidden shadow-sm border border-slate-800">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px]"></div>

        <div className="flex items-center justify-between mb-4 relative z-10">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-ping"></span>
            <span className="font-mono text-xs text-orange-400 uppercase tracking-wider font-semibold">
              AI Neural Core v4.2 · MRPL Engine
            </span>
          </div>
          <span className="font-mono text-xs text-slate-300 font-semibold" id="progress-text">
            {progress}% Complete
          </span>
        </div>

        {/* Simulated Dosimeter Scan Visualisation */}
        <div className="relative w-full h-36 bg-slate-950 rounded-lg flex items-center justify-center overflow-hidden mb-4 z-10 border border-slate-800">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-600/10 to-transparent animate-pulse"></div>

          <div className="w-24 h-28 bg-white rounded-md border border-slate-300 flex flex-col items-center justify-center p-2 relative shadow-sm">
            <span className="material-symbols-outlined text-orange-600 text-3xl mb-1">badge</span>
            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mb-1">
              <div
                className="bg-orange-600 h-full transition-all duration-700"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <span className="font-mono text-[10px] text-slate-600 font-bold">DOS-8840-X</span>

            {/* Scanning laser line */}
            <div className="absolute inset-x-0 h-0.5 bg-orange-500 shadow-[0_0_8px_#ea580c] animate-bounce"></div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden relative z-10 border border-slate-700">
          <div
            className="bg-orange-600 h-full rounded-full transition-all duration-700"
            id="main-progress-bar"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Warning Note */}
      <div className="flex items-start gap-3 bg-orange-50 text-slate-800 p-4 rounded-xl shadow-xs border border-orange-200">
        <span className="material-symbols-outlined text-orange-600 text-[20px] shrink-0 mt-0.5">
          warning
        </span>
        <div className="flex flex-col min-w-0">
          <span className="text-xs font-bold uppercase tracking-wider text-orange-900">
            Active Processing Warning
          </span>
          <p className="text-xs text-slate-700 mt-0.5 leading-relaxed">
            Do not close the application while analysis is in progress to ensure accurate chemical exposure metrics.
          </p>
        </div>
      </div>

      {/* Vertical Step-Based Processing Pipeline Card */}
      <div className="flex flex-col bg-white text-slate-900 rounded-xl p-5 shadow-sm border border-slate-200">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
          <h2 className="text-base font-bold text-slate-900">Pipeline Verification</h2>
          <span className="font-mono text-xs text-orange-700 px-2.5 py-0.5 rounded bg-orange-50 border border-orange-200 font-semibold">
            {step9Complete ? '9/9 Complete' : '8/9 Complete'}
          </span>
        </div>

        <div className="flex flex-col relative">
          {/* Vertical guiding line */}
          <div className="absolute left-[13px] top-3 bottom-3 w-0.5 bg-slate-200"></div>

          {/* Step 1: Badge detected */}
          <div className="flex items-start gap-3 relative pb-4">
            <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-300 flex items-center justify-center z-10 shrink-0 shadow-xs">
              <span className="material-symbols-outlined text-[15px] font-bold">check</span>
            </div>
            <div className="flex flex-col pt-0.5 min-w-0">
              <span className="text-xs font-bold text-slate-900">Badge detected</span>
              <span className="text-xs text-slate-500">Optical frame boundary confirmed</span>
            </div>
          </div>

          {/* Step 2: QR / Badge ID detected */}
          <div className="flex items-start gap-3 relative pb-4">
            <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-300 flex items-center justify-center z-10 shrink-0 shadow-xs">
              <span className="material-symbols-outlined text-[15px] font-bold">check</span>
            </div>
            <div className="flex flex-col pt-0.5 min-w-0">
              <span className="text-xs font-bold text-slate-900">QR / Badge ID detected</span>
              <span className="text-xs text-slate-500">ID #994-Alpha verified against DB</span>
            </div>
          </div>

          {/* Step 3: H2S strip detected */}
          <div className="flex items-start gap-3 relative pb-4">
            <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-300 flex items-center justify-center z-10 shrink-0 shadow-xs">
              <span className="material-symbols-outlined text-[15px] font-bold">check</span>
            </div>
            <div className="flex flex-col pt-0.5 min-w-0">
              <span className="text-xs font-bold text-slate-900">H₂S strip detected</span>
              <span className="text-xs text-slate-500">Reactive chemical matrix isolated</span>
            </div>
          </div>

          {/* Step 4: Reference scale detected */}
          <div className="flex items-start gap-3 relative pb-4">
            <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-300 flex items-center justify-center z-10 shrink-0 shadow-xs">
              <span className="material-symbols-outlined text-[15px] font-bold">check</span>
            </div>
            <div className="flex flex-col pt-0.5 min-w-0">
              <span className="text-xs font-bold text-slate-900">Reference scale detected</span>
              <span className="text-xs text-slate-500">Calibration grid markers indexed</span>
            </div>
          </div>

          {/* Step 5: Image quality verified */}
          <div className="flex items-start gap-3 relative pb-4">
            <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-300 flex items-center justify-center z-10 shrink-0 shadow-xs">
              <span className="material-symbols-outlined text-[15px] font-bold">check</span>
            </div>
            <div className="flex flex-col pt-0.5 min-w-0">
              <span className="text-xs font-bold text-slate-900">Image quality verified</span>
              <span className="text-xs text-slate-500">Sharpness & contrast index: 98.4%</span>
            </div>
          </div>

          {/* Step 6: Lighting correction */}
          <div className="flex items-start gap-3 relative pb-4">
            <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-300 flex items-center justify-center z-10 shrink-0 shadow-xs">
              <span className="material-symbols-outlined text-[15px] font-bold">check</span>
            </div>
            <div className="flex flex-col pt-0.5 min-w-0">
              <span className="text-xs font-bold text-slate-900">Lighting correction</span>
              <span className="text-xs text-slate-500">White balance & glare neutralized</span>
            </div>
          </div>

          {/* Step 7: Colour feature extraction */}
          <div className="flex items-start gap-3 relative pb-4">
            <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-300 flex items-center justify-center z-10 shrink-0 shadow-xs">
              <span className="material-symbols-outlined text-[15px] font-bold">check</span>
            </div>
            <div className="flex flex-col pt-0.5 min-w-0">
              <span className="text-xs font-bold text-slate-900">Colour feature extraction</span>
              <span className="text-xs text-slate-500">RGB-to-PPM spectral mapping complete</span>
            </div>
          </div>

          {/* Step 8: Environmental compensation */}
          <div className="flex items-start gap-3 relative pb-4">
            <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-300 flex items-center justify-center z-10 shrink-0 shadow-xs">
              <span className="material-symbols-outlined text-[15px] font-bold">check</span>
            </div>
            <div className="flex flex-col pt-0.5 min-w-0">
              <span className="text-xs font-bold text-slate-900">Environmental compensation</span>
              <span className="text-xs text-slate-500">Temperature & humidity bias factored</span>
            </div>
          </div>

          {/* Step 9: AI exposure estimation */}
          <div className="flex items-start gap-3 relative">
            {step9Complete ? (
              <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-300 flex items-center justify-center z-10 shrink-0 shadow-xs">
                <span className="material-symbols-outlined text-[15px] font-bold">check</span>
              </div>
            ) : (
              <div className="w-7 h-7 rounded-full bg-orange-600 text-white flex items-center justify-center z-10 shrink-0 shadow-sm animate-pulse">
                <span className="material-symbols-outlined text-[15px] animate-spin">progress_activity</span>
              </div>
            )}
            <div className="flex flex-col pt-0.5 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-900">
                  AI exposure estimation
                </span>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    step9Complete
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-orange-100 text-orange-800'
                  }`}
                >
                  {step9Complete ? 'RESOLVED' : 'IN PROGRESS'}
                </span>
              </div>
              <span className="text-xs text-slate-500 mt-0.5">
                {step9Complete
                  ? 'Cumulative dosage calculated: 10.2 ppm·h (Elevated)'
                  : 'Calculating cumulative dosage thresholds...'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="flex flex-col gap-2 pt-2">
        <button
          id="view-analysis-result-btn"
          className="w-full h-12 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-semibold flex items-center justify-center gap-2 shadow-sm shadow-orange-950/20 transition-all cursor-pointer active:scale-[0.98]"
          onClick={() => onNavigate('result')}
        >
          <span className="material-symbols-outlined text-[18px]">analytics</span>
          <span>View Analysis Result</span>
        </button>
      </div>
    </div>
  );
};
