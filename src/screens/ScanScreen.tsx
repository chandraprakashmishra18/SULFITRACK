import React, { useState, useRef } from 'react';
import { ScreenId } from '../types';
import { REFINERY_FACILITY } from '../data/mockData';

interface ScanScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export const ScanScreen: React.FC<ScanScreenProps> = ({ onNavigate }) => {
  const [flashOn, setFlashOn] = useState(false);
  const [cameraFacing, setCameraFacing] = useState<'back' | 'front'>('back');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [selectedPreset, setSelectedPreset] = useState<'rajesh' | 'arjun' | 'deepak'>('rajesh');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setUploadedImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const getPresetBadgeInfo = () => {
    switch (selectedPreset) {
      case 'arjun':
        return {
          id: 'ST-WB-00128',
          worker: 'Arjun Patel',
          unit: 'SRU-3',
          shift: 'Shift A'
        };
      case 'deepak':
        return {
          id: 'ST-WB-00142',
          worker: 'Deepak Sharma',
          unit: 'Tank Farm 3B',
          shift: 'Shift C'
        };
      case 'rajesh':
      default:
        return {
          id: 'ST-WB-00124',
          worker: 'Rajesh Kumar',
          unit: 'HCU-2',
          shift: 'Shift B'
        };
    }
  };

  const badgeInfo = getPresetBadgeInfo();

