import React, { useState, useRef, useEffect } from 'react';
import { ScreenId } from '../types';
import { PIPELINE_STAGES, REFINERY_FACILITY } from '../data/mockData';

interface HowItWorksScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onBack: () => void;
}

export const HowItWorksScreen: React.FC<HowItWorksScreenProps> = ({ onNavigate, onBack }) => {
  const [downloaded, setDownloaded] = useState(false);
  const backBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (backBtnRef.current) {
      backBtnRef.current.setAttribute('onclick', 'history.back()');
    }
  }, []);

  const handleDownloadWhitepaper = () => {
    const textContent = `================================================================================
SULFITRACK — PASSIVE H₂S DOSIMETER WRISTBAND
SYSTEM SPECIFICATIONS & TECHNICAL PROTOCOL WHITEPAPER v4.2
MRPL Refinery Complex, Mangaluru · Smart India Hackathon Initiative
================================================================================

1. CORE PHILOSOPHY & PROBLEM STATEMENT:
Hydrogen sulfide (H2S) is a fatal, toxic neurotoxin prevalent across petroleum 
refinery units (Sulfur Recovery Units, Hydrocracker Complex, Coker Decks). 
Active electronic gas detectors are heavy, power-hungry, battery-dependent, 
and only alarm at immediate instantaneous threshold spikes.
SulfiTrack introduces passive dosimetry: capturing low-level, cumulative 
sub-clinical exposure (PPM·h) over complete 8-hour worker shifts.

2. WEARABLE HARDWARE ARCHITECTURE (PASSIVE WRISTBAND):
CRITICAL ENGINEERING PRINCIPLE:
- NO BATTERY
- NO ESP32 OR MICROCONTROLLER
- NO WI-FI OR BLUETOOTH RADIO
- NO EMBEDDED ELECTRONIC GAS SENSOR

Components:
(1) Passive H2S Chemical Strip (Primary Sensing Element - metal salt reagent)
(2) Printed Reference Colour Scale (CMYK calibration swatches for camera normalization)
(3) Validity / Shelf-Life Indicator (Separate baseline integrity check)
(4) Unique QR / Badge ID (Immutable link to worker gate pass and shift records)
(5) Adjustable Wrist Strap (Silicone/polymer industrial enclosure)
(6) Protective Sensing Window (Permeable to ambient gas, protective against grease)

3. 10-STAGE COMPUTATIONAL VISION PIPELINE:
01. Passive H2S Chemical Exposure
02. Chemical Colorimetric Darkening (Precipitate formation)
03. Printed Reference Calibration Swatches
04. Smartphone High-Res Optical Capture
05. Image Quality & Glare Validation (Laplacian check)
06. Lighting & White Balance Normalization (Removes sodium-vapor casts)
07. CIELAB Color Feature Extraction (Delta-E distance calculation)
08. Micro-Climate Temperature & Humidity Correction
09. Non-linear Chemometric Dose Regression
10. Immutable Shift Compliance Dossier (OISD-114 / DGMS / ISO-45001)

Certified by Health, Safety & Environment Division
Mangalore Refinery and Petrochemicals Limited (MRPL)
`;

    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'SulfiTrack_Passive_H2S_Dosimeter_Whitepaper_v4.2.txt');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3500);
  };

  return (
    <div className="flex flex-col w-full gap-5 pb-16 animate-fadeIn">
      {/* Top Navigation Back Action */}
      <div className="flex items-center justify-between pb-1">
        <button
          ref={backBtnRef}
          id="how-it-works-back-btn"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 border border-slate-200 transition-colors cursor-pointer text-xs font-semibold"
          onClick={onBack}
          title="Back to landing screen"
        >
          <span className="material-symbols-outlined text-[16px]">arrow_back</span>
          <span>Back to Home</span>
        </button>
        <span className="font-mono text-slate-500 text-xs">
          {REFINERY_FACILITY.name} · System Architecture
        </span>
      </div>

      {/* System Architecture Card */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col gap-4 shadow-sm border border-slate-800 relative overflow-hidden">
        <div className="absolute -right-8 -bottom-8 w-48 h-48 rounded-full bg-orange-600/10 pointer-events-none blur-2xl"></div>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="px-3 py-1 rounded-full bg-orange-600/20 text-orange-400 font-mono font-bold text-xs border border-orange-500/30">
            SYSTEM ARCHITECTURE & PROTOCOL
          </span>
          <span className="font-mono text-slate-400 text-xs">v4.2-STABLE · MRPL ENGINEERING SPEC</span>
        </div>
        <h1 className="text-2xl sm:text-3xl text-white font-extrabold tracking-tight">
          How Passive Dosimetry & SpectroCV Work
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
          Unlike instantaneous electronic sniffer alarms, SulfiTrack calculates <strong>cumulative shift exposure (ppm·h)</strong>. 
          The wearable dosimeter requires <strong>no internal battery, no microcontroller, and no wiring</strong>. 
          All complex optical normalization and non-linear chemical kinetics are handled by the smartphone camera reading after exposure.
        </p>

        {/* Core Breakthrough Callout Box */}
        <div className="mt-2 p-4 bg-slate-950/80 rounded-xl border border-orange-500/30 text-xs text-orange-300 font-mono leading-relaxed">
          <strong className="text-white block mb-1">HARDWARE GROUNDING:</strong>
          FINAL WRISTBAND: NO BATTERY • NO ESP32 • NO DISPLAY • NO ELECTRONIC H₂S SENSOR.
          Smartphone camera + AI perform the digital reading after exposure.
        </div>
      </div>

      {/* Hardware Schematic Engineering Diagram */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <span className="px-2 py-0.5 rounded bg-orange-100 text-orange-800 text-[11px] font-mono font-bold">
              OFFICIAL HARDWARE SPECIFICATION
            </span>
            <h2 className="text-lg font-bold text-slate-900 mt-1">Dosimeter Wristband Hardware Breakdown</h2>
          </div>
          <span className="text-xs text-slate-500 font-mono">
            Source: SulfiTrack Mechanical & Chemical Stack
          </span>
        </div>

        <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-50 p-2 shadow-inner">
          <img
            src="/SulfiTrack_Wristband_Hardware_Breakdown.jpg"
            alt="Official SulfiTrack passive H2S dosimeter wristband hardware breakdown schematic"
            className="w-full h-auto object-contain rounded-lg"
          />
        </div>

        <div className="mt-4 p-3.5 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 leading-relaxed">
          <strong>Engineering Note:</strong> The exact sensing chemistry, substrate stack, protective membrane, and validity chemistry are calibrated through controlled laboratory chambers and empirical exposure standards. Smartphone computer vision maps the Delta-E shift against validated baseline curves.
        </div>
      </div>

      {/* Visual Processing Pipeline (10 STAGES) */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between px-1">
          <div>
            <span className="font-mono text-xs text-slate-500 font-bold uppercase tracking-wider">
              SpectroCV Visual Processing Pipeline
            </span>
            <h2 className="text-base font-bold text-slate-900">10-Stage Exposure Quantification</h2>
          </div>
          <span className="font-mono text-orange-700 bg-orange-50 border border-orange-200 px-3 py-1 rounded-full font-bold text-xs">
            10 STAGES
          </span>
        </div>

        <div className="flex flex-col gap-3">
          {PIPELINE_STAGES.map((stage) => {
            const isFinal = stage.num === '10';
            return (
              <div
                key={stage.num}
                className="bg-white rounded-2xl p-4.5 flex items-start gap-4 shadow-sm relative border border-slate-200"
              >
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center font-mono flex-shrink-0 font-bold text-xs ${
                    isFinal
                      ? 'bg-orange-600 text-white shadow-md shadow-orange-950/20'
                      : 'bg-slate-900 text-white'
                  }`}
                >
                  {stage.num}
                </div>
                <div className="flex flex-col gap-1 min-w-0 flex-grow">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-900 font-bold">
                      {stage.title}
                    </span>
                    <span className="material-symbols-outlined text-orange-600 text-[20px]">
                      {stage.icon}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{stage.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Digital Safety Record & Whitepaper Download Card */}
      <div className="bg-white rounded-2xl p-6 flex flex-col gap-4 shadow-sm border border-slate-200">
        <div className="flex items-center gap-2.5 text-orange-600">
          <span className="material-symbols-outlined text-[24px]">verified_user</span>
          <div>
            <h2 className="text-base font-bold text-slate-900">Immutable Industrial EHS Compliance</h2>
            <p className="text-xs text-slate-500">Adhering to OISD-114, DGMS, and The Factories Act, 1948</p>
          </div>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Every completed dosimeter scan cryptographically seals the operator badge ID, refinery unit code, 
          ambient weather telemetry, and computed Delta-E chromatic coordinates into the plant EHS register, 
          guaranteeing total transparency during factory inspectorate safety audits.
        </p>

        {downloaded && (
          <div className="p-3.5 bg-emerald-50 text-emerald-900 rounded-xl text-xs font-semibold flex items-center gap-2 border border-emerald-200 animate-fadeIn">
            <span className="material-symbols-outlined text-[18px] text-emerald-600">check_circle</span>
            <span>Technical Protocol Whitepaper v4.2 downloaded to your local device.</span>
          </div>
        )}

        <button
          id="download-whitepaper-btn"
          type="button"
          className="w-full h-12 bg-orange-600 text-white rounded-xl font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 active:scale-[0.99] transition-all hover:bg-orange-700 cursor-pointer shadow-sm shadow-orange-950/20"
          onClick={handleDownloadWhitepaper}
        >
          <span className="material-symbols-outlined text-[18px]">download</span>
          <span>Download Engineering Specification & Whitepaper</span>
        </button>
      </div>
    </div>
  );
};
