/**
 * SulfiTrack Central API Service
 * 
 * Provides unified REST communication with the backend Express server
 * and persistent safety database, with resilient offline-fallback.
 */

import { ExposureRecord, WorkerTelemetry } from '../types';
import { INITIAL_EXPOSURE_RECORDS, WORKER_TELEMETRY_LIST, REFINERY_FACILITY } from '../data/mockData';

const API_BASE = '/api';

export interface AnalyzeRequest {
  rgb: { r: number; g: number; b: number };
  image?: string;
  tempC?: number;
  humidityRH?: number;
  badgeId?: string;
  workerId?: string;
  workerName?: string;
  department?: string;
}

export interface AnalyzeResponse {
  success: boolean;
  timestamp: string;
  metadata: {
    engine: string;
    standard: string;
    facility: string;
  };
  worker: {
    workerId: string;
    workerName: string;
    badgeId: string;
    department: string;
  };
  environmental: {
    tempC: number;
    humidityRH: number;
    kineticFactor: number;
  };
  analysis: {
    exposureValue: number;
    exposureStr: string;
    status: 'Safe' | 'Warning' | 'Critical';
    statusColor: string;
    deltaE: number;
    deltaEStr: string;
    rawDeltaE: number;
    cielab: { L: number; a: number; b: number };
    baselineLab: { L: number; a: number; b: number };
    rgbStr: string;
    hexColor: string;
    textColorHex: string;
    kineticFactor: number;
    tempCorrection: number;
    humidityCorrection: number;
    confidence: number;
    confidenceStr: string;
    shiftTWAPercentage: number;
    pipelineStages: Array<{
      stage: number;
      name: string;
      description: string;
      status: 'pass' | 'warning' | 'fail';
    }>;
  };
}

class ApiService {
  private isOnline = true;

  constructor() {
    this.checkHealth();
  }

  public async checkHealth(): Promise<boolean> {
    try {
      const res = await fetch(`${API_BASE}/health`, { signal: AbortSignal.timeout(3000) });
      this.isOnline = res.ok;
      return res.ok;
    } catch {
      this.isOnline = false;
      return false;
    }
  }

  public getOnlineStatus(): boolean {
    return this.isOnline;
  }

  // --- Workers ---
  public async getWorkers(): Promise<WorkerTelemetry[]> {
    try {
      const res = await fetch(`${API_BASE}/workers`, { signal: AbortSignal.timeout(4000) });
      if (!res.ok) throw new Error('API error');
      const json = await res.json();
      if (json.success && json.data) {
        localStorage.setItem('sulfitrack_workers', JSON.stringify(json.data));
        return json.data;
      }
    } catch {
      // offline fallback
      const cached = localStorage.getItem('sulfitrack_workers');
      if (cached) return JSON.parse(cached);
    }
    return WORKER_TELEMETRY_LIST;
  }

  public async getWorker(id: string): Promise<WorkerTelemetry | null> {
    try {
      const res = await fetch(`${API_BASE}/workers/${id}`, { signal: AbortSignal.timeout(4000) });
      if (res.ok) {
        const json = await res.json();
        return json.data;
      }
    } catch {
      // fallback
    }
    const workers = await this.getWorkers();
    return workers.find((w) => w.workerId === id) || workers[0] || null;
  }

  // --- Records ---
  public async getRecords(filters?: {
    search?: string;
    workerId?: string;
    status?: string;
    department?: string;
    shift?: string;
  }): Promise<ExposureRecord[]> {
    try {
      const params = new URLSearchParams();
      if (filters?.search) params.append('search', filters.search);
      if (filters?.workerId) params.append('workerId', filters.workerId);
      if (filters?.status) params.append('status', filters.status);
      if (filters?.department) params.append('department', filters.department);
      if (filters?.shift) params.append('shift', filters.shift);

      const res = await fetch(`${API_BASE}/records?${params.toString()}`, {
        signal: AbortSignal.timeout(4000)
      });
      if (!res.ok) throw new Error('API error');
      const json = await res.json();
      if (json.success && json.data) {
        localStorage.setItem('sulfitrack_records', JSON.stringify(json.data));
        return json.data;
      }
    } catch {
      // offline fallback
      const cached = localStorage.getItem('sulfitrack_records');
      if (cached) return JSON.parse(cached);
    }
    return INITIAL_EXPOSURE_RECORDS;
  }

