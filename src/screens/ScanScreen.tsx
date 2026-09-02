import React, { useState, useRef } from 'react';
import { ScreenId } from '../types';

interface ScanScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export const ScanScreen: React.FC<ScanScreenProps> = ({ onNavigate }) => {
  const [flashOn, setFlashOn] = useState(false);
  const [cameraFacing, setCameraFacing] = useState<'back' | 'front'>('back');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
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

  return (
    <div className="flex flex-col w-full pb-16 space-y-4 animate-fadeIn">
      {/* Top Screen Info & Demo Badge */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Scan Dosimeter</h1>
          <p className="text-slate-600 text-sm">Place the complete wristband inside the frame.</p>
        </div>
        <span className="px-2.5 py-1 rounded bg-orange-50 border border-orange-200 text-orange-700 font-mono text-xs font-semibold flex items-center gap-1 shadow-xs">
          <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            bolt
          </span>
          Demo Mode
        </span>
      </div>

      {/* Camera Scanning Viewfinder Container */}
      <div
        id="camera-viewfinder"
        className="relative w-full h-[380px] rounded-xl overflow-hidden bg-slate-950 shadow-sm border border-slate-800 flex flex-col justify-between p-4 bg-cover bg-center transition-all"
        style={{
          backgroundImage: uploadedImage
            ? `url('${uploadedImage}')`
            : "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCRcQitauIBBmBNkxwZV2N7bT1S6bnhk2ERfey9nsdsqH8_1PcLFbLSOTxpVp3NXDeeCYs9xB6tkoxTzxXqm89Wk5uqzK0oiVMusUAxZxiQ9IE4vD0eLAa3gtXfYuwTzzfoAOSuM-Rv8ZEBhYwkjWey69kHvy4Z4v-M8i1ngUNYE3e_7gduRx3Iu59J-bp1o9dgj3DSzFzmu4-GxEGng1nyRTggw4-9u9O8wvGir2_rXsrWNKU8rhJAoA')"
        }}
      >
        {/* Scrim Overlay for Contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/75 pointer-events-none"></div>

        {/* Top Status bar inside viewfinder */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-2 bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-full text-white border border-slate-700">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-mono text-xs text-emerald-300 font-medium">Image quality: Good</span>
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
        <div className="absolute inset-x-8 top-16 bottom-16 border-2 border-dashed border-orange-400/60 rounded-lg pointer-events-none flex flex-col justify-between p-3 animate-pulse">
          {/* Corner Reticles */}
          <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-orange-400"></div>
          <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-orange-400"></div>
          <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-orange-400"></div>
          <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-orange-400"></div>

          {/* Inner Detection Boxes */}
          <div className="flex justify-between items-start">
            <div className="bg-slate-900/85 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] text-orange-400 font-mono border border-orange-500/30">
              H₂S STRIP [ACTIVE]
            </div>
            <div className="bg-slate-900/85 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] text-slate-300 font-mono border border-slate-700">
              REF SCALE
            </div>
          </div>

          <div className="self-center my-auto px-4 py-2 bg-slate-900/85 backdrop-blur-sm rounded-md border border-orange-500/50 flex items-center justify-center shadow-lg">
            <span className="font-mono text-xs text-orange-400 tracking-widest font-bold">
              BADGE ID #8492-X
            </span>
          </div>

          <div className="flex justify-between items-end">
            <div className="bg-slate-900/85 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] text-white font-mono border border-slate-700">
              VALIDITY: OK
            </div>
            <span className="material-symbols-outlined text-orange-400 text-[22px]">
              center_focus_strong
            </span>
          </div>
        </div>

        {/* Bottom Viewfinder Helper */}
        <div className="relative z-10 text-center">
          <span className="font-mono text-xs text-white bg-slate-900/80 backdrop-blur-md px-3.5 py-1.5 rounded-md border border-slate-700 shadow-sm">
            Align wristband within target guides
          </span>
        </div>
      </div>

      {/* Scanning Requirements Checklist Card */}
      <div className="bg-white rounded-xl p-5 shadow-sm flex flex-col space-y-3 border border-slate-200">
        <div className="flex items-center justify-between">
          <span className="font-bold text-sm text-slate-900">Scanning Requirements</span>
          <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-md">
            4/4 Met
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
            <span className="text-xs text-slate-800 font-medium">Reference scale visible</span>
          </div>

          <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
            <span
              className="material-symbols-outlined text-[18px] text-emerald-600"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              check_circle
            </span>
            <span className="text-xs text-slate-800 font-medium">Adequate lighting</span>
          </div>

          <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
            <span
              className="material-symbols-outlined text-[18px] text-emerald-600"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              check_circle
            </span>
            <span className="text-xs text-slate-800 font-medium">Image in focus</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col space-y-2.5 pt-2">
        {/* Primary CTA: Capture & Analyse (must match xpath //a[contains(text(), 'Capture')]) */}
        <a
          id="capture-analyse-btn"
          className="w-full h-12 bg-orange-600 text-white font-semibold rounded-lg flex items-center justify-center gap-2 shadow-sm shadow-orange-950/20 hover:bg-orange-700 transition-all active:scale-[0.98] cursor-pointer"
          href="#analysis"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('analysis');
          }}
        >
          <span className="material-symbols-outlined text-[20px]">cloud_upload</span>
          <span>Capture & Analyse</span>
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
          className="w-full h-11 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer border border-slate-200"
          onClick={() => fileInputRef.current?.click()}
        >
          <span className="material-symbols-outlined text-[18px]">upload_file</span>
          <span>{uploadedImage ? 'Change Uploaded Image' : 'Upload Image'}</span>
        </button>
      </div>
    </div>
  );
};
