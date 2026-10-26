import React, { useState } from 'react';
import { ScreenId, WorkerTelemetry } from '../types';
import { REFINERY_FACILITY, CURRENT_SAFETY_OFFICER, WORKER_TELEMETRY_LIST } from '../data/mockData';

interface ReportScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onBack: () => void;
  workerId?: string;
  workers?: WorkerTelemetry[];
}

export const ReportScreen: React.FC<ReportScreenProps> = ({
  onNavigate,
  onBack,
  workerId = 'WRK-1048',
  workers = WORKER_TELEMETRY_LIST
}) => {
  const [downloadNotice, setDownloadNotice] = useState<string | null>(null);

  const worker =
    workers.find((w) => w.workerId === workerId) ||
    workers[0];

  const handleDownloadPDF = () => {
    setDownloadNotice('Preparing official OISD-114 / DGMS compliance dossier for printing...');
    setTimeout(() => {
      window.print();
      setDownloadNotice(null);
    }, 800);
  };

  const handleExportCSV = () => {
    const headers = ['Report ID', 'Worker Name', 'Worker ID', 'Gate Pass', 'Department', 'Facility', 'Shift Exposure (PPM·h)', '7-Day Dose', 'Compliance Status', 'Inspecting Officer', 'Statutory Standard'];
    const row = [
      'MRPL-OISD-2026-8924',
      `"${worker.workerName}"`,
      worker.workerId,
      worker.gatePassNo,
      `"${worker.department}"`,
      `"${REFINERY_FACILITY.name}"`,
      worker.estimatedDose,
      `${worker.weeklyDose || 26.3} PPM·h`,
      worker.status,
      `"${CURRENT_SAFETY_OFFICER.name}"`,
      `"${REFINERY_FACILITY.complianceStandard}"`
    ];

    const csvContent = [headers.join(','), row.join(',')].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `MRPL_Exposure_Dossier_${worker.workerId}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadNotice(`Telemetry CSV dossier for ${worker.workerName} (${worker.workerId}) downloaded successfully.`);
    setTimeout(() => setDownloadNotice(null), 3500);
  };

  return (
    <div className="flex flex-col w-full gap-4 pb-16 animate-fadeIn">
      {/* Worker Telemetry Profile Banner */}
      <div className="bg-slate-900 text-slate-300 p-6 rounded-2xl flex flex-col gap-4 relative overflow-hidden shadow-sm border border-slate-800">
        <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-orange-600/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span
              className="material-symbols-outlined text-orange-400"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              verified
            </span>
            <span className="font-mono text-xs text-orange-400 font-bold uppercase tracking-wider">
              OISD-114 STATUTORY DOSIMETRY DOSSIER
            </span>
          </div>
          <span className="px-3 py-1 rounded-full bg-emerald-950 text-emerald-400 font-mono text-xs font-bold border border-emerald-800">
            GOVT. OF INDIA COMPLIANT
          </span>
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <h2 className="text-white font-sans text-xl font-bold">
              {worker.workerName}
            </h2>
            <span className="text-xs font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
              ID: {worker.workerId}
            </span>
          </div>
          <p className="text-xs text-slate-400">
            {worker.role} • {worker.department} • {REFINERY_FACILITY.name}, Mangaluru
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 border-t border-slate-800 text-xs">
          <div className="flex flex-col">
            <span className="font-mono text-[10px] text-slate-500 uppercase">GATE PASS NO.</span>
            <span className="text-white font-mono font-semibold">{worker.gatePassNo}</span>
          </div>
          <div className="flex flex-col">
            <span className="font-mono text-[10px] text-slate-500 uppercase">BADGE ID</span>
            <span className="text-white font-mono font-semibold">{worker.badgeId}</span>
          </div>
          <div className="flex flex-col">
            <span className="font-mono text-[10px] text-slate-500 uppercase">MEDICAL FITNESS</span>
            <span className="text-emerald-400 font-semibold">{worker.medicalFitness}</span>
          </div>
          <div className="flex flex-col">
            <span className="font-mono text-[10px] text-slate-500 uppercase">INSPECTING OFFICER</span>
            <span className="text-white font-medium">{CURRENT_SAFETY_OFFICER.name}</span>
          </div>
        </div>
      </div>

      {/* 3 KPI Cards */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white p-4 rounded-xl flex flex-col justify-between shadow-sm border border-slate-200">
          <div className="flex items-center justify-between text-slate-500">
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider">SHIFT EXPOSURE</span>
            <span className="material-symbols-outlined text-orange-600 text-[18px]">monitoring</span>
          </div>
          <div className="mt-2">
            <span className="font-mono text-2xl font-bold text-slate-900">{worker.shiftAvgDose || 10.2}</span>
            <span className="font-mono text-slate-500 ml-1 text-xs font-semibold">PPM·h</span>
          </div>
          <span className="text-[10px] text-amber-700 mt-1 font-bold">Limit: 10.0 PPM·h</span>
        </div>

        <div className="bg-white p-4 rounded-xl flex flex-col justify-between shadow-sm border border-slate-200">
          <div className="flex items-center justify-between text-slate-500">
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider">7-DAY DOSE</span>
            <span className="material-symbols-outlined text-emerald-600 text-[18px]">calendar_view_week</span>
          </div>
          <div className="mt-2">
            <span className="font-mono text-2xl font-bold text-slate-900">{worker.weeklyDose || 26.3}</span>
            <span className="font-mono text-slate-500 ml-1 text-xs font-semibold">PPM·h</span>
          </div>
          <span className="text-[10px] text-emerald-700 mt-1 font-bold">Limit: 50.0 PPM·h</span>
        </div>

        <div className="bg-white p-4 rounded-xl flex flex-col justify-between shadow-sm border border-slate-200">
          <div className="flex items-center justify-between text-slate-500">
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider">COMPLIANCE</span>
            <span className="material-symbols-outlined text-emerald-600 text-[18px]">task_alt</span>
          </div>
          <div className="mt-2">
            <span className="font-mono text-2xl font-bold text-slate-900">{worker.complianceRate || '100%'}</span>
            <span className="font-mono text-slate-500 ml-1 text-xs font-semibold">RATE</span>
          </div>
          <span className="text-[10px] text-slate-500 mt-1 font-medium">Periodic PME Verified</span>
        </div>
      </div>

      {/* Exposure Trend Analysis Histogram */}
      <div className="bg-white p-5 rounded-2xl flex flex-col gap-3 shadow-sm border border-slate-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-orange-600">show_chart</span>
            <span className="text-sm font-bold text-slate-900">
              Shift-wise Cumulative H₂S Dosage Histogram
            </span>
          </div>
          <span className="font-mono text-xs text-slate-500">OISD-114 Regulatory Audit</span>
        </div>

        <div className="h-44 w-full bg-slate-50 rounded-xl p-3 flex flex-col justify-between relative overflow-hidden border border-slate-200">
          <div className="flex justify-between items-center text-[10px] font-mono text-slate-500">
            <span>10.0 PPM·h (Permissible Shift Exposure Ceiling)</span>
            <span className="text-red-700 font-bold">--- Statutory Ceiling</span>
          </div>

          <div className="w-full h-24 flex items-end gap-1.5 px-1 relative z-10">
            <div className="flex-1 bg-orange-300 hover:bg-orange-500 h-[35%] rounded-t transition-all duration-300"></div>
            <div className="flex-1 bg-orange-300 hover:bg-orange-500 h-[25%] rounded-t transition-all duration-300"></div>
            <div className="flex-1 bg-orange-300 hover:bg-orange-500 h-[45%] rounded-t transition-all duration-300"></div>
            <div className="flex-1 bg-orange-300 hover:bg-orange-500 h-[60%] rounded-t transition-all duration-300"></div>
            <div className="flex-1 bg-amber-500 hover:bg-amber-600 h-[85%] rounded-t transition-all duration-300"></div>
            <div className="flex-1 bg-orange-300 hover:bg-orange-500 h-[50%] rounded-t transition-all duration-300"></div>
            <div className="flex-1 bg-orange-300 hover:bg-orange-500 h-[30%] rounded-t transition-all duration-300"></div>
            <div className="flex-1 bg-orange-300 hover:bg-orange-500 h-[40%] rounded-t transition-all duration-300"></div>
            <div className="flex-1 bg-orange-300 hover:bg-orange-500 h-[55%] rounded-t transition-all duration-300"></div>
            <div className="flex-1 bg-amber-500 hover:bg-amber-600 h-[75%] rounded-t transition-all duration-300"></div>
            <div className="flex-1 bg-orange-300 hover:bg-orange-500 h-[35%] rounded-t transition-all duration-300"></div>
            <div className="flex-1 bg-orange-300 hover:bg-orange-500 h-[20%] rounded-t transition-all duration-300"></div>
          </div>

          <div className="flex justify-between text-[10px] text-slate-500 font-mono border-t border-slate-200 pt-1">
            <span>Shift 1-3</span>
            <span>Shift 4-6</span>
            <span>Shift 7-9</span>
            <span>Shift 10-12</span>
          </div>
        </div>
      </div>

      {/* Statutory Audit & Signoff Box */}
      <div className="bg-white p-5 rounded-2xl flex flex-col gap-3 shadow-sm border border-slate-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-orange-600">verified_user</span>
            <span className="text-sm font-bold text-slate-900">
              Statutory EHS Signoff & Directorate Accreditation
            </span>
          </div>
          <span className="text-[10px] font-mono text-slate-400">
            Hash: SHA256:7e91...4a2b
          </span>
        </div>

        <div className="text-xs text-slate-700 bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
          <div className="flex items-start gap-2">
            <span
              className="material-symbols-outlined text-emerald-600 text-[18px] shrink-0"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              check_circle
            </span>
            <span>
              Certified that wearable dosimeter badge <strong>#{worker.badgeId}</strong> was scanned and calibrated in compliance with OISD-114 (Fire and Safety in Oil Refineries) and DGMS directives.
            </span>
          </div>
          <div className="pt-2 border-t border-slate-200 flex flex-wrap items-center justify-between text-[11px] text-slate-500">
            <span>Inspected By: <strong>{CURRENT_SAFETY_OFFICER.name}</strong>, Chief Safety Officer</span>
            <span>Refinery Facility: <strong>{REFINERY_FACILITY.name}</strong></span>
          </div>
        </div>
      </div>

      {/* Notice Banner */}
      {downloadNotice && (
        <div className="p-3.5 bg-emerald-50 text-emerald-900 rounded-xl flex items-center gap-2 border border-emerald-200 animate-fadeIn text-xs font-medium">
          <span className="material-symbols-outlined text-emerald-600 text-[18px]">task_alt</span>
          <span>{downloadNotice}</span>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3 pt-1">
        <button
          id="download-report-btn"
          className="flex-1 bg-orange-600 hover:bg-orange-700 text-white py-3.5 px-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-sm shadow-orange-950/20 cursor-pointer"
          onClick={handleDownloadPDF}
        >
          <span className="material-symbols-outlined text-[18px]">print</span>
          <span>Print / Export Certified Dossier</span>
        </button>

        <button
          id="export-csv-btn"
          className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-800 py-3.5 px-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer border border-slate-200"
          onClick={handleExportCSV}
        >
          <span className="material-symbols-outlined text-[18px]">table_view</span>
          <span>Download Telemetry CSV</span>
        </button>
      </div>
    </div>
  );
};
