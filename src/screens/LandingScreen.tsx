import React from 'react';
import { ScreenId } from '../types';

interface LandingScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export const LandingScreen: React.FC<LandingScreenProps> = ({ onNavigate }) => {
  return (
    <div className="flex flex-col w-full pb-8 animate-fadeIn">
      {/* Hero Banner Card */}
      <div className="relative bg-slate-900 text-slate-300 rounded-xl p-6 mb-6 overflow-hidden shadow-sm border border-slate-800">
        <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-orange-600/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700 font-mono text-xs uppercase tracking-wider">
              SIH26118 · MRPL Project
            </span>
            <div className="flex items-center gap-1.5 text-emerald-400 font-mono text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>SYSTEM ACTIVE</span>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <span className="font-mono text-slate-400 uppercase tracking-widest text-xs font-semibold">
              Exposure Intelligence
            </span>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-orange-600 rounded-sm flex items-center justify-center font-bold text-lg text-white">
                S
              </div>
              <h1 className="text-3xl font-bold text-white tracking-tight uppercase">SULFITRACK</h1>
            </div>
            <p className="text-lg text-orange-400 font-medium">Passive H₂S Exposure Dosimetry</p>
          </div>

          <p className="text-slate-300 text-sm max-w-lg leading-relaxed">
            Don't Just Detect the Gas. Measure the Exposure. Complete cryptographic tracking and
            molecular colorimetric assessment for hazardous industrial refinery sites.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <a
              id="landing-scan-btn"
              className="flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-semibold px-6 py-3 rounded-lg shadow-sm shadow-orange-950/30 transition-all cursor-pointer active:scale-[0.98]"
              data-path="scan"
              href="#scan"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('scan');
              }}
            >
              <span className="material-symbols-outlined text-[20px]">qr_code_scanner</span>
              <span>Scan Dosimeter</span>
            </a>
            <a
              id="landing-dashboard-btn"
              className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold px-6 py-3 rounded-lg border border-slate-700 transition-all cursor-pointer active:scale-[0.98]"
              data-path="dashboard"
              href="#dashboard"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('dashboard');
              }}
            >
              <span className="material-symbols-outlined text-[20px]">dashboard</span>
              <span>View Dashboard</span>
            </a>
          </div>
        </div>
      </div>

      {/* Dosimeter Anatomy Card */}
      <div className="bg-white rounded-xl p-6 mb-6 shadow-sm border border-slate-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex flex-col">
            <h2 className="text-lg font-bold text-slate-900">Dosimeter Anatomy</h2>
            <span className="text-xs text-slate-500">Model ST-X7 Molecular Badge</span>
          </div>
          <button
            onClick={() => onNavigate('how-it-works')}
            className="px-3 py-1.5 rounded-lg bg-orange-50 text-orange-700 border border-orange-200 text-xs font-semibold hover:bg-orange-100 transition-colors flex items-center gap-1 cursor-pointer"
            title="Inspect full technical architecture"
          >
            <span>Live Feed</span>
            <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
          </button>
        </div>

        <div
          className="relative bg-slate-50 rounded-xl p-4 flex flex-col items-center justify-center gap-4 border border-slate-200 cursor-pointer group"
          onClick={() => onNavigate('how-it-works')}
          title="Click to view full technical explanation"
        >
          <div className="w-full h-48 rounded-lg overflow-hidden relative shadow-sm border border-slate-200">
            <img
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              alt="Wearable industrial safety wristband badge Model ST-X7 with active chemical reaction strip"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDjm8_A7owfcpRGdT5WmE4R7igc0nYhNuP4_a5YhymU5GmgY14AJgBzUgvS9PV1y_C9lA6dHdFWOmbeyL29fzfKdzIXyPqjHiCIkoqFNafwk4EdUd2ggOA1TN10ddmNbTfoGn7hIdqbB5xn89haYiLBtGmP07hwQTAJea8j_Uf_yfClaJpLK3MHKNbaK37Bp5-TmMwsyQejURwfE5jckCHutXVomFId8GL6hgmIXZPokpgiBFUg3byiHQ"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-2 right-2 bg-slate-900/85 backdrop-blur-md px-2.5 py-1 rounded text-white font-mono text-[11px] flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px] text-emerald-400">verified</span>
              <span>VALID ID #8849</span>
            </div>
            <div className="absolute bottom-2 left-2 bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded text-[11px] text-white font-mono flex items-center gap-1">
              <span>View Technical Pipeline →</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 w-full">
            <div className="bg-white p-3 rounded-lg text-center border border-slate-200 shadow-xs">
              <span className="block text-xs text-slate-400 uppercase font-bold tracking-wider mb-0.5">Response Strip</span>
              <span className="text-sm text-slate-900 font-bold">Active H₂S</span>
            </div>
            <div className="bg-white p-3 rounded-lg text-center border border-slate-200 shadow-xs">
              <span className="block text-xs text-slate-400 uppercase font-bold tracking-wider mb-0.5">Colorimetric</span>
              <span className="text-sm text-slate-900 font-bold">Scale Ready</span>
            </div>
            <div className="bg-white p-3 rounded-lg text-center border border-slate-200 shadow-xs">
              <span className="block text-xs text-slate-400 uppercase font-bold tracking-wider mb-0.5">Validity</span>
              <span className="text-sm text-emerald-600 font-bold">99.4%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Core Intelligence Features */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-base font-bold text-slate-900">Core Intelligence Features</h3>
          <button
            onClick={() => onNavigate('how-it-works')}
            className="text-xs font-semibold text-orange-600 hover:text-orange-700 hover:underline"
          >
            How SulfiTrack Works →
          </button>
        </div>

        <div className="grid grid-cols-1 gap-3">
          <div
            onClick={() => onNavigate('how-it-works')}
            className="bg-white rounded-xl p-5 flex items-start gap-4 shadow-sm hover:border-slate-300 transition-all cursor-pointer border border-slate-200"
          >
            <div className="w-11 h-11 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center shrink-0 border border-orange-100">
              <span className="material-symbols-outlined text-[22px]">bolt</span>
            </div>
            <div className="flex flex-col">
              <h4 className="text-sm font-bold text-slate-900 mb-1">Passive & Battery-Free</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Operates indefinitely without internal power sources using advanced chemical
                diffusion and stable colorimetric reagents.
              </p>
            </div>
          </div>

          <div
            onClick={() => onNavigate('scan')}
            className="bg-white rounded-xl p-5 flex items-start gap-4 shadow-sm hover:border-slate-300 transition-all cursor-pointer border border-slate-200"
          >
            <div className="w-11 h-11 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center shrink-0 border border-orange-100">
              <span className="material-symbols-outlined text-[22px]">neurology</span>
            </div>
            <div className="flex flex-col">
              <h4 className="text-sm font-bold text-slate-900 mb-1">AI-Assisted Quantitative Reading</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Machine vision instantly calibrates lighting conditions and translates badge color
                shifts into precise PPM exposure graphs.
              </p>
            </div>
          </div>

          <div
            onClick={() => onNavigate('workers')}
            className="bg-white rounded-xl p-5 flex items-start gap-4 shadow-sm hover:border-slate-300 transition-all cursor-pointer border border-slate-200"
          >
            <div className="w-11 h-11 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center shrink-0 border border-orange-100">
              <span className="material-symbols-outlined text-[22px]">badge</span>
            </div>
            <div className="flex flex-col">
              <h4 className="text-sm font-bold text-slate-900 mb-1">Worker-Wise Exposure Records</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Immutable audit trails link every scan directly to personnel profiles for total
                compliance and safety transparency.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Refinery Sector Simulation Info Banner */}
      <div className="mt-6 bg-white rounded-xl p-4 flex items-center justify-between text-slate-600 border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-orange-600">info</span>
          <span className="text-xs font-medium text-slate-700">
            MRPL refinery sector simulation active. All telemetry points synchronized.
          </span>
        </div>
        <button
          onClick={() => onNavigate('how-it-works')}
          className="font-mono text-xs uppercase bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold px-3 py-1.5 rounded-lg border border-slate-200 transition-colors cursor-pointer"
        >
          Tech Details
        </button>
      </div>
    </div>
  );
};
