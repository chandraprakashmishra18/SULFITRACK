import React, { useState } from 'react';
import { ScreenId, WorkerTelemetry } from '../types';
import { WORKER_TELEMETRY_LIST, REFINERY_FACILITY } from '../data/mockData';

interface WorkerProfileScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onBack: () => void;
  workerId?: string;
  onSelectWorker?: (workerId: string) => void;
  workers?: WorkerTelemetry[];
}

export const WorkerProfileScreen: React.FC<WorkerProfileScreenProps> = ({
  onNavigate,
  onBack,
  workerId = 'WRK-1048',
  onSelectWorker,
  workers = WORKER_TELEMETRY_LIST
}) => {
  const [activeWorkerId, setActiveWorkerId] = useState<string>(workerId);

  const currentWorker =
    workers.find((w) => w.workerId === activeWorkerId) ||
    workers[0];

  const handleWorkerChange = (newId: string) => {
    setActiveWorkerId(newId);
    if (onSelectWorker) {
      onSelectWorker(newId);
    }
  };

  const trendData = [
    { day: 'Mon', val: 2.1, height: '25%' },
    { day: 'Tue', val: 4.5, height: '45%' },
    { day: 'Wed', val: 3.2, height: '32%' },
    { day: 'Thu', val: 6.8, height: '68%' },
    { day: 'Fri', val: 5.0, height: '50%' },
    { day: 'Sat', val: 1.2, height: '12%', dim: true },
    { day: 'Sun', val: 3.5, height: '35%' }
  ];

  const getInitials = (name: string) => {
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <div className="flex flex-col w-full gap-4 pb-16 animate-fadeIn">
      {/* Worker Selector Bar for Field Safety Inspection */}
      <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs text-slate-700">
          <span className="material-symbols-outlined text-orange-600 text-[18px]">engineering</span>
          <span className="font-bold">Select Refinery Personnel:</span>
        </div>
        <select
          value={currentWorker.workerId}
          onChange={(e) => handleWorkerChange(e.target.value)}
          className="px-3 py-1.5 bg-slate-50 text-slate-900 text-xs font-semibold rounded-lg border border-slate-300 outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer"
        >
          {workers.map((w) => (
            <option key={w.workerId} value={w.workerId}>
              {w.workerName} ({w.workerId}) — {w.department}
            </option>
          ))}
        </select>
      </div>

      {/* Worker Header Card */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 text-white p-6 rounded-2xl shadow-sm border border-slate-800 relative overflow-hidden">
        <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-orange-600/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="flex items-center gap-4 z-10">
          <div className="w-14 h-14 rounded-2xl bg-orange-600 text-white flex items-center justify-center font-bold text-xl shadow-md shadow-orange-950/40 border border-orange-500/30">
            {getInitials(currentWorker.workerName)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-white">{currentWorker.workerName}</h2>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                {currentWorker.workerId}
              </span>
            </div>
            <div className="text-orange-400 text-xs font-medium mt-0.5">
              {currentWorker.role} · {currentWorker.department}
            </div>
            <div className="flex flex-wrap items-center gap-2 text-slate-400 font-mono text-[11px] mt-1.5">
              <span>Pass: {currentWorker.gatePassNo}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[13px] text-orange-400">badge</span>
                {currentWorker.badgeId}
              </span>
              <span>•</span>
              <span>Blood: {currentWorker.bloodGroup}</span>
            </div>
          </div>
        </div>

        <div className="flex sm:flex-col items-center sm:items-end justify-between z-10 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800">
          <span
            className={`px-3 py-1 rounded-full font-mono text-xs font-bold border flex items-center gap-1.5 ${
              currentWorker.status === 'Normal'
                ? 'bg-emerald-950 text-emerald-400 border-emerald-800'
                : currentWorker.status === 'Elevated'
                ? 'bg-amber-950 text-amber-400 border-amber-800'
                : 'bg-slate-800 text-slate-400 border-slate-700'
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                currentWorker.status === 'Normal'
                  ? 'bg-emerald-400'
                  : currentWorker.status === 'Elevated'
                  ? 'bg-amber-400 animate-pulse'
                  : 'bg-slate-500'
              }`}
            ></span>
            {currentWorker.status.toUpperCase()} STATUS
          </span>
          <span className="text-slate-400 font-mono text-[11px] mt-1">
            {currentWorker.medicalFitness}
          </span>
        </div>
      </div>

      {/* 4 Stat Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {/* CURRENT SHIFT */}
        <div className="bg-white p-4 rounded-xl flex flex-col justify-between border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="font-mono text-xs font-bold uppercase tracking-wider">CURRENT SHIFT</span>
            <span className="material-symbols-outlined text-orange-600 text-[18px]">schedule</span>
          </div>
          <div>
            <span className="font-mono text-2xl font-bold text-slate-900">
              {currentWorker.shiftAvgDose || 0}
            </span>
            <span className="font-mono text-slate-500 text-xs ml-1 font-semibold">PPM·h</span>
          </div>
          <div className="text-[11px] text-slate-500 mt-2 flex items-center gap-1 font-medium">
            <span className="text-emerald-700 font-bold">Shift {currentWorker.shift}</span>
          </div>
        </div>

        {/* 7-DAY EXPOSURE */}
        <div className="bg-white p-4 rounded-xl flex flex-col justify-between border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="font-mono text-xs font-bold uppercase tracking-wider">7-DAY EXPOSURE</span>
            <span className="material-symbols-outlined text-orange-600 text-[18px]">date_range</span>
          </div>
          <div>
            <span className="font-mono text-2xl font-bold text-slate-900">
              {currentWorker.weeklyDose || 14.2}
            </span>
            <span className="font-mono text-slate-500 text-xs ml-1 font-semibold">PPM·h</span>
          </div>
          <div className="text-[11px] text-slate-500 mt-2 font-mono">
            OISD Target: &lt; 50.0 PPM·h
          </div>
        </div>

        {/* 30-DAY EXPOSURE */}
        <div className="bg-white p-4 rounded-xl flex flex-col justify-between border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="font-mono text-xs font-bold uppercase tracking-wider">30-DAY EXPOSURE</span>
            <span className="material-symbols-outlined text-orange-600 text-[18px]">calendar_month</span>
          </div>
          <div>
            <span className="font-mono text-2xl font-bold text-slate-900">
              {currentWorker.monthlyDose || 42.0}
            </span>
            <span className="font-mono text-slate-500 text-xs ml-1 font-semibold">PPM·h</span>
          </div>
          <div className="text-[11px] text-slate-500 mt-2 font-mono">
            Monthly Cap: 200.0 PPM·h
          </div>
        </div>

        {/* COMPLIANCE RATE */}
        <div className="bg-white p-4 rounded-xl flex flex-col justify-between border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="font-mono text-xs font-bold uppercase tracking-wider">COMPLIANCE</span>
            <span className="material-symbols-outlined text-emerald-600 text-[18px]">verified</span>
          </div>
          <div>
            <span className="font-mono text-2xl font-bold text-emerald-700">
              {currentWorker.complianceRate || '100%'}
            </span>
          </div>
          <div className="text-[11px] text-slate-500 mt-2 font-medium">
            Shift scan protocol verified
          </div>
        </div>
      </div>

      {/* Exposure Trend */}
      <div className="bg-white p-5 rounded-2xl flex flex-col gap-3 border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900">7-Day Accumulated Dose Progression</h3>
            <p className="text-xs text-slate-500">
              Daily cumulative H₂S exposure (PPM·h) measured at {currentWorker.department}
            </p>
          </div>
          <span className="font-mono text-xs text-slate-500">Threshold: 10.0 PPM·h</span>
        </div>

        <div className="h-44 w-full flex items-end gap-2 pt-8 px-3 bg-slate-50 rounded-xl relative border border-slate-200">
          <div className="absolute inset-x-0 top-7 border-b border-dashed border-slate-300 flex justify-between px-3 text-[10px] text-slate-500">
            <span className="font-mono font-bold">10.0 PPM·h</span>
            <span className="font-bold text-amber-700 font-mono">Permissible Shift Ceiling</span>
          </div>

          {trendData.map((t) => (
            <div key={t.day} className="flex-1 flex flex-col items-center gap-1 h-full justify-end group">
              <div className="text-[10px] text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity font-mono font-bold">
                {t.val}
              </div>
              <div
                className={`w-full rounded-t transition-all duration-300 hover:brightness-110 ${
                  t.dim ? 'bg-orange-300' : 'bg-orange-600'
                }`}
                style={{ height: t.height }}
              ></div>
              <span className="text-[10px] text-slate-600 font-mono font-semibold">{t.day}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Scans */}
      <div className="bg-white p-5 rounded-2xl flex flex-col gap-3 border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Verified Dosimeter Scans</h3>
            <p className="text-xs text-slate-500">Recent spectrophotometer readings stamped in registry</p>
          </div>
          <span className="font-mono text-xs text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-md font-semibold">
            {REFINERY_FACILITY.complianceStandard}
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <div
            className="bg-slate-50 p-3.5 rounded-xl flex items-center justify-between hover:bg-slate-100 transition-colors cursor-pointer border border-slate-200"
            onClick={() => onNavigate('report')}
            title="Click to view detailed exposure report"
          >
            <div className="flex flex-col">
              <span className="text-xs font-bold text-slate-900 font-mono">13 Oct 2026</span>
              <span className="text-xs text-slate-500">
                Shift B (Evening) • Badge {currentWorker.badgeId} • {currentWorker.department}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <span className="text-xs font-mono font-bold text-slate-900">
                  {currentWorker.estimatedDose}
                </span>
                <div className="text-[10px] text-amber-700 font-bold">
                  {currentWorker.status}
                </div>
              </div>
              <span className="material-symbols-outlined text-slate-400 text-[18px]">chevron_right</span>
            </div>
          </div>

          <div
            className="bg-slate-50 p-3.5 rounded-xl flex items-center justify-between hover:bg-slate-100 transition-colors cursor-pointer border border-slate-200"
            onClick={() => onNavigate('report')}
            title="Click to view detailed exposure report"
          >
            <div className="flex flex-col">
              <span className="text-xs font-bold text-slate-900 font-mono">12 Oct 2026</span>
              <span className="text-xs text-slate-500">
                Shift A (Morning) • Badge {currentWorker.badgeId} • {currentWorker.department}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <span className="text-xs font-mono font-bold text-slate-900">2.4 PPM·h</span>
                <div className="text-[10px] text-emerald-700 font-bold">Normal</div>
              </div>
              <span className="material-symbols-outlined text-slate-400 text-[18px]">chevron_right</span>
            </div>
          </div>

          <div
            className="bg-slate-50 p-3.5 rounded-xl flex items-center justify-between hover:bg-slate-100 transition-colors cursor-pointer border border-slate-200"
            onClick={() => onNavigate('report')}
            title="Click to view detailed exposure report"
          >
            <div className="flex flex-col">
              <span className="text-xs font-bold text-slate-900 font-mono">11 Oct 2026</span>
              <span className="text-xs text-slate-500">
                Shift B (Evening) • Badge {currentWorker.badgeId} • {currentWorker.department}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <span className="text-xs font-mono font-bold text-slate-900">3.8 PPM·h</span>
                <div className="text-[10px] text-emerald-700 font-bold">Normal</div>
              </div>
              <span className="material-symbols-outlined text-slate-400 text-[18px]">chevron_right</span>
            </div>
          </div>
        </div>

        <button
          onClick={() => onNavigate('report')}
          className="mt-2 w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer border border-slate-200"
        >
          <span className="material-symbols-outlined text-[18px]">description</span>
          <span>Generate Certified Compliance Dossier for {currentWorker.workerName}</span>
        </button>
      </div>
    </div>
  );
};
