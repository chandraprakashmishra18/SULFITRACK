import React, { useState } from 'react';
import { ScreenId } from '../types';
import { REFINERY_FACILITY, CURRENT_SAFETY_OFFICER } from '../data/mockData';

interface ResultScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onBack: () => void;
  onSaveRecord?: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({ onNavigate, onBack, onSaveRecord }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = () => {
    setSavedSuccess(true);
    if (onSaveRecord) {
      onSaveRecord();
    }
    setTimeout(() => {
      setSavedSuccess(false);
    }, 4000);
  };

  return (
    <div className="flex flex-col w-full gap-4 pb-12 animate-fadeIn">
      {/* Top Status Card: ESTIMATED CUMULATIVE H₂S EXPOSURE */}
      <div className="flex flex-col bg-white rounded-2xl p-6 shadow-sm relative overflow-hidden border border-slate-200">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-amber-500"></div>

        <div className="flex justify-between items-start mb-2 pt-1">
          <div className="flex flex-col">
            <span className="font-mono text-xs font-bold text-slate-500 uppercase tracking-wider">
              ESTIMATED CUMULATIVE H₂S EXPOSURE
            </span>
            <span className="text-[11px] text-slate-500 font-mono mt-0.5">
              MRPL EHS Division • Shift B Exposure Record
            </span>
          </div>
          <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold flex items-center gap-1 shadow-xs">
            <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              warning
            </span>
            ELEVATED DOSE
          </span>
        </div>

        <div className="flex items-baseline gap-2 my-3">
          <span className="font-mono text-5xl font-extrabold text-slate-900 tracking-tight">
            10.2
          </span>
          <span className="font-mono text-slate-500 text-base font-semibold">PPM·h</span>
          <span className="ml-3 text-xs text-amber-800 font-medium bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
            Shift TWA Threshold Exceeded (Limit: 10.0 PPM·h)
          </span>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 mt-2 pt-3 border-t border-slate-100 text-xs">
          <span className="text-slate-600 flex items-center gap-1 font-medium">
            <span className="material-symbols-outlined text-[15px] text-emerald-600">verified</span>
            Calibrated Batch #2026-SRU-09 · SpectroCV Engine
          </span>
          <span className="text-orange-700 flex items-center gap-1 font-semibold font-mono">
            <span className="material-symbols-outlined text-[16px]">psychology</span>
            Spectrophotometric Confidence: 94.8%
          </span>
        </div>
      </div>

      {/* Horizontal Exposure Scale */}
      <div className="flex flex-col bg-white rounded-2xl p-5 shadow-sm gap-3 border border-slate-200">
        <div className="flex justify-between items-center">
          <div>
            <span className="text-sm font-bold text-slate-900">OISD-114 Exposure Spectrum</span>
            <span className="text-xs text-slate-500 ml-2">8-Hour Permissible Shift Exposure</span>
          </div>
          <span className="font-mono text-xs text-slate-600 font-semibold bg-slate-100 px-2 py-0.5 rounded">
            Ceiling Limit: 10.0 PPM·h
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <div className="grid grid-cols-4 gap-1.5 h-3.5 rounded-full overflow-hidden bg-slate-100 p-0.5 border border-slate-200">
            <div className="bg-emerald-500 rounded-l-full" title="Low: < 2.0 PPM·h"></div>
            <div className="bg-blue-500" title="Normal: 2.0 - 5.0 PPM·h"></div>
            <div className="bg-amber-500 relative ring-2 ring-slate-900 ring-offset-1 rounded-sm shadow-xs" title="Elevated: 5.0 - 10.0 PPM·h">
              <div className="absolute inset-0 bg-amber-400 animate-ping opacity-60"></div>
            </div>
            <div className="bg-red-600 rounded-r-full" title="Critical: > 10.0 PPM·h"></div>
          </div>

          <div className="flex justify-between font-mono text-[11px] px-1 font-bold">
            <span className="text-emerald-700">LOW (&lt;2)</span>
            <span className="text-blue-700">NORMAL (2-5)</span>
            <span className="text-amber-800 underline decoration-2 font-extrabold">ELEVATED (5-10)</span>
            <span className="text-red-700">CRITICAL (&gt;10)</span>
          </div>
        </div>
      </div>

      {/* Environmental Conditions & Badge Info Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Environmental Conditions */}
        <div className="flex flex-col bg-white rounded-2xl p-4 shadow-sm gap-2 border border-slate-200">
          <div className="flex items-center gap-2 text-slate-700">
            <span className="material-symbols-outlined text-[18px] text-orange-600">thermostat</span>
            <span className="text-xs uppercase font-bold text-slate-800 tracking-wider">Plant Micro-Climate</span>
          </div>
          <div className="flex flex-col gap-2 mt-1">
            <div className="flex justify-between items-center text-xs pb-1.5 border-b border-slate-100">
              <span className="text-slate-500">Ambient Temperature</span>
              <span className="font-mono text-slate-900 font-bold text-sm">31.0°C</span>
            </div>
            <div className="flex justify-between items-center text-xs pb-1.5 border-b border-slate-100">
              <span className="text-slate-500">Relative Humidity</span>
              <span className="font-mono text-slate-900 font-bold text-sm">64% RH (Coastal)</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-500">Kinetic Rate Bias</span>
              <span className="font-mono text-emerald-700 font-bold text-xs">1.04x Normal</span>
            </div>
          </div>
        </div>

        {/* Worker & Badge Info */}
        <div className="flex flex-col bg-white rounded-2xl p-4 shadow-sm gap-2 border border-slate-200">
          <div className="flex items-center gap-2 text-slate-700">
            <span className="material-symbols-outlined text-[18px] text-orange-600">badge</span>
            <span className="text-xs uppercase font-bold text-slate-800 tracking-wider">Worker & Badge File</span>
          </div>
          <div className="flex flex-col gap-2 mt-1">
            <div className="flex justify-between items-center text-xs pb-1.5 border-b border-slate-100">
              <span className="text-slate-500">Worker Name</span>
              <span className="font-sans text-slate-900 font-bold text-xs">Rajesh Kumar (WRK-1048)</span>
            </div>
            <div className="flex justify-between items-center text-xs pb-1.5 border-b border-slate-100">
              <span className="text-slate-500">Department / Unit</span>
              <span className="font-sans text-slate-900 font-semibold text-xs">Hydrocracker Unit (HCU-2)</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-500">Gate Pass / Badge ID</span>
              <span className="font-mono text-slate-900 font-bold text-xs">MRPL-GP-4819 · ST-WB-00124</span>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Badge Metadata Card */}
      <div className="flex items-center justify-between bg-white rounded-2xl px-5 py-4 shadow-sm border border-slate-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-600">
            <span className="material-symbols-outlined text-[20px]">verified_user</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-slate-900 font-bold">Shift B (Evening) • 13 Oct 2026</span>
            <span className="text-xs text-slate-500">
              HSE Supervisor Signoff: {CURRENT_SAFETY_OFFICER.name} ({CURRENT_SAFETY_OFFICER.empId})
            </span>
          </div>
        </div>
        <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 font-mono text-xs font-bold border border-emerald-200">
          VALIDATED
        </span>
      </div>

      {/* Expandable 'How was this estimated?' Section */}
      <div className="flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200">
        <button
          id="how-estimated-toggle"
          type="button"
          className="w-full p-4 flex items-center justify-between text-left focus:outline-none hover:bg-slate-50 transition-colors cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-orange-600">schema</span>
            <span className="text-sm text-slate-900 font-bold">
              Engineering Breakdown: How Was 10.2 PPM·h Calculated?
            </span>
          </div>
          <span
            className={`material-symbols-outlined text-slate-400 transition-transform duration-200 ${
              isExpanded ? 'rotate-180' : ''
            }`}
          >
            expand_more
          </span>
        </button>

        {isExpanded && (
          <div className="flex flex-col px-5 pb-5 gap-3.5 border-t border-slate-100 pt-3 animate-fadeIn">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center font-mono flex-shrink-0 mt-0.5 text-xs font-bold">
                1
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-900">
                  Passive Colorimetric Reaction
                </span>
                <span className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                  Lead acetate / bismuth salt paper strip absorbed cumulative H₂S gas during worker's shift, forming insoluble dark sulfide precipitate.
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center font-mono flex-shrink-0 mt-0.5 text-xs font-bold">
                2
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-900">
                  Printed Reference Scale Normalization
                </span>
                <span className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                  The camera captured both the chemical patch and the concentric factory calibration ring to neutralize ambient refinery sodium-vapor lighting casts.
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center font-mono flex-shrink-0 mt-0.5 text-xs font-bold">
                3
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-900">
                  Micro-Climate Diffusion Compensation
                </span>
                <span className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                  Incorporated real Mangaluru refinery weather telemetry (31.0°C temperature, 64% RH) into chemical reaction kinetics.
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-orange-600 text-white flex items-center justify-center font-mono flex-shrink-0 mt-0.5 text-xs font-bold">
                <span className="material-symbols-outlined text-[14px]">bolt</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-900">
                  SpectroCV Empirical Dose Regression
                </span>
                <span className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                  Mapped Delta-E Euclidean distance (2.84) against factory exposure curves to determine exact dose of 10.2 PPM·h.
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Save Success Banner */}
      {savedSuccess && (
        <div className="p-4 bg-emerald-50 text-emerald-900 rounded-xl border border-emerald-200 flex items-center gap-2.5 animate-fadeIn text-xs sm:text-sm font-medium">
          <span className="material-symbols-outlined text-emerald-600 text-[22px]">verified</span>
          <div>
            <strong>Exposure Dossier Committed:</strong> Worker Rajesh Kumar (WRK-1048) logged 10.2 PPM·h under Badge #ST-WB-00124. Notification dispatched to HSE desk.
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 mt-2">
        <button
          id="save-exposure-btn"
          type="button"
          className="flex-1 h-12 bg-orange-600 hover:bg-orange-700 text-white rounded-xl font-semibold flex items-center justify-center gap-2 shadow-sm shadow-orange-950/20 transition-all cursor-pointer active:scale-[0.98]"
          onClick={handleSave}
        >
          <span className="material-symbols-outlined text-[20px]">save</span>
          <span>Save to Enterprise Safety Database</span>
        </button>

        <button
          id="view-worker-history-btn"
          type="button"
          className="flex-1 h-12 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl font-semibold flex items-center justify-center gap-2 border border-slate-200 transition-colors cursor-pointer active:scale-[0.98]"
          onClick={() => onNavigate('history')}
        >
          <span className="material-symbols-outlined text-[20px]">history</span>
          <span>View Worker Exposure History</span>
        </button>
      </div>
    </div>
  );
};
