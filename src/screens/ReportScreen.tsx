import React, { useState } from 'react';
import { ScreenId } from '../types';

interface ReportScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onBack: () => void;
}

export const ReportScreen: React.FC<ReportScreenProps> = ({ onNavigate, onBack }) => {
  const [downloadNotice, setDownloadNotice] = useState<string | null>(null);

  const handleAction = (type: 'pdf' | 'csv') => {
    const msg =
      type === 'pdf'
        ? 'Compiling and downloading complete PDF compliance dossier...'
        : 'Exporting raw telemetry shift data to CSV...';
    setDownloadNotice(msg);
    setTimeout(() => setDownloadNotice(null), 3000);
  };

  return (
    <div className="flex flex-col w-full gap-4 pb-16 animate-fadeIn">
      {/* Worker Telemetry Profile Banner */}
      <div className="bg-slate-900 text-slate-300 p-5 rounded-xl flex flex-col gap-3 relative overflow-hidden shadow-sm border border-slate-800">
        <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-orange-600/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className="material-symbols-outlined text-orange-400"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              badge
            </span>
            <span className="font-mono text-xs text-orange-400 font-bold uppercase tracking-wider">
              WORKER TELEMETRY PROFILE
            </span>
          </div>
          <span className="px-2.5 py-1 rounded bg-emerald-50 text-emerald-700 font-mono text-xs font-bold border border-emerald-200">
            SECURE RECORD
          </span>
        </div>

        <div className="flex flex-col gap-1">
          <h2 className="text-white font-mono text-xl font-bold">Worker ID: #WRK-8924-MX</h2>
          <p className="text-xs text-slate-400">
            Sector 7 Petrochemical Refinery • Atmospheric Hazard Monitoring Unit
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-800">
          <div className="flex flex-col">
            <span className="font-mono text-[11px] text-slate-400 font-medium">DATE RANGE</span>
            <span className="text-white font-mono text-xs font-semibold">Oct 01 - Oct 28, 2023</span>
          </div>
          <div className="flex flex-col">
            <span className="font-mono text-[11px] text-slate-400 font-medium">SHIFTS LOGGED</span>
            <span className="text-white font-mono text-xs font-semibold">22 Active Shifts</span>
          </div>
        </div>
      </div>

      {/* 3 KPI Cards */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white p-3.5 rounded-xl flex flex-col justify-between shadow-sm border border-slate-200">
          <div className="flex items-center justify-between text-slate-500">
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider">AVG EXPOSURE</span>
            <span className="material-symbols-outlined text-orange-600 text-[18px]">monitoring</span>
          </div>
          <div className="mt-2">
            <span className="font-mono text-2xl font-bold text-slate-900">4.2</span>
            <span className="font-mono text-slate-500 ml-1 text-xs font-semibold">PPM</span>
          </div>
          <span className="text-[10px] text-emerald-700 mt-1 font-bold">▼ 12% vs last cycle</span>
        </div>

        <div className="bg-white p-3.5 rounded-xl flex flex-col justify-between shadow-sm border border-slate-200">
          <div className="flex items-center justify-between text-slate-500">
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider">MAX PEAK</span>
            <span className="material-symbols-outlined text-red-600 text-[18px]">warning</span>
          </div>
          <div className="mt-2">
            <span className="font-mono text-2xl font-bold text-slate-900">18.5</span>
            <span className="font-mono text-slate-500 ml-1 text-xs font-semibold">PPM</span>
          </div>
          <span className="text-[10px] text-red-700 mt-1 font-bold">Threshold: 25 PPM</span>
        </div>

        <div className="bg-white p-3.5 rounded-xl flex flex-col justify-between shadow-sm border border-slate-200">
          <div className="flex items-center justify-between text-slate-500">
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider">ELEVATED</span>
            <span className="material-symbols-outlined text-amber-500 text-[18px]">error</span>
          </div>
          <div className="mt-2">
            <span className="font-mono text-2xl font-bold text-slate-900">03</span>
            <span className="font-mono text-slate-500 ml-1 text-xs font-semibold">Events</span>
          </div>
          <span className="text-[10px] text-slate-500 mt-1 font-medium">Logged & Reviewed</span>
        </div>
      </div>

      {/* Exposure Trend Analysis Histogram */}
      <div className="bg-white p-5 rounded-xl flex flex-col gap-3 shadow-sm border border-slate-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-orange-600">show_chart</span>
            <span className="text-sm font-bold text-slate-900">
              Exposure Trend Analysis
            </span>
          </div>
          <span className="font-mono text-xs text-slate-500">H₂S & CO Telemetry</span>
        </div>

        <div className="h-44 w-full bg-slate-50 rounded-lg p-3 flex flex-col justify-between relative overflow-hidden border border-slate-200">
          <div className="flex justify-between items-center text-[10px] font-mono text-slate-500">
            <span>25 PPM (OSHA Ceiling)</span>
            <span className="text-red-700 font-bold">--- Limit</span>
          </div>

          <div className="w-full h-24 flex items-end gap-1.5 px-1 relative z-10">
            <div className="flex-1 bg-orange-300 hover:bg-orange-500 h-[35%] rounded-t transition-all duration-300"></div>
            <div className="flex-1 bg-orange-300 hover:bg-orange-500 h-[25%] rounded-t transition-all duration-300"></div>
            <div className="flex-1 bg-orange-300 hover:bg-orange-500 h-[45%] rounded-t transition-all duration-300"></div>
            <div className="flex-1 bg-orange-300 hover:bg-orange-500 h-[60%] rounded-t transition-all duration-300"></div>
            <div className="flex-1 bg-red-500 hover:bg-red-600 h-[85%] rounded-t transition-all duration-300"></div>
            <div className="flex-1 bg-orange-300 hover:bg-orange-500 h-[50%] rounded-t transition-all duration-300"></div>
            <div className="flex-1 bg-orange-300 hover:bg-orange-500 h-[30%] rounded-t transition-all duration-300"></div>
            <div className="flex-1 bg-orange-300 hover:bg-orange-500 h-[40%] rounded-t transition-all duration-300"></div>
            <div className="flex-1 bg-orange-300 hover:bg-orange-500 h-[55%] rounded-t transition-all duration-300"></div>
            <div className="flex-1 bg-red-500 hover:bg-red-600 h-[75%] rounded-t transition-all duration-300"></div>
            <div className="flex-1 bg-orange-300 hover:bg-orange-500 h-[35%] rounded-t transition-all duration-300"></div>
            <div className="flex-1 bg-orange-300 hover:bg-orange-500 h-[20%] rounded-t transition-all duration-300"></div>
          </div>

          <div className="flex justify-between text-[10px] text-slate-500 font-mono border-t border-slate-200 pt-1">
            <span>Week 1</span>
            <span>Week 2</span>
            <span>Week 3</span>
            <span>Week 4</span>
          </div>
        </div>
      </div>

      {/* Compliance & Audit Signoff */}
      <div className="bg-white p-5 rounded-xl flex flex-col gap-3 shadow-sm border border-slate-200">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-orange-600">verified_user</span>
          <span className="text-sm font-bold text-slate-900">
            Compliance & Audit Signoff
          </span>
        </div>

        <div className="flex items-center justify-between text-xs text-slate-700 bg-slate-50 p-3.5 rounded-lg border border-slate-200">
          <div className="flex items-center gap-2">
            <span
              className="material-symbols-outlined text-emerald-600 text-[18px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              check_circle
            </span>
            <span>All personal protective equipment verified compliant with ISO-45001 standards.</span>
          </div>
        </div>
      </div>

      {/* Notice Banner */}
      {downloadNotice && (
        <div className="p-3 bg-orange-50 text-orange-900 rounded-lg flex items-center gap-2 border border-orange-200 animate-fadeIn text-xs font-medium">
          <span className="material-symbols-outlined text-orange-600 text-[18px]">task_alt</span>
          <span>{downloadNotice}</span>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3 pt-2">
        <button
          id="download-report-btn"
          className="flex-1 bg-orange-600 hover:bg-orange-700 text-white py-3 px-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-sm shadow-orange-950/20 cursor-pointer"
          onClick={() => handleAction('pdf')}
        >
          <span className="material-symbols-outlined text-[18px]">download</span>
          <span>Download Report</span>
        </button>

        <button
          id="export-csv-btn"
          className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-800 py-3 px-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer border border-slate-200"
          onClick={() => handleAction('csv')}
        >
          <span className="material-symbols-outlined text-[18px]">table_view</span>
          <span>Export CSV</span>
        </button>
      </div>
    </div>
  );
};
