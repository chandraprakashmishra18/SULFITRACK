import React, { useState } from 'react';
import { ScreenId, ScanContextData, ExposureRecord } from '../types';
import { REFINERY_FACILITY, CURRENT_SAFETY_OFFICER } from '../data/mockData';
import { api } from '../services/api';

interface ResultScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onBack: () => void;
  scanContext: ScanContextData;
  onSaveRecord?: (record: ExposureRecord) => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({
  onNavigate,
  onBack,
  scanContext,
  onSaveRecord
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [savedRecordId, setSavedRecordId] = useState<string | null>(null);

  const analysis = scanContext.analysisResult || {
    exposureValue: 10.2,
    exposureStr: '10.2 PPM·h',
    status: 'Warning' as const,
    statusColor: '#f59e0b',
    deltaE: 2.84,
    deltaEStr: '2.84',
    rawDeltaE: 79.1,
    cielab: { L: 60.5, a: 22.4, b: 48.6 },
    baselineLab: { L: 95.8, a: -0.4, b: 3.8 },
    rgbStr: `R: ${scanContext.sampledRgb.r} G: ${scanContext.sampledRgb.g} B: ${scanContext.sampledRgb.b}`,
    hexColor: '#d97706',
    textColorHex: '#ffffff',
    kineticFactor: 1.117,
    tempCorrection: 1.072,
    humidityCorrection: 1.042,
    confidence: 95.2,
    confidenceStr: '95.2%',
    shiftTWAPercentage: 102
  };

  const isCritical = analysis.status === 'Critical';
  const isWarning = analysis.status === 'Warning';
  const isSafe = analysis.status === 'Safe';

  const handleSaveToDatabase = async () => {
    setIsSaving(true);
    try {
      const newRecord = await api.createRecord({
        workerId: scanContext.workerId,
        workerName: scanContext.workerName,
        badgeId: scanContext.badgeId,
        department: scanContext.department,
        shift: scanContext.shift,
        exposure: analysis.exposureStr,
        exposureValue: analysis.exposureValue,
        environment: `${scanContext.tempC.toFixed(1)}°C / ${scanContext.humidityRH}% RH`,
        temp: `${scanContext.tempC.toFixed(1)}°C`,
        humidity: `${scanContext.humidityRH}% RH`,
        confidence: analysis.confidenceStr,
        status: analysis.status,
        colorHex: analysis.hexColor,
        textColorHex: analysis.textColorHex,
        rgb: analysis.rgbStr,
        deltaE: analysis.deltaEStr,
        supervisor: CURRENT_SAFETY_OFFICER.name,
        imageUrl: scanContext.imageUrl || undefined
      });

      setSavedRecordId(newRecord.id);
      if (onSaveRecord) {
        onSaveRecord(newRecord);
      }
    } catch (err) {
      console.error('[ResultScreen] Failed to commit record:', err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex flex-col w-full gap-4 pb-12 animate-fadeIn">
      {/* Top Status Card: ESTIMATED CUMULATIVE H₂S EXPOSURE */}
      <div className="flex flex-col bg-white rounded-2xl p-6 shadow-sm relative overflow-hidden border border-slate-200">
        <div
          className="absolute top-0 left-0 right-0 h-1.5"
          style={{ backgroundColor: analysis.statusColor }}
        ></div>

        <div className="flex justify-between items-start mb-2 pt-1">
          <div className="flex flex-col">
            <span className="font-mono text-xs font-bold text-slate-500 uppercase tracking-wider">
              ESTIMATED CUMULATIVE H₂S EXPOSURE
            </span>
            <span className="text-[11px] text-slate-500 font-mono mt-0.5">
              MRPL EHS Division • {scanContext.shift} Exposure Record
            </span>
          </div>

          <span
            className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-xs border ${
              isCritical
                ? 'bg-red-50 text-red-800 border-red-200'
                : isWarning
                ? 'bg-amber-50 text-amber-800 border-amber-200'
                : 'bg-emerald-50 text-emerald-800 border-emerald-200'
            }`}
          >
            <span className="material-symbols-outlined text-[14px]">
              {isCritical ? 'dangerous' : isWarning ? 'warning' : 'verified'}
            </span>
            {isCritical ? 'CRITICAL EXPOSURE' : isWarning ? 'ELEVATED DOSE' : 'SAFE / NORMAL'}
          </span>
        </div>

        {/* Large Dosage Metric Display */}
        <div className="flex flex-wrap items-baseline gap-2 my-3">
          <span className="font-mono text-5xl font-extrabold text-slate-900 tracking-tight">
            {analysis.exposureValue.toFixed(1)}
          </span>
          <span className="font-mono text-slate-500 text-base font-semibold">PPM·h</span>
          <span
            className={`ml-2 text-xs font-medium px-2 py-0.5 rounded border ${
              isCritical
                ? 'bg-red-50 text-red-800 border-red-200'
                : isWarning
                ? 'bg-amber-50 text-amber-800 border-amber-200'
                : 'bg-emerald-50 text-emerald-800 border-emerald-200'
            }`}
          >
            {isCritical
              ? 'Shift Ceiling (10.0 PPM·h) Exceeded - Immediate Medical Review Required'
              : isWarning
              ? 'Shift Permissible Limit Approaching (Threshold: 10.0 PPM·h)'
              : 'Well Below 8-Hour Permissible Exposure Limit'}
          </span>
        </div>

        {/* Calibration & Engine Footnote */}
        <div className="flex flex-wrap items-center justify-between gap-2 mt-2 pt-3 border-t border-slate-100 text-xs">
          <span className="text-slate-600 flex items-center gap-1 font-medium">
            <span className="material-symbols-outlined text-[15px] text-emerald-600">verified</span>
            Calibrated Batch #2026-SRU-09 · SpectroCV v4.2 Engine
          </span>
          <span className="text-orange-700 flex items-center gap-1 font-semibold font-mono">
            <span className="material-symbols-outlined text-[16px]">psychology</span>
            Spectrophotometric Confidence: {analysis.confidenceStr}
          </span>
        </div>
      </div>

      {/* Horizontal OISD-114 Exposure Spectrum Bar */}
      <div className="flex flex-col bg-white rounded-2xl p-5 shadow-sm gap-3 border border-slate-200">
        <div className="flex justify-between items-center">
          <div>
            <span className="text-sm font-bold text-slate-900">OISD-114 Exposure Spectrum</span>
            <span className="text-xs text-slate-500 ml-2">8-Hour Shift TWA Scale</span>
          </div>
          <span className="font-mono text-xs text-slate-600 font-semibold bg-slate-100 px-2 py-0.5 rounded">
            Ceiling Limit: 10.0 PPM·h
          </span>
        </div>

        <div className="flex flex-col gap-2">
          {/* Progress track with needle position */}
          <div className="relative w-full">
            <div className="grid grid-cols-4 gap-1.5 h-3.5 rounded-full overflow-hidden bg-slate-100 p-0.5 border border-slate-200">
              <div className="bg-emerald-500 rounded-l-full" title="Low: < 2.0 PPM·h"></div>
              <div className="bg-blue-500" title="Normal: 2.0 - 5.0 PPM·h"></div>
              <div className="bg-amber-500" title="Elevated: 5.0 - 10.0 PPM·h"></div>
              <div className="bg-red-600 rounded-r-full" title="Critical: > 10.0 PPM·h"></div>
            </div>

            {/* Needle indicator positioned based on actual exposure */}
            <div
              className="absolute -top-1 w-3.5 h-5 bg-slate-950 rounded-sm shadow-md transition-all -translate-x-1/2 flex items-center justify-center border border-white pointer-events-none"
              style={{
                left: `${Math.min(98, Math.max(2, (analysis.exposureValue / 15.0) * 100))}%`
              }}
            >
              <div className="w-1 h-2 bg-white rounded-xs"></div>
            </div>
          </div>

          <div className="flex justify-between font-mono text-[11px] px-1 font-bold">
            <span className={analysis.exposureValue < 2 ? 'text-emerald-700 underline font-extrabold' : 'text-slate-500'}>
              LOW (&lt;2)
            </span>
            <span className={analysis.exposureValue >= 2 && analysis.exposureValue < 5 ? 'text-blue-700 underline font-extrabold' : 'text-slate-500'}>
              NORMAL (2-5)
            </span>
            <span className={analysis.exposureValue >= 5 && analysis.exposureValue <= 10 ? 'text-amber-800 underline font-extrabold' : 'text-slate-500'}>
              ELEVATED (5-10)
            </span>
            <span className={analysis.exposureValue > 10 ? 'text-red-700 underline font-extrabold' : 'text-slate-500'}>
              CRITICAL (&gt;10)
            </span>
          </div>
        </div>
      </div>

      {/* Reagent Colorimetry & CIELAB Chromatic Swatches */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 flex flex-col gap-3">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-orange-600 text-[18px]">palette</span>
            <span className="text-xs uppercase font-bold text-slate-800 tracking-wider">
              Spectrophotometric Colorimetry Breakdown
            </span>
          </div>
          <span className="font-mono text-xs text-orange-700 font-bold bg-orange-50 px-2 py-0.5 rounded border border-orange-200">
            Delta-E: {analysis.deltaEStr}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Swatch 1: Unexposed Baseline */}
          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
            <div className="w-12 h-12 rounded-xl border border-slate-300 shadow-xs flex-shrink-0 bg-[#f5f3ec]"></div>
            <div className="flex flex-col text-xs">
              <span className="font-bold text-slate-900">Factory Baseline</span>
              <span className="text-slate-500 font-mono text-[11px]">Unexposed Reagent</span>
              <span className="text-slate-600 font-mono text-[10px] mt-0.5">L*: 95.8 a*: -0.4 b*: 3.8</span>
            </div>
          </div>

          {/* Swatch 2: Sampled Strip Color */}
          <div className="flex items-center gap-3 p-3 rounded-xl bg-orange-50/50 border border-orange-200">
            <div
              className="w-12 h-12 rounded-xl border border-orange-300 shadow-xs flex-shrink-0"
              style={{ backgroundColor: analysis.hexColor }}
            ></div>
            <div className="flex flex-col text-xs">
              <span className="font-bold text-slate-900">Analyzed Dosimeter</span>
              <span className="text-slate-700 font-mono text-[11px] font-semibold">{analysis.hexColor.toUpperCase()}</span>
              <span className="text-slate-600 font-mono text-[10px] mt-0.5">
                L*: {analysis.cielab.L} a*: {analysis.cielab.a} b*: {analysis.cielab.b}
              </span>
            </div>
          </div>

          {/* Swatch 3: Chromatic Distance Shift */}
          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
            <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex flex-col items-center justify-center font-mono font-bold text-sm shadow-xs flex-shrink-0">
              ΔE
              <span className="text-[10px] text-orange-400 font-normal">{analysis.deltaEStr}</span>
            </div>
            <div className="flex flex-col text-xs">
              <span className="font-bold text-slate-900">Euclidean Distance</span>
              <span className="text-slate-500 font-mono text-[11px]">CIELAB Chromatic Shift</span>
              <span className="text-emerald-700 font-mono text-[10px] font-semibold mt-0.5">Kinetic Factor: {analysis.kineticFactor}x</span>
            </div>
          </div>
        </div>
      </div>

      {/* Environmental Conditions & Worker Info Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Environmental Conditions */}
        <div className="flex flex-col bg-white rounded-2xl p-4 shadow-sm gap-2 border border-slate-200">
          <div className="flex items-center gap-2 text-slate-700">
            <span className="material-symbols-outlined text-[18px] text-orange-600">thermostat</span>
            <span className="text-xs uppercase font-bold text-slate-800 tracking-wider">
              Plant Micro-Climate Telemetry
            </span>
          </div>
          <div className="flex flex-col gap-2 mt-1">
            <div className="flex justify-between items-center text-xs pb-1.5 border-b border-slate-100">
              <span className="text-slate-500">Ambient Temperature</span>
              <span className="font-mono text-slate-900 font-bold text-sm">{scanContext.tempC.toFixed(1)}°C</span>
            </div>
            <div className="flex justify-between items-center text-xs pb-1.5 border-b border-slate-100">
              <span className="text-slate-500">Relative Humidity</span>
              <span className="font-mono text-slate-900 font-bold text-sm">{scanContext.humidityRH}% RH (Coastal)</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-500">Combined Kinetic Multiplier</span>
              <span className="font-mono text-emerald-700 font-bold text-xs">{analysis.kineticFactor}x Normal</span>
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
              <span className="font-sans text-slate-900 font-bold text-xs">
                {scanContext.workerName} ({scanContext.workerId})
              </span>
            </div>
            <div className="flex justify-between items-center text-xs pb-1.5 border-b border-slate-100">
              <span className="text-slate-500">Department / Unit</span>
              <span className="font-sans text-slate-900 font-semibold text-xs">{scanContext.department}</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-500">Badge Serial No</span>
              <span className="font-mono text-slate-900 font-bold text-xs">#{scanContext.badgeId}</span>
            </div>
          </div>
        </div>
      </div>

      {/* EHS Supervisor Signoff Card */}
      <div className="flex items-center justify-between bg-white rounded-2xl px-5 py-4 shadow-sm border border-slate-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-600">
            <span className="material-symbols-outlined text-[20px]">verified_user</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-slate-900 font-bold">
              {scanContext.shift} • {new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
            </span>
            <span className="text-xs text-slate-500">
              HSE Supervisor Signoff: {CURRENT_SAFETY_OFFICER.name} ({CURRENT_SAFETY_OFFICER.empId})
            </span>
          </div>
        </div>
        <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 font-mono text-xs font-bold border border-emerald-200">
          VALIDATED
        </span>
      </div>

      {/* Expandable Engineering Breakdown: How was this estimated? */}
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
              Engineering Breakdown: How Was {analysis.exposureStr} Calculated?
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
                  Passive Colorimetric Reaction Kinetics
                </span>
                <span className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                  Impregnated reagent paper absorbed ambient H₂S gas throughout worker shift, precipitating dark metal sulfide with color {analysis.hexColor}.
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center font-mono flex-shrink-0 mt-0.5 text-xs font-bold">
                2
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-900">
                  Reference Scale & Illumination Normalization
                </span>
                <span className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                  The optical scanner captured the concentric reference ring, transforming sRGB to D65 CIELAB coordinates (L*={analysis.cielab.L}, a*={analysis.cielab.a}, b*={analysis.cielab.b}) to eliminate refinery lighting bias.
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
                  Temperature ({scanContext.tempC}°C) and relative humidity ({scanContext.humidityRH}%) kinetic factors yielded a {analysis.kineticFactor}x multiplier based on Arrhenius gas diffusion.
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
                  Normalized Delta-E index ({analysis.deltaEStr}) mapped onto calibrated OISD dose curves yielded the final certified dosage of {analysis.exposureStr}.
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Save Success Banner */}
      {savedRecordId && (
        <div className="p-4 bg-emerald-50 text-emerald-900 rounded-xl border border-emerald-200 flex items-center gap-2.5 animate-fadeIn text-xs sm:text-sm font-medium">
          <span className="material-symbols-outlined text-emerald-600 text-[24px]">verified</span>
          <div>
            <strong>Committed to Central Safety Database:</strong> Dossier registered under Record ID{' '}
            <span className="font-mono font-bold">{savedRecordId}</span> for worker {scanContext.workerName} ({scanContext.workerId}). Permanent audit trail archived.
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 mt-2">
        <button
          id="save-exposure-btn"
          type="button"
          disabled={isSaving || !!savedRecordId}
          className={`flex-1 h-12 rounded-xl font-bold flex items-center justify-center gap-2 shadow-sm transition-all text-sm ${
            savedRecordId
              ? 'bg-emerald-600 text-white cursor-default'
              : 'bg-orange-600 hover:bg-orange-700 text-white cursor-pointer active:scale-[0.98]'
          }`}
          onClick={handleSaveToDatabase}
        >
          <span className="material-symbols-outlined text-[20px]">
            {savedRecordId ? 'check_circle' : isSaving ? 'sync' : 'save'}
          </span>
          <span>
            {savedRecordId
              ? `Saved to Database (#${savedRecordId})`
              : isSaving
              ? 'Committing Dossier...'
              : 'Save to Enterprise Safety Database'}
          </span>
        </button>

        <button
          id="view-worker-history-btn"
          type="button"
          className="flex-1 h-12 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl font-semibold flex items-center justify-center gap-2 border border-slate-200 transition-colors cursor-pointer active:scale-[0.98] text-sm"
          onClick={() => onNavigate('history')}
        >
          <span className="material-symbols-outlined text-[20px]">history</span>
          <span>View Worker Exposure History</span>
        </button>

        <button
          type="button"
          className="sm:w-36 h-12 bg-slate-800 hover:bg-slate-900 text-white rounded-xl font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer active:scale-[0.98] text-xs"
          onClick={() => onNavigate('scan')}
        >
          <span className="material-symbols-outlined text-[18px]">photo_camera</span>
          <span>Scan Another</span>
        </button>
      </div>
    </div>
  );
};
