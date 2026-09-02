import React from 'react';
import { ScreenId } from '../types';

interface WorkerProfileScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onBack: () => void;
}

export const WorkerProfileScreen: React.FC<WorkerProfileScreenProps> = ({ onNavigate, onBack }) => {
  const trendData = [
    { day: 'Mon', val: 2.1, height: '25%' },
    { day: 'Tue', val: 4.5, height: '45%' },
    { day: 'Wed', val: 3.2, height: '32%' },
    { day: 'Thu', val: 6.8, height: '68%' },
    { day: 'Fri', val: 5.0, height: '50%' },
    { day: 'Sat', val: 1.2, height: '12%', dim: true },
    { day: 'Sun', val: 3.5, height: '35%' }
  ];

  return (
    <div className="flex flex-col w-full gap-4 pb-16 animate-fadeIn">
      {/* Worker Header Card */}
      <div className="flex items-center justify-between bg-slate-900 text-white p-5 rounded-xl shadow-sm border border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold text-lg shadow-sm">
            RK
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Rajesh Kumar</h2>
            <div className="flex items-center gap-2 text-slate-400 font-mono text-xs mt-0.5">
              <span>WRK-1048</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  badge
                </span>
                ST-WB-00124
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end">
          <span className="px-2.5 py-1 rounded bg-emerald-50 text-emerald-700 font-mono text-xs font-bold border border-emerald-200 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
            VALID
          </span>
          <span className="text-slate-400 font-mono text-[11px] mt-1">Active Badge</span>
        </div>
      </div>

      {/* 4 Stat Metrics Grid */}
      <div className="grid grid-cols-2 gap-3">
        {/* CURRENT SHIFT */}
        <div className="bg-white p-4 rounded-xl flex flex-col justify-between border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="font-mono text-xs font-bold uppercase tracking-wider">CURRENT SHIFT</span>
            <span className="material-symbols-outlined text-orange-600 text-[18px]">schedule</span>
          </div>
          <div>
            <span className="font-mono text-2xl font-bold text-slate-900">10.2</span>
            <span className="font-mono text-slate-500 text-xs ml-1 font-semibold">ppm·h</span>
          </div>
          <div className="text-[11px] text-slate-500 mt-2 flex items-center gap-1 font-medium">
            <span className="text-emerald-700 font-bold">↓ 4%</span> vs shift average
          </div>
        </div>

        {/* 7-DAY EXPOSURE */}
        <div className="bg-white p-4 rounded-xl flex flex-col justify-between border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="font-mono text-xs font-bold uppercase tracking-wider">7-DAY EXPOSURE</span>
            <span className="material-symbols-outlined text-orange-600 text-[18px]">date_range</span>
          </div>
          <div>
            <span className="font-mono text-2xl font-bold text-slate-900">26.3</span>
            <span className="font-mono text-slate-500 text-xs ml-1 font-semibold">ppm·h</span>
          </div>
          <div className="text-[11px] text-slate-500 mt-2 font-mono">
            Limit: 50.0 ppm·h
          </div>
        </div>

        {/* 30-DAY EXPOSURE */}
        <div className="bg-white p-4 rounded-xl flex flex-col justify-between border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="font-mono text-xs font-bold uppercase tracking-wider">30-DAY EXPOSURE</span>
            <span className="material-symbols-outlined text-orange-600 text-[18px]">calendar_month</span>
          </div>
          <div>
            <span className="font-mono text-2xl font-bold text-slate-900">84.1</span>
            <span className="font-mono text-slate-500 text-xs ml-1 font-semibold">ppm·h</span>
          </div>
          <div className="text-[11px] text-slate-500 mt-2 font-mono">
            Limit: 200.0 ppm·h
          </div>
        </div>

        {/* TOTAL SCANS */}
        <div className="bg-white p-4 rounded-xl flex flex-col justify-between border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="font-mono text-xs font-bold uppercase tracking-wider">TOTAL SCANS</span>
            <span className="material-symbols-outlined text-orange-600 text-[18px]">qr_code_scanner</span>
          </div>
          <div>
            <span className="font-mono text-2xl font-bold text-slate-900">18</span>
            <span className="font-mono text-slate-500 text-xs ml-1 font-semibold">logs</span>
          </div>
          <div className="text-[11px] text-emerald-700 font-bold mt-2">
            100% compliance rate
          </div>
        </div>
      </div>

      {/* Exposure Trend */}
      <div className="bg-white p-5 rounded-xl flex flex-col gap-3 border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Exposure Trend</h3>
            <p className="text-xs text-slate-500">Daily accumulated ppm·h over past 7 days</p>
          </div>
          <span className="font-mono text-xs text-slate-500">X: Date | Y: ppm·h</span>
        </div>

        <div className="h-44 w-full flex items-end gap-2 pt-8 px-3 bg-slate-50 rounded-lg relative border border-slate-200">
          <div className="absolute inset-x-0 top-7 border-b border-dashed border-slate-300 flex justify-between px-3 text-[10px] text-slate-500">
            <span className="font-mono font-bold">10.0</span>
            <span className="font-bold text-amber-700 font-mono">Threshold</span>
          </div>

          {trendData.map((t) => (
            <div key={t.day} className="flex-1 flex flex-col items-center gap-1 h-full justify-end group">
              <div className="text-[10px] text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity font-mono">
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
      <div className="bg-white p-5 rounded-xl flex flex-col gap-3 border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">Recent Scans</h3>
          <span className="font-mono text-xs text-orange-700 bg-orange-50 border border-orange-200 px-2 py-0.5 rounded font-bold">
            Demonstration data
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <div
            className="bg-slate-50 p-3.5 rounded-lg flex items-center justify-between hover:bg-slate-100 transition-colors cursor-pointer border border-slate-200"
            onClick={() => onNavigate('report')}
            title="Click to view detailed exposure report"
          >
            <div className="flex flex-col">
              <span className="text-xs font-bold text-slate-900 font-mono">2023-10-24</span>
              <span className="text-xs text-slate-500">Shift A • ST-WB-00124</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <span className="text-xs font-mono font-bold text-slate-900">2.4 ppm·h</span>
                <div className="text-[10px] text-emerald-700 font-bold">Normal</div>
              </div>
              <span className="material-symbols-outlined text-slate-400 text-[18px]">chevron_right</span>
            </div>
          </div>

          <div
            className="bg-slate-50 p-3.5 rounded-lg flex items-center justify-between hover:bg-slate-100 transition-colors cursor-pointer border border-slate-200"
            onClick={() => onNavigate('report')}
            title="Click to view detailed exposure report"
          >
            <div className="flex flex-col">
              <span className="text-xs font-bold text-slate-900 font-mono">2023-10-23</span>
              <span className="text-xs text-slate-500">Shift B • ST-WB-00124</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <span className="text-xs font-mono font-bold text-slate-900">4.1 ppm·h</span>
                <div className="text-[10px] text-emerald-700 font-bold">Normal</div>
              </div>
              <span className="material-symbols-outlined text-slate-400 text-[18px]">chevron_right</span>
            </div>
          </div>

          <div
            className="bg-slate-50 p-3.5 rounded-lg flex items-center justify-between hover:bg-slate-100 transition-colors cursor-pointer border border-slate-200"
            onClick={() => onNavigate('report')}
            title="Click to view detailed exposure report"
          >
            <div className="flex flex-col">
              <span className="text-xs font-bold text-slate-900 font-mono">2023-10-22</span>
              <span className="text-xs text-slate-500">Shift A • ST-WB-00121</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <span className="text-xs font-mono font-bold text-slate-900">3.7 ppm·h</span>
                <div className="text-[10px] text-emerald-700 font-bold">Normal</div>
              </div>
              <span className="material-symbols-outlined text-slate-400 text-[18px]">chevron_right</span>
            </div>
          </div>
        </div>

        <button
          onClick={() => onNavigate('report')}
          className="mt-2 w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer border border-slate-200"
        >
          <span className="material-symbols-outlined text-[16px]">description</span>
          <span>View Detailed Compliance Report</span>
        </button>
      </div>
    </div>
  );
};
