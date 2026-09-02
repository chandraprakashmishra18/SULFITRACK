import React, { useState } from 'react';
import { ScreenId } from '../types';

interface ResultScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onBack: () => void;
  onSaveRecord?: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({ onNavigate, onBack, onSaveRecord }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = () => {
    setSavedSuccess(true);
    if (onSaveRecord) {
      onSaveRecord();
    }
    setTimeout(() => {
      setSavedSuccess(false);
    }, 3000);
  };

  return (
    <div className="flex flex-col w-full gap-4 pb-12 animate-fadeIn">
      {/* Top Status Card: ESTIMATED CUMULATIVE H₂S EXPOSURE */}
      <div className="flex flex-col bg-white rounded-xl p-5 shadow-sm relative overflow-hidden border border-slate-200">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-amber-500"></div>

        <div className="flex justify-between items-start mb-2 pt-1">
          <span className="font-mono text-xs font-bold text-slate-500 uppercase tracking-wider">
            ESTIMATED CUMULATIVE H₂S EXPOSURE
          </span>
          <span className="px-2.5 py-1 rounded bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              warning
            </span>
            ELEVATED
          </span>
        </div>

        <div className="flex items-baseline gap-2 my-2">
          <span className="font-mono text-4xl font-bold text-slate-900 tracking-tight">
            10.2
          </span>
          <span className="font-mono text-slate-500 text-sm font-semibold">ppm·h</span>
        </div>

        <div className="flex items-center justify-between mt-2 pt-3 border-t border-slate-100 text-xs">
          <span className="text-slate-500">Prototype / Simulated Result</span>
          <span className="text-orange-600 flex items-center gap-1 font-semibold">
            <span className="material-symbols-outlined text-[16px]">psychology</span>
            Model confidence: 92%
          </span>
        </div>
      </div>

      {/* Horizontal Exposure Scale */}
      <div className="flex flex-col bg-white rounded-xl p-5 shadow-sm gap-3 border border-slate-200">
        <div className="flex justify-between items-center">
          <span className="text-sm font-bold text-slate-900">Exposure Spectrum</span>
          <span className="font-mono text-xs text-slate-500 font-medium">Target Limit: &lt; 5.0 ppm·h</span>
        </div>

        <div className="flex flex-col gap-2">
          <div className="grid grid-cols-4 gap-1.5 h-3 rounded-full overflow-hidden bg-slate-100 p-0.5 border border-slate-200">
            <div className="bg-emerald-500 rounded-l-full"></div>
            <div className="bg-blue-500"></div>
            <div className="bg-amber-500 relative ring-2 ring-slate-900 ring-offset-1 rounded-sm shadow-xs">
              <div className="absolute inset-0 bg-amber-400 animate-ping opacity-60"></div>
            </div>
            <div className="bg-red-600 rounded-r-full"></div>
          </div>

          <div className="flex justify-between font-mono text-[11px] px-1 font-bold">
            <span className="text-emerald-700">LOW</span>
            <span className="text-blue-700">NORMAL</span>
            <span className="text-amber-800 underline decoration-2">ELEVATED</span>
            <span className="text-red-700">HIGH</span>
          </div>
        </div>
      </div>

      {/* Environmental Conditions & Badge Info Grid */}
      <div className="grid grid-cols-2 gap-4">
        {/* Environmental Conditions */}
        <div className="flex flex-col bg-white rounded-xl p-4 shadow-sm gap-2 border border-slate-200">
          <div className="flex items-center gap-2 text-slate-600">
            <span className="material-symbols-outlined text-[18px] text-orange-600">thermostat</span>
            <span className="text-xs uppercase font-bold text-slate-700 tracking-wider">Environment</span>
          </div>
          <div className="flex flex-col gap-1.5 mt-1">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-500">Temp</span>
              <span className="font-mono text-slate-900 font-bold text-sm">31°C</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-500">Humidity</span>
              <span className="font-mono text-slate-900 font-bold text-sm">64%</span>
            </div>
          </div>
        </div>

        {/* Badge Info */}
        <div className="flex flex-col bg-white rounded-xl p-4 shadow-sm gap-2 border border-slate-200">
          <div className="flex items-center gap-2 text-slate-600">
            <span className="material-symbols-outlined text-[18px] text-orange-600">badge</span>
            <span className="text-xs uppercase font-bold text-slate-700 tracking-wider">Badge Details</span>
          </div>
          <div className="flex flex-col gap-1.5 mt-1">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-500">ID</span>
              <span className="font-mono text-slate-900 text-xs font-bold">
                ST-WB-00124
              </span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-500">Worker</span>
              <span className="font-mono text-slate-900 text-xs font-bold">
                WRK-1048
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Badge Metadata Card */}
      <div className="flex items-center justify-between bg-white rounded-xl px-4 py-3.5 shadow-sm border border-slate-200">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-600">
            <span className="material-symbols-outlined text-[18px]">verified_user</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-slate-900 font-bold">Evening Shift • 03 Sep 2026</span>
            <span className="text-xs text-slate-500">Sensor Calibration Active</span>
          </div>
        </div>
        <span className="px-2.5 py-1 rounded bg-emerald-50 text-emerald-700 font-mono text-xs font-bold border border-emerald-200">
          VALID
        </span>
      </div>

      {/* Expandable 'How was this estimated?' Section */}
      <div className="flex flex-col bg-white rounded-xl overflow-hidden shadow-sm border border-slate-200">
        <button
          id="how-estimated-toggle"
          type="button"
          className="w-full p-4 flex items-center justify-between text-left focus:outline-none hover:bg-slate-50 transition-colors cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-orange-600">schema</span>
            <span className="text-sm text-slate-900 font-bold">How was this estimated?</span>
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
          <div className="flex flex-col px-4 pb-4 gap-3 border-t border-slate-100 pt-3 animate-fadeIn">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center font-mono flex-shrink-0 mt-0.5 text-xs font-bold">
                1
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-900">
                  Colour Response Capture
                </span>
                <span className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                  Optical spectrometer reads chemical dosimeter patch shift on the wearable sensor.
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center font-mono flex-shrink-0 mt-0.5 text-xs font-bold">
                2
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-900">
                  Reference Correction
                </span>
                <span className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                  Baseline ambient calibration applied to isolate target H₂S gas interaction.
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center font-mono flex-shrink-0 mt-0.5 text-xs font-bold">
                3
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-900">
                  Environmental Compensation
                </span>
                <span className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                  Adjusted for 31°C temperature and 64% humidity matrix interference models.
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-orange-600 text-white flex items-center justify-center font-mono flex-shrink-0 mt-0.5 text-xs font-bold">
                <span className="material-symbols-outlined text-[14px]">bolt</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-900">
                  AI Regression Engine
                </span>
                <span className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                  Non-linear neural network calculates final cumulative exposure dosage (10.2 ppm·h).
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Save Success Banner */}
      {savedSuccess && (
        <div className="p-3 bg-emerald-50 text-emerald-800 rounded-lg border border-emerald-200 flex items-center gap-2 animate-fadeIn text-xs font-medium">
          <span className="material-symbols-outlined text-emerald-600 text-[18px]">check_circle</span>
          <span>Exposure record successfully saved to enterprise database (ID: ST-WB-00124).</span>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col gap-2.5 mt-2">
        <button
          id="save-exposure-btn"
          type="button"
          className="w-full h-12 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-semibold flex items-center justify-center gap-2 shadow-sm shadow-orange-950/20 transition-all cursor-pointer active:scale-[0.98]"
          onClick={handleSave}
        >
          <span className="material-symbols-outlined text-[18px]">save</span>
          <span>Save Exposure Record</span>
        </button>

        <button
          id="view-worker-history-btn"
          type="button"
          className="w-full h-11 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg font-semibold flex items-center justify-center gap-2 border border-slate-200 transition-colors cursor-pointer active:scale-[0.98]"
          onClick={() => onNavigate('history')}
        >
          <span className="material-symbols-outlined text-[18px]">history</span>
          <span>View Worker History</span>
        </button>
      </div>
    </div>
  );
};