  return (
    <div className="flex flex-col w-full pb-16 space-y-4 animate-fadeIn">
      {/* Top Screen Info & Plant Context */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <h1 className="text-2xl font-bold text-slate-900">Dosimeter Optical Scanner</h1>
          </div>
          <p className="text-slate-600 text-xs sm:text-sm mt-0.5">
            Hold wristband flat within target reticle under steady plant illumination.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-800 font-mono text-xs font-semibold flex items-center gap-1 shadow-xs">
            <span className="material-symbols-outlined text-[14px]">videocam</span>
            SpectroCV Active
          </span>
          <span className="px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 text-slate-700 font-mono text-xs font-semibold hidden sm:inline-block">
            {REFINERY_FACILITY.name}
          </span>
        </div>
      </div>

      {/* Target Badge Selection Preset for Field Marshals */}
      <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-2 text-xs">
        <span className="text-slate-500 font-medium flex items-center gap-1">
          <span className="material-symbols-outlined text-[16px] text-orange-600">badge</span>
          Active Worker Badge Scan:
        </span>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            className={`px-2.5 py-1 rounded-lg font-mono text-xs font-semibold transition-colors cursor-pointer border ${
              selectedPreset === 'rajesh'
                ? 'bg-orange-600 text-white border-orange-600 shadow-xs'
                : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200'
            }`}
            onClick={() => setSelectedPreset('rajesh')}
          >
            Rajesh Kumar (HCU-2)
          </button>
          <button
            type="button"
            className={`px-2.5 py-1 rounded-lg font-mono text-xs font-semibold transition-colors cursor-pointer border ${
              selectedPreset === 'arjun'
                ? 'bg-orange-600 text-white border-orange-600 shadow-xs'
                : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200'
            }`}
            onClick={() => setSelectedPreset('arjun')}
          >
            Arjun Patel (SRU-3)
          </button>
          <button
            type="button"
            className={`px-2.5 py-1 rounded-lg font-mono text-xs font-semibold transition-colors cursor-pointer border ${
              selectedPreset === 'deepak'
                ? 'bg-orange-600 text-white border-orange-600 shadow-xs'
                : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200'
            }`}
            onClick={() => setSelectedPreset('deepak')}
          >
            Deepak Sharma (Tank 3B)
          </button>
        </div>
      </div>

      {/* Camera Scanning Viewfinder Container */}
      <div
        id="camera-viewfinder"
        className="relative w-full h-[390px] rounded-2xl overflow-hidden bg-slate-950 shadow-md border border-slate-800 flex flex-col justify-between p-4 bg-cover bg-center transition-all"
        style={{
          backgroundImage: uploadedImage
            ? `url('${uploadedImage}')`
            : "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCRcQitauIBBmBNkxwZV2N7bT1S6bnhk2ERfey9nsdsqH8_1PcLFbLSOTxpVp3NXDeeCYs9xB6tkoxTzxXqm89Wk5uqzK0oiVMusUAxZxiQ9IE4vD0eLAa3gtXfYuwTzzfoAOSuM-Rv8ZEBhYwkjWey69kHvy4Z4v-M8i1ngUNYE3e_7gduRx3Iu59J-bp1o9dgj3DSzFzmu4-GxEGng1nyRTggw4-9u9O8wvGir2_rXsrWNKU8rhJAoA')"
        }}
      >
        {/* Scrim Overlay for Contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/80 pointer-events-none"></div>

        {/* Top Status bar inside viewfinder */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-2 bg-slate-900/85 backdrop-blur-md px-3 py-1.5 rounded-full text-white border border-slate-700">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-mono text-xs text-emerald-300 font-medium">
              Spectral Calibration: 98.4%
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="scan-flash-btn"
              type="button"
              className={`w-9 h-9 rounded-full backdrop-blur-md flex items-center justify-center transition-colors cursor-pointer border ${
                flashOn
                  ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-500/30 font-bold'
                  : 'bg-slate-900/70 border-slate-700 text-white hover:bg-slate-800'
              }`}
              onClick={() => setFlashOn(!flashOn)}
              title={flashOn ? 'Turn Flash Off' : 'Turn Flash On'}
            >
              <span className="material-symbols-outlined text-[18px]">
                {flashOn ? 'flash_on' : 'flash_off'}
              </span>
            </button>

            <button
              id="scan-switch-cam-btn"
              type="button"
              className="w-9 h-9 rounded-full bg-slate-900/70 border border-slate-700 backdrop-blur-md flex items-center justify-center text-white hover:bg-slate-800 transition-colors cursor-pointer"
              onClick={() => setCameraFacing(cameraFacing === 'back' ? 'front' : 'back')}
              title="Switch Camera Sensor"
            >
              <span className="material-symbols-outlined text-[18px]">cameraswitch</span>
            </button>
          </div>
        </div>

        {/* Viewfinder Target Frame with Detection Boxes */}
        <div className="absolute inset-x-8 top-16 bottom-16 border-2 border-dashed border-orange-400/70 rounded-xl pointer-events-none flex flex-col justify-between p-3 animate-pulse">
          {/* Corner Reticles */}
          <div className="absolute -top-1.5 -left-1.5 w-5 h-5 border-t-3 border-l-3 border-orange-400"></div>
          <div className="absolute -top-1.5 -right-1.5 w-5 h-5 border-t-3 border-r-3 border-orange-400"></div>
          <div className="absolute -bottom-1.5 -left-1.5 w-5 h-5 border-b-3 border-l-3 border-orange-400"></div>
          <div className="absolute -bottom-1.5 -right-1.5 w-5 h-5 border-b-3 border-r-3 border-orange-400"></div>

          {/* Inner Detection Labels */}
          <div className="flex justify-between items-start">
            <div className="bg-slate-900/90 backdrop-blur-sm px-2.5 py-1 rounded text-[10px] text-orange-400 font-mono border border-orange-500/40">
              H₂S STRIP [ACTIVE DIFFUSION]
            </div>
            <div className="bg-slate-900/90 backdrop-blur-sm px-2.5 py-1 rounded text-[10px] text-slate-200 font-mono border border-slate-700">
              CALIBRATION SCALE [INDEXED]
            </div>
          </div>

          <div className="self-center my-auto px-4 py-2 bg-slate-900/90 backdrop-blur-sm rounded-lg border border-orange-500/60 flex flex-col items-center justify-center shadow-xl">
            <span className="font-mono text-xs text-orange-400 tracking-wider font-bold">
              BADGE ID: #{badgeInfo.id}
            </span>
            <span className="text-[10px] text-slate-300 font-mono mt-0.5">
              {badgeInfo.worker} ({badgeInfo.unit} · {badgeInfo.shift})
            </span>
          </div>

          <div className="flex justify-between items-end">
            <div className="bg-slate-900/90 backdrop-blur-sm px-2.5 py-1 rounded text-[10px] text-emerald-400 font-mono border border-emerald-500/30 flex items-center gap-1">
              <span className="material-symbols-outlined text-[12px]">verified</span>
              <span>VALIDITY DOT: ACTIVE</span>
            </div>
            <span className="material-symbols-outlined text-orange-400 text-[24px]">
              center_focus_strong
            </span>
          </div>
        </div>

        {/* Bottom Viewfinder Helper */}
        <div className="relative z-10 text-center">
          <span className="font-mono text-xs text-white bg-slate-900/85 backdrop-blur-md px-4 py-1.5 rounded-lg border border-slate-700 shadow-sm">
            Align reference swatches & chemical patch inside guide
          </span>
        </div>
      </div>

      {/* Scanning Requirements Checklist Card */}
      <div className="bg-white rounded-xl p-5 shadow-sm flex flex-col space-y-3 border border-slate-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-bold text-sm text-slate-900">Pre-Scan Validation Protocols</span>
            <span className="text-[10px] text-slate-500 font-mono">ISO-45001</span>
          </div>
          <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-md flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px] text-emerald-600">check</span>
            4/4 Verified
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
            <span
              className="material-symbols-outlined text-[18px] text-emerald-600"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              check_circle
            </span>
            <span className="text-xs text-slate-800 font-medium">Entire badge visible</span>
          </div>

          <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
            <span
              className="material-symbols-outlined text-[18px] text-emerald-600"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              check_circle
            </span>
            <span className="text-xs text-slate-800 font-medium">Reference scale in frame</span>
          </div>

          <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
            <span
              className="material-symbols-outlined text-[18px] text-emerald-600"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              check_circle
            </span>
            <span className="text-xs text-slate-800 font-medium">White-balance compensated</span>
          </div>

          <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
            <span
              className="material-symbols-outlined text-[18px] text-emerald-600"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              check_circle
            </span>
            <span className="text-xs text-slate-800 font-medium">Zero specular glare</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col space-y-2.5 pt-1">
        {/* Primary CTA: Capture & Analyse */}
        <a
          id="capture-analyse-btn"
          className="w-full h-12 bg-orange-600 text-white font-semibold rounded-xl flex items-center justify-center gap-2 shadow-sm shadow-orange-950/20 hover:bg-orange-700 transition-all active:scale-[0.98] cursor-pointer"
          href="#analysis"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('analysis');
          }}
        >
          <span className="material-symbols-outlined text-[20px]">cloud_upload</span>
          <span>Capture & Run SpectroCV Analysis</span>
        </a>

        {/* Secondary Option: Upload Image */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
          id="scan-upload-file-input"
        />
        <button
          id="scan-upload-btn"
          type="button"
          className="w-full h-11 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer border border-slate-200"
          onClick={() => fileInputRef.current?.click()}
        >
          <span className="material-symbols-outlined text-[18px]">upload_file</span>
          <span>{uploadedImage ? 'Change Uploaded Dosimeter Photo' : 'Upload Dosimeter Photo from Device'}</span>
        </button>
      </div>
    </div>
  );
};
