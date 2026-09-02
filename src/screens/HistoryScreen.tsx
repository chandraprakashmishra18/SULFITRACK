import React, { useState } from 'react';
import { ScreenId, ExposureRecord } from '../types';
import { INITIAL_EXPOSURE_RECORDS } from '../data/mockData';

interface HistoryScreenProps {
  onNavigate: (screen: ScreenId) => void;
  records?: ExposureRecord[];
}

export const HistoryScreen: React.FC<HistoryScreenProps> = ({
  onNavigate,
  records = INITIAL_EXPOSURE_RECORDS
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [workerFilter, setWorkerFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedRecord, setSelectedRecord] = useState<ExposureRecord | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filteredRecords = records.filter((rec) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      rec.workerName.toLowerCase().includes(q) ||
      rec.badgeId.toLowerCase().includes(q) ||
      rec.id.toLowerCase().includes(q);

    const matchesWorker = !workerFilter || rec.workerName === workerFilter;
    const matchesStatus = !statusFilter || rec.status === statusFilter;

    let matchesDate = true;
    if (dateFilter === 'today') {
      matchesDate = rec.date.includes('Oct 24');
    } else if (dateFilter === 'yesterday') {
      matchesDate = rec.date.includes('Oct 23');
    }

    return matchesSearch && matchesWorker && matchesStatus && matchesDate;
  });

  const resetFilters = () => {
    setSearchQuery('');
    setDateFilter('');
    setWorkerFilter('');
    setStatusFilter('');
  };

  return (
    <div className="flex flex-col w-full pb-16 animate-fadeIn">
      {/* Demonstration Data Disclaimer */}
      <div className="mb-4 p-3 bg-orange-50 text-orange-900 rounded-xl flex items-center justify-between shadow-sm border border-orange-200">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-orange-600">info</span>
          <span className="font-mono text-orange-900 font-medium text-xs">
            Simulation Mode: Displaying historical telemetry records for Sector 4-G.
          </span>
        </div>
        <span className="font-mono uppercase px-2 py-0.5 rounded bg-orange-600 text-white text-[10px] font-bold">
          Active
        </span>
      </div>

      {toastMessage && (
        <div className="mb-4 p-3 bg-emerald-50 text-emerald-800 rounded-xl flex items-center gap-2 border border-emerald-200 animate-fadeIn text-xs font-medium">
          <span className="material-symbols-outlined text-emerald-600 text-[18px]">check_circle</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Page Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Exposure Archive</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Query chemical colorimetric badge readings, atmospheric telemetry, and audit logs.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            id="archive-export-csv-btn"
            className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-100 text-slate-800 hover:bg-slate-200 border border-slate-200 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
            onClick={() => showToast('Historical records exported to CSV format.')}
          >
            <span className="material-symbols-outlined text-[16px]">download</span>
            <span>Export CSV</span>
          </button>

          <button
            id="archive-export-pdf-btn"
            className="flex items-center gap-1.5 px-3.5 py-2 bg-orange-600 text-white hover:bg-orange-700 rounded-lg text-xs font-semibold transition-colors cursor-pointer shadow-sm shadow-orange-950/20"
            onClick={() => showToast('Generating certified PDF audit package...')}
          >
            <span className="material-symbols-outlined text-[16px]">picture_as_pdf</span>
            <span>Export PDF</span>
          </button>
        </div>
      </div>

      {/* Search and Filters Panel */}
      <div className="bg-white p-4 rounded-xl mb-4 flex flex-col gap-3 shadow-sm border border-slate-200">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          {/* Search Bar */}
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <span className="material-symbols-outlined text-[18px]">search</span>
            </span>
            <input
              id="searchInput"
              className="w-full pl-9 pr-3 py-2 bg-slate-50 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-600 border border-slate-200 text-xs"
              placeholder="Search worker, badge ID..."
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Date Filter */}
          <div className="relative">
            <select
              id="dateFilter"
              className="w-full px-3 py-2 bg-slate-50 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-600 border border-slate-200 text-xs cursor-pointer font-mono"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            >
              <option value="">All Dates (Last 30 Days)</option>
              <option value="today">Today (Oct 24)</option>
              <option value="yesterday">Yesterday (Oct 23)</option>
              <option value="week">Past 7 Days</option>
            </select>
          </div>

          {/* Worker Filter */}
          <div className="relative">
            <select
              id="workerFilter"
              className="w-full px-3 py-2 bg-slate-50 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-600 border border-slate-200 text-xs cursor-pointer"
              value={workerFilter}
              onChange={(e) => setWorkerFilter(e.target.value)}
            >
              <option value="">All Workers</option>
              <option value="Marcus Vance">Marcus Vance</option>
              <option value="Elena Rostova">Elena Rostova</option>
              <option value="Derrick Cole">Derrick Cole</option>
              <option value="Sarah Chen">Sarah Chen</option>
              <option value="Javier Gomez">Javier Gomez</option>
            </select>
          </div>

          {/* Status Filter */}
          <div className="relative">
            <select
              id="statusFilter"
              className="w-full px-3 py-2 bg-slate-50 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-600 border border-slate-200 text-xs cursor-pointer font-mono"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">All Statuses</option>
              <option value="Safe">Safe</option>
              <option value="Warning">Warning</option>
              <option value="Critical">Critical</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between text-slate-500 pt-2 text-xs border-t border-slate-200">
          <span id="recordCount" className="font-mono text-xs">
            Showing <strong className="text-slate-800">{filteredRecords.length}</strong> of {records.length} records
          </span>
          <button
            className="text-orange-600 hover:underline text-xs font-bold cursor-pointer"
            onClick={resetFilters}
          >
            Reset Filters
          </button>
        </div>
      </div>

      {/* Records Table Container */}
      <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-slate-200">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[760px]">
            <thead>
              <tr className="bg-slate-50 text-slate-600 font-mono uppercase tracking-wider text-[11px] font-bold border-b border-slate-200">
                <th className="p-3">Date / Time</th>
                <th className="p-3">Worker</th>
                <th className="p-3">Badge ID</th>
                <th className="p-3">Shift</th>
                <th className="p-3">Est. Exposure</th>
                <th className="p-3">Environment</th>
                <th className="p-3">Confidence</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100" id="recordsTableBody">
              {filteredRecords.map((rec) => {
                let badgeClass =
                  'bg-emerald-50 text-emerald-700 border border-emerald-200';
                let dotClass = 'bg-emerald-600';
                if (rec.status === 'Warning') {
                  badgeClass = 'bg-amber-50 text-amber-700 border border-amber-200';
                  dotClass = 'bg-amber-500';
                } else if (rec.status === 'Critical') {
                  badgeClass = 'bg-red-50 text-red-700 border border-red-200';
                  dotClass = 'bg-red-600';
                }

                return (
                  <tr
                    key={rec.id}
                    className="hover:bg-slate-50/80 transition-colors cursor-pointer"
                    onClick={() => setSelectedRecord(rec)}
                  >
                    <td className="p-3 font-mono text-slate-800 text-xs">{rec.date}</td>
                    <td className="p-3 font-semibold text-slate-900 text-xs">
                      {rec.workerName}
                    </td>
                    <td className="p-3 text-slate-500 text-xs font-mono">
                      {rec.badgeId}
                    </td>
                    <td className="p-3 text-slate-500 text-xs">
                      {rec.shift.split(' ')[0]}
                    </td>
                    <td className="p-3 font-bold text-slate-900 text-xs font-mono">
                      {rec.exposure}
                    </td>
                    <td className="p-3 text-slate-500 text-xs font-mono">
                      {rec.temp} | {rec.humidity}
                    </td>
                    <td className="p-3 text-orange-700 text-xs font-mono font-semibold">
                      {rec.confidence}
                    </td>
                    <td className="p-3">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded font-mono text-[10px] font-bold ${badgeClass}`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${dotClass}`}></span>
                        {rec.status}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <button
                        className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 ml-auto transition-colors cursor-pointer border border-slate-200"
                        title="View details"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedRecord(rec);
                        }}
                      >
                        <span className="material-symbols-outlined text-[16px]">visibility</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Record Detail Modal */}
      {selectedRecord && (
        <div
          id="recordModal"
          className="fixed inset-0 z-50 bg-slate-950/50 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
        >
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] border border-slate-200">
            {/* Modal Header */}
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-orange-400">analytics</span>
                <div>
                  <h3 className="text-sm text-white font-bold font-mono" id="modalRecordId">
                    Record #{selectedRecord.id}
                  </h3>
                  <p className="font-mono text-slate-400 text-xs" id="modalTimestamp">
                    {selectedRecord.timestamp}
                  </p>
                </div>
              </div>
              <button
                className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center text-slate-300 hover:text-white cursor-pointer"
                onClick={() => setSelectedRecord(null)}
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 overflow-y-auto flex flex-col gap-4">
              {/* Worker & Badge Info */}
              <div className="bg-slate-50 p-3.5 rounded-xl flex items-center justify-between border border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold shadow-sm">
                    <span className="material-symbols-outlined text-[20px]" id="modalWorkerInitials">
                      person
                    </span>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm" id="modalWorkerName">
                      {selectedRecord.workerName}
                    </h4>
                    <p className="text-slate-500 text-xs font-mono" id="modalBadgeId">
                      Badge: {selectedRecord.badgeId}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded font-mono text-xs font-bold border ${
                      selectedRecord.status === 'Safe'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : selectedRecord.status === 'Warning'
                        ? 'bg-amber-50 text-amber-700 border-amber-200'
                        : 'bg-red-50 text-red-700 border-red-200'
                    }`}
                    id="modalStatusBadge"
                  >
                    {selectedRecord.status}
                  </span>
                  <p className="text-slate-500 mt-1 text-xs font-mono" id="modalShift">
                    {selectedRecord.shift}
                  </p>
                </div>
              </div>

              {/* Exposure Estimate & Confidence */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <span className="font-mono text-[10px] text-slate-500 uppercase font-bold tracking-wider">
                    Estimated Exposure
                  </span>
                  <div
                    className="font-bold text-slate-900 mt-1 text-2xl font-mono"
                    id="modalExposure"
                  >
                    {selectedRecord.exposure}
                  </div>
                  <p className="text-emerald-700 mt-1 text-xs font-semibold">
                    {selectedRecord.exposureValue < 5
                      ? 'Well below 10 PPM limit'
                      : selectedRecord.exposureValue < 10
                      ? 'Approaching exposure threshold'
                      : 'Exceeds standard ceiling limit'}
                  </p>
                </div>

                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <span className="font-mono text-[10px] text-slate-500 uppercase font-bold tracking-wider">
                    Model Confidence
                  </span>
                  <div
                    className="font-bold text-orange-600 mt-1 text-2xl font-mono"
                    id="modalConfidence"
                  >
                    {selectedRecord.confidence}
                  </div>
                  <p className="text-slate-500 mt-1 text-xs font-medium">RGB variance verified</p>
                </div>
              </div>

              {/* Environmental Conditions */}
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <span className="font-mono text-[10px] text-slate-500 uppercase block mb-2 font-bold tracking-wider">
                  Environmental Telemetry
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-orange-600 text-[18px]">thermostat</span>
                    <div>
                      <span className="text-slate-500 block text-[11px] font-mono">Temperature</span>
                      <span className="font-mono font-bold text-slate-900 text-xs" id="modalTemp">
                        {selectedRecord.temp}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-orange-600 text-[18px]">
                      humidity_percentage
                    </span>
                    <div>
                      <span className="text-slate-500 block text-[11px] font-mono">Humidity</span>
                      <span className="font-mono font-bold text-slate-900 text-xs" id="modalHumidity">
                        {selectedRecord.humidity}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Colour Analysis Spectrum */}
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[10px] text-slate-500 uppercase font-bold tracking-wider">
                    Colorimetric Patch Analysis
                  </span>
                  <span className="font-mono text-orange-600 text-xs font-bold">
                    RGB Sensor Array v4
                  </span>
                </div>

                <div
                  className="h-9 rounded-lg w-full flex items-center px-3 shadow-inner border border-black/10 transition-colors"
                  id="modalColorBar"
                  style={{ backgroundColor: selectedRecord.colorHex }}
                >
                  <span
                    className="font-mono font-bold text-xs"
                    id="modalColorText"
                    style={{ color: selectedRecord.textColorHex }}
                  >
                    Color Shift Index: {selectedRecord.status}
                  </span>
                </div>

                <div className="flex justify-between text-slate-500 mt-2 font-mono text-xs">
                  <span>{selectedRecord.rgb}</span>
                  <span>Delta-E: {selectedRecord.deltaE}</span>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-3.5 bg-slate-50 flex justify-end gap-2 border-t border-slate-200">
              <button
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold transition-colors cursor-pointer border border-slate-200"
                onClick={() => setSelectedRecord(null)}
              >
                Close
              </button>
              <button
                className="px-4 py-2 bg-orange-600 text-white hover:bg-orange-700 rounded-lg text-xs font-semibold transition-colors cursor-pointer shadow-sm shadow-orange-950/20"
                onClick={() => {
                  showToast(`Certified compliance certificate for #${selectedRecord.id} generated.`);
                  setSelectedRecord(null);
                }}
              >
                Download Certificate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
