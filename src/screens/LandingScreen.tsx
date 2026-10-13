import React from 'react';
import { ScreenId } from '../types';
import { REFINERY_FACILITY } from '../data/mockData';

interface LandingScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export const LandingScreen: React.FC<LandingScreenProps> = ({ onNavigate }) => {
  return (
    <div className="flex flex-col w-full pb-8 animate-fadeIn">
      {/* Hero Banner Card */}
      <div className="relative bg-slate-900 text-slate-300 rounded-2xl p-6 sm:p-8 mb-6 overflow-hidden shadow-md border border-slate-800">
        <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-orange-600/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -left-12 -top-12 w-64 h-64 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col gap-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-slate-800 text-orange-400 border border-slate-700 font-mono text-xs font-semibold uppercase tracking-wider">
                SIH · MRPL Safety Initiative
              </span>
              <span className="px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 font-mono text-xs font-medium">
                OISD-114 Compliant
              </span>
            </div>
            <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-semibold bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-800">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>LIVE SHIFT B · REFINERY MONITORED</span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <span className="font-mono text-slate-400 uppercase tracking-widest text-xs font-semibold">
              Passive H₂S Cumulative Exposure Dosimetry
            </span>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center font-bold text-xl text-white shadow-md shadow-orange-600/30">
                S
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight uppercase">
                SULFITRACK
              </h1>
            </div>
            <p className="text-lg sm:text-xl text-orange-400 font-medium">
              Don't Just Detect Gas. Quantify Worker Cumulative Dose.
            </p>
          </div>

          <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
            A zero-power passive colorimetric dosimeter wristband paired with smartphone-based computer vision. 
            Tailored for hazardous refinery environments across <strong>{REFINERY_FACILITY.name}</strong> to safeguard personnel against insidious low-level H₂S exposure.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <a
              id="landing-scan-btn"
              className="flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-semibold px-6 py-3.5 rounded-xl shadow-md shadow-orange-950/40 transition-all cursor-pointer active:scale-[0.98]"
              data-path="scan"
              href="#scan"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('scan');
              }}
            >
              <span className="material-symbols-outlined text-[20px]">qr_code_scanner</span>
              <span>Scan Dosimeter Wristband</span>
            </a>
            <a
              id="landing-dashboard-btn"
              className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold px-6 py-3.5 rounded-xl border border-slate-700 transition-all cursor-pointer active:scale-[0.98]"
              data-path="dashboard"
              href="#dashboard"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('dashboard');
              }}
            >
              <span className="material-symbols-outlined text-[20px]">monitoring</span>
              <span>Plant Telemetry Dashboard</span>
            </a>
          </div>

          {/* Plant Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-800/80 text-xs">
            <div>
              <span className="text-slate-500 block font-mono text-[11px]">ACTIVE WRISTBANDS</span>
              <span className="text-white font-bold text-sm">142 Deployed</span>
            </div>
            <div>
              <span className="text-slate-500 block font-mono text-[11px]">TARGET REFINERY</span>
              <span className="text-white font-bold text-sm">MRPL Mangaluru</span>
            </div>
            <div>
              <span className="text-slate-500 block font-mono text-[11px]">HAZARD UNIT</span>
              <span className="text-white font-bold text-sm">SRU-3 & HCU-2</span>
            </div>
            <div>
              <span className="text-slate-500 block font-mono text-[11px]">CALIBRATION ACCURACY</span>
              <span className="text-emerald-400 font-bold text-sm">94.8% (CIELAB)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hardware Architecture Breakdown Card */}
      <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm border border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-orange-100 text-orange-800 text-[11px] font-mono font-bold">
                HARDWARE BREAKDOWN
              </span>
              <h2 className="text-lg font-bold text-slate-900">Passive Dosimeter Wristband Architecture</h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              No batteries, no microcontrollers, no electronic sensors inside the wristband.
            </p>
          </div>
          <button
            onClick={() => onNavigate('how-it-works')}
            className="self-start sm:self-auto px-3 py-1.5 rounded-lg bg-orange-50 text-orange-700 border border-orange-200 text-xs font-semibold hover:bg-orange-100 transition-colors flex items-center gap-1 cursor-pointer"
          >
            <span>Full 10-Stage Pipeline</span>
            <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Schematic Diagram Preview */}
          <div
            className="md:col-span-7 rounded-xl overflow-hidden border border-slate-200 bg-slate-50 relative group cursor-pointer shadow-xs"
            onClick={() => onNavigate('how-it-works')}
          >
            <img
              src="/SulfiTrack_Wristband_Hardware_Breakdown.jpg"
              alt="SulfiTrack Passive H2S Dosimeter Wristband Hardware Breakdown schematic diagram"
              className="w-full h-auto object-contain group-hover:scale-[1.02] transition-transform duration-300"
            />
            <div className="absolute bottom-2 right-2 bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded text-[11px] text-white font-mono flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px] text-emerald-400">zoom_in</span>
              <span>Tap to View High-Res Specifications</span>
            </div>
          </div>

          {/* Component Breakdown List */}
          <div className="md:col-span-5 flex flex-col gap-3">
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-5 h-5 rounded-full bg-orange-600 text-white font-mono text-[10px] font-bold flex items-center justify-center">1</span>
                <h3 className="text-xs font-bold text-slate-900">Passive H₂S Chemical Strip</h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Colorimetric reagent membrane darkens proportionally with airborne hydrogen sulfide exposure (lead/bismuth salt reaction).
              </p>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-5 h-5 rounded-full bg-slate-800 text-white font-mono text-[10px] font-bold flex items-center justify-center">2</span>
                <h3 className="text-xs font-bold text-slate-900">Standardized Reference Color Scale</h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Factory-printed calibration swatches normalize fluctuating refinery lighting, sodium-vapor casts, and camera sensor differences.
              </p>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-5 h-5 rounded-full bg-slate-800 text-white font-mono text-[10px] font-bold flex items-center justify-center">3</span>
                <h3 className="text-xs font-bold text-slate-900">Validity & Shelf-Life Indicator</h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Separate optical dot verifies badge viability before shift start, preventing uncalibrated or expired sensors from being deployed.
              </p>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-5 h-5 rounded-full bg-slate-800 text-white font-mono text-[10px] font-bold flex items-center justify-center">4</span>
                <h3 className="text-xs font-bold text-slate-900">Unique QR / RFID Badge ID</h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Instantly binds every scan to worker identity, gate pass number, and specific refinery processing sector for statutory audit logging.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Core Operational Modules */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between px-1">
          <div>
            <h3 className="text-base font-bold text-slate-900">Enterprise Refinery Safety Workflow</h3>
            <p className="text-xs text-slate-500">Wear → Expose → Scan → Analyse → Estimate → Record</p>
          </div>
          <button
            onClick={() => onNavigate('how-it-works')}
            className="text-xs font-semibold text-orange-600 hover:text-orange-700 hover:underline"
          >
            Engineering Whitepaper →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div
            onClick={() => onNavigate('scan')}
            className="bg-white rounded-xl p-5 flex flex-col justify-between shadow-sm hover:border-slate-300 transition-all cursor-pointer border border-slate-200 group"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center border border-orange-100 group-hover:scale-105 transition-transform">
                <span className="material-symbols-outlined text-[20px]">qr_code_scanner</span>
              </div>
              <span className="text-[10px] font-mono text-slate-400 font-bold uppercase">MODULE 01</span>
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 mb-1">Field Camera Scanning</h4>
              <p className="text-xs text-slate-600 leading-relaxed mb-3">
                Safety marshals or workers scan dosimeter wristbands post-shift with real-time alignment and glare validation.
              </p>
            </div>
            <span className="text-xs font-bold text-orange-600 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
              Launch Scanner <span>→</span>
            </span>
          </div>

          <div
            onClick={() => onNavigate('dashboard')}
            className="bg-white rounded-xl p-5 flex flex-col justify-between shadow-sm hover:border-slate-300 transition-all cursor-pointer border border-slate-200 group"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center border border-orange-100 group-hover:scale-105 transition-transform">
                <span className="material-symbols-outlined text-[20px]">analytics</span>
              </div>
              <span className="text-[10px] font-mono text-slate-400 font-bold uppercase">MODULE 02</span>
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 mb-1">Live Shift Exposure Feed</h4>
              <p className="text-xs text-slate-600 leading-relaxed mb-3">
                Tracks cumulative exposure values (ppm·h) across SRU-3, HCU-2, and Coker units with instant TWA limit warnings.
              </p>
            </div>
            <span className="text-xs font-bold text-orange-600 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
              Open Dashboard <span>→</span>
            </span>
          </div>

          <div
            onClick={() => onNavigate('report')}
            className="bg-white rounded-xl p-5 flex flex-col justify-between shadow-sm hover:border-slate-300 transition-all cursor-pointer border border-slate-200 group"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center border border-orange-100 group-hover:scale-105 transition-transform">
                <span className="material-symbols-outlined text-[20px]">assignment_turned_in</span>
              </div>
              <span className="text-[10px] font-mono text-slate-400 font-bold uppercase">MODULE 03</span>
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 mb-1">OISD & DGMS Compliance</h4>
              <p className="text-xs text-slate-600 leading-relaxed mb-3">
                Generate signed PDF compliance dossiers and raw CSV telemetry for plant hygiene officers and factory inspectors.
              </p>
            </div>
            <span className="text-xs font-bold text-orange-600 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
              Generate Report <span>→</span>
            </span>
          </div>
        </div>
      </div>

      {/* Refinery Facility Context Card */}
      <div className="mt-6 bg-white rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-slate-700 border border-slate-200 shadow-sm">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center shrink-0 border border-orange-100">
            <span className="material-symbols-outlined text-[20px]">factory</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-slate-900">
              {REFINERY_FACILITY.name} · {REFINERY_FACILITY.division}
            </span>
            <span className="text-xs text-slate-500 mt-0.5">
              Statutory License: {REFINERY_FACILITY.licenseNo} • Standard: {REFINERY_FACILITY.complianceStandard}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('dashboard')}
            className="font-mono text-xs uppercase bg-slate-900 hover:bg-slate-800 text-white font-semibold px-4 py-2 rounded-lg transition-colors cursor-pointer"
          >
            Refinery Telemetry
          </button>
        </div>
      </div>
    </div>
  );
};