  public async createRecord(record: Partial<ExposureRecord>): Promise<ExposureRecord> {
    try {
      const res = await fetch(`${API_BASE}/records`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(record),
        signal: AbortSignal.timeout(5000)
      });
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          return json.data;
        }
      }
    } catch {
      console.warn('[ApiService] Backend save failed, storing locally');
    }

    // Local fallback save
    const newRecord: ExposureRecord = {
      id: record.id || `REC-${Math.floor(1000 + Math.random() * 9000)}`,
      workerId: record.workerId || 'WRK-1048',
      workerName: record.workerName || 'Rajesh Kumar',
      badgeId: record.badgeId || 'ST-WB-00124',
      department: record.department || 'Hydrocracker Unit (HCU-2)',
      shift: record.shift || 'Evening (Shift B: 14:00 - 22:00)',
      exposure: record.exposure || `${record.exposureValue || 10.2} PPM·h`,
      exposureValue: record.exposureValue || 10.2,
      environment: record.environment || '31.0°C / 64% RH',
      temp: record.temp || '31.0°C',
      humidity: record.humidity || '64% RH',
      confidence: record.confidence || '95.0%',
      status: record.status || 'Warning',
      timestamp: record.timestamp || `${new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })} - Just now IST`,
      colorHex: record.colorHex || '#d97706',
      textColorHex: record.textColorHex || '#ffffff',
      rgb: record.rgb || 'R: 217 G: 119 B: 6',
      deltaE: record.deltaE || '2.84',
      date: record.date || `${new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}, Just now`,
      supervisor: record.supervisor || 'Er. Vikramaditya Sharma'
    };

    const existing = JSON.parse(localStorage.getItem('sulfitrack_records') || '[]');
    const updated = [newRecord, ...existing];
    localStorage.setItem('sulfitrack_records', JSON.stringify(updated));
    return newRecord;
  }

  // --- SpectroCV Analysis ---
  public async analyze(request: AnalyzeRequest): Promise<AnalyzeResponse['analysis']> {
    try {
      const res = await fetch(`${API_BASE}/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request),
        signal: AbortSignal.timeout(6000)
      });
      if (res.ok) {
        const json: AnalyzeResponse = await res.json();
        if (json.success && json.analysis) {
          return json.analysis;
        }
      }
    } catch {
      console.warn('[ApiService] Remote analyze endpoint unreachable, executing local math engine');
    }

    // Local client-side mathematical fallback
    const { r, g, b } = request.rgb;
    const tempC = request.tempC ?? 31.0;
    const humidityRH = request.humidityRH ?? 64.0;

    // Approximate deltaE & exposure
    const deltaE = parseFloat((Math.sqrt(Math.pow(245 - r, 2) + Math.pow(243 - g, 2) + Math.pow(236 - b, 2)) / 38).toFixed(2));
    const kineticFactor = parseFloat(((1.0 + 0.012 * (tempC - 25.0)) * (1.0 + 0.003 * (humidityRH - 50.0))).toFixed(3));
    const baseDose = deltaE * 3.4;
    const exposureValue = parseFloat((baseDose * kineticFactor).toFixed(1));
    const status = exposureValue >= 10.0 ? 'Critical' : exposureValue >= 5.0 ? 'Warning' : 'Safe';
    const statusColor = status === 'Critical' ? '#ef4444' : status === 'Warning' ? '#f59e0b' : '#10b981';

    return {
      exposureValue,
      exposureStr: `${exposureValue} PPM·h`,
      status,
      statusColor,
      deltaE,
      deltaEStr: deltaE.toFixed(2),
      rawDeltaE: deltaE * 27.8,
      cielab: { L: 60, a: 15, b: 35 },
      baselineLab: { L: 95.8, a: -0.4, b: 3.8 },
      rgbStr: `R: ${r} G: ${g} B: ${b}`,
      hexColor: `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`,
      textColorHex: '#ffffff',
      kineticFactor,
      tempCorrection: 1.072,
      humidityCorrection: 1.042,
      confidence: 95.8,
      confidenceStr: '95.8%',
      shiftTWAPercentage: Math.round((exposureValue / 10.0) * 100),
      pipelineStages: []
    };
  }

  // --- Reset Demo ---
  public async resetDemo(): Promise<boolean> {
    try {
      const res = await fetch(`${API_BASE}/reset-demo`, { method: 'POST' });
      localStorage.removeItem('sulfitrack_records');
      localStorage.removeItem('sulfitrack_workers');
      return res.ok;
    } catch {
      localStorage.removeItem('sulfitrack_records');
      localStorage.removeItem('sulfitrack_workers');
      return true;
    }
  }
}

export const api = new ApiService();
