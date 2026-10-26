import fs from 'fs';
import path from 'path';
import { ExposureRecord, WorkerTelemetry } from '../src/types';
import { INITIAL_EXPOSURE_RECORDS, WORKER_TELEMETRY_LIST, REFINERY_FACILITY, CURRENT_SAFETY_OFFICER } from '../src/data/mockData';

export interface CalibrationData {
  swatches: Array<{
    ppmH: number;
    label: string;
    hexColor: string;
    rgb: { r: number; g: number; b: number };
    deltaE: number;
  }>;
  baselineColor: {
    hex: string;
    rgb: { r: number; g: number; b: number };
    lab: { L: number; a: number; b: number };
  };
  limits: {
    safeCeiling: number;
    warningCeiling: number;
    criticalFloor: number;
    shiftTwaOISD: number;
  };
  environmentalKinetics: {
    tempReferenceC: number;
    tempCoefficient: number;
    humidityReferenceRH: number;
    humidityCoefficient: number;
  };
}

export interface ScanAuditLog {
  id: string;
  timestamp: string;
  badgeId: string;
  workerId: string;
  workerName: string;
  exposurePPMh: number;
  status: 'Safe' | 'Warning' | 'Critical';
  deltaE: number;
  confidence: string;
  ambientTemp: string;
  ambientHumidity: string;
  deviceCamera: string;
  imageThumbnail?: string;
}

export interface DatabaseSchema {
  version: string;
  lastUpdated: string;
  facility: typeof REFINERY_FACILITY & {
    ambientTemp: number;
    ambientHumidity: number;
    activeShift: string;
    safetyOfficer: typeof CURRENT_SAFETY_OFFICER;
  };
  workers: WorkerTelemetry[];
  records: ExposureRecord[];
  scans: ScanAuditLog[];
  calibration: CalibrationData;
}

const DATA_DIR = path.resolve(process.cwd(), 'server', 'data');
const DB_FILE = path.join(DATA_DIR, 'database.json');
const BACKUP_FILE = path.join(DATA_DIR, 'database.json.bak');

function getDefaultCalibration(): CalibrationData {
  return {
    swatches: [
      { ppmH: 0.0, label: '0 PPM·h (Blank)', hexColor: '#f8fafc', rgb: { r: 248, g: 250, b: 252 }, deltaE: 0.0 },
      { ppmH: 2.0, label: '2.0 PPM·h (Low)', hexColor: '#e2e8f0', rgb: { r: 226, g: 232, b: 240 }, deltaE: 0.45 },
      { ppmH: 5.0, label: '5.0 PPM·h (Permissible)', hexColor: '#cbd5e1', rgb: { r: 203, g: 213, b: 225 }, deltaE: 1.25 },
      { ppmH: 10.0, label: '10.0 PPM·h (Shift Limit)', hexColor: '#d97706', rgb: { r: 217, g: 119, b: 6 }, deltaE: 2.84 },
      { ppmH: 20.0, label: '20.0 PPM·h (Severe)', hexColor: '#b45309', rgb: { r: 180, g: 83, b: 9 }, deltaE: 4.12 },
      { ppmH: 50.0, label: '50.0 PPM·h (Critical)', hexColor: '#78350f', rgb: { r: 120, g: 53, b: 15 }, deltaE: 6.85 }
    ],
    baselineColor: {
      hex: '#f5f3ec',
      rgb: { r: 245, g: 243, b: 236 },
      lab: { L: 95.8, a: -0.4, b: 3.8 }
    },
    limits: {
      safeCeiling: 5.0,
      warningCeiling: 10.0,
      criticalFloor: 10.0,
      shiftTwaOISD: 10.0
    },
    environmentalKinetics: {
      tempReferenceC: 25.0,
      tempCoefficient: 0.012,
      humidityReferenceRH: 50.0,
      humidityCoefficient: 0.003
    }
  };
}

function getDefaultData(): DatabaseSchema {
  return {
    version: '4.2.0',
    lastUpdated: new Date().toISOString(),
    facility: {
      ...REFINERY_FACILITY,
      ambientTemp: 31.0,
      ambientHumidity: 64,
      activeShift: 'Evening (Shift B: 14:00 - 22:00)',
      safetyOfficer: CURRENT_SAFETY_OFFICER
    },
    workers: JSON.parse(JSON.stringify(WORKER_TELEMETRY_LIST)),
    records: JSON.parse(JSON.stringify(INITIAL_EXPOSURE_RECORDS)),
    scans: [
      {
        id: 'SCN-101',
        timestamp: '13 Oct 2026 - 18:42 IST',
        badgeId: 'ST-WB-00124',
        workerId: 'WRK-1048',
        workerName: 'Rajesh Kumar',
        exposurePPMh: 10.2,
        status: 'Warning',
        deltaE: 2.84,
        confidence: '94.8%',
        ambientTemp: '31.0°C',
        ambientHumidity: '64% RH',
        deviceCamera: 'High-Res Optical CMOS (Back Sensor)'
      },
      {
        id: 'SCN-100',
        timestamp: '13 Oct 2026 - 13:50 IST',
        badgeId: 'ST-WB-00128',
        workerId: 'WRK-1052',
        workerName: 'Arjun Patel',
        exposurePPMh: 2.1,
        status: 'Safe',
        deltaE: 0.45,
        confidence: '98.2%',
        ambientTemp: '29.5°C',
        ambientHumidity: '70% RH',
        deviceCamera: 'SpectroCV Cam #2'
      }
    ],
    calibration: getDefaultCalibration()
  };
}

class DatabaseService {
  private cache: DatabaseSchema | null = null;
  private isWriting = false;

  constructor() {
    this.init();
  }

  private init() {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }

      if (fs.existsSync(DB_FILE)) {
        const raw = fs.readFileSync(DB_FILE, 'utf-8');
        this.cache = JSON.parse(raw);
      } else {
        const defaultData = getDefaultData();
        this.saveSync(defaultData);
        this.cache = defaultData;
      }
    } catch (err) {
      console.error('[DatabaseService] Failed to initialize DB, using fallback mock data:', err);
      this.cache = getDefaultData();
    }
  }

  private saveSync(data: DatabaseSchema) {
    data.lastUpdated = new Date().toISOString();
    const jsonStr = JSON.stringify(data, null, 2);

    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }

      // Write to temp file then rename for atomic guarantees
      const tmpFile = `${DB_FILE}.tmp`;
      fs.writeFileSync(tmpFile, jsonStr, 'utf-8');

      // Create backup if DB exists
      if (fs.existsSync(DB_FILE)) {
        try {
          fs.copyFileSync(DB_FILE, BACKUP_FILE);
        } catch {
          // ignore backup errors
        }
      }

      fs.renameSync(tmpFile, DB_FILE);
      this.cache = data;
    } catch (err) {
      console.error('[DatabaseService] Atomic write failed:', err);
      // Fallback direct write
      fs.writeFileSync(DB_FILE, jsonStr, 'utf-8');
      this.cache = data;
    }
  }

  private getData(): DatabaseSchema {
    if (!this.cache) {
      this.init();
    }
    return this.cache!;
  }

  // --- Workers ---
  public getWorkers(): WorkerTelemetry[] {
    return this.getData().workers;
  }

  public getWorkerById(workerId: string): WorkerTelemetry | undefined {
    return this.getData().workers.find((w) => w.workerId === workerId);
  }

  public createWorker(worker: WorkerTelemetry): WorkerTelemetry {
    const data = this.getData();
    const existingIndex = data.workers.findIndex((w) => w.workerId === worker.workerId);
    if (existingIndex >= 0) {
      data.workers[existingIndex] = worker;
    } else {
      data.workers.push(worker);
    }
    this.saveSync(data);
    return worker;
  }

  public updateWorker(workerId: string, updates: Partial<WorkerTelemetry>): WorkerTelemetry | null {
    const data = this.getData();
    const index = data.workers.findIndex((w) => w.workerId === workerId);
    if (index === -1) return null;
    data.workers[index] = { ...data.workers[index], ...updates };
    this.saveSync(data);
    return data.workers[index];
  }

  // --- Exposure Records ---
  public getRecords(filters?: {
    search?: string;
    workerId?: string;
    status?: string;
    department?: string;
    shift?: string;
  }): ExposureRecord[] {
    let records = this.getData().records;

    if (!filters) return records;

    if (filters.search) {
      const q = filters.search.toLowerCase();
      records = records.filter(
        (r) =>
          r.workerName.toLowerCase().includes(q) ||
          r.badgeId.toLowerCase().includes(q) ||
          r.id.toLowerCase().includes(q) ||
          (r.department && r.department.toLowerCase().includes(q))
      );
    }

    if (filters.workerId) {
      records = records.filter((r) => r.workerId === filters.workerId);
    }

    if (filters.status && filters.status !== 'All') {
      records = records.filter((r) => r.status.toLowerCase() === filters.status!.toLowerCase());
    }

    if (filters.department && filters.department !== 'All') {
      records = records.filter(
        (r) => r.department && r.department.toLowerCase().includes(filters.department!.toLowerCase())
      );
    }

    if (filters.shift && filters.shift !== 'All') {
      records = records.filter((r) => r.shift.toLowerCase().includes(filters.shift!.toLowerCase()));
    }

    return records;
  }

  public getRecordById(id: string): ExposureRecord | undefined {
    return this.getData().records.find((r) => r.id === id);
  }

  public createRecord(record: ExposureRecord): ExposureRecord {
    const data = this.getData();
    // Ensure unique ID
    if (!record.id) {
      record.id = `REC-${Math.floor(1000 + Math.random() * 9000)}`;
    }
    // Prepend new record so newest is first
    data.records.unshift(record);

    // Also update corresponding worker telemetry if found
    if (record.workerId) {
      const wIdx = data.workers.findIndex((w) => w.workerId === record.workerId);
      if (wIdx >= 0) {
        data.workers[wIdx].estimatedDose = record.exposure;
        data.workers[wIdx].lastScan = record.date || 'Just now';
        data.workers[wIdx].temp = record.temp || '31.0°C';
        data.workers[wIdx].humidity = record.humidity || '64%';
        data.workers[wIdx].status =
          record.status === 'Critical'
            ? 'Elevated'
            : record.status === 'Warning'
            ? 'Elevated'
            : 'Normal';
      }
    }

    this.saveSync(data);
    return record;
  }

  public deleteRecord(id: string): boolean {
    const data = this.getData();
    const initialLen = data.records.length;
    data.records = data.records.filter((r) => r.id !== id);
    if (data.records.length !== initialLen) {
      this.saveSync(data);
      return true;
    }
    return false;
  }

  // --- Scans Audit Log ---
  public getScans(): ScanAuditLog[] {
    return this.getData().scans;
  }

  public logScan(scan: ScanAuditLog): ScanAuditLog {
    const data = this.getData();
    data.scans.unshift(scan);
    this.saveSync(data);
    return scan;
  }

  // --- Facility ---
  public getFacility() {
    return this.getData().facility;
  }

  public updateFacility(updates: Partial<DatabaseSchema['facility']>) {
    const data = this.getData();
    data.facility = { ...data.facility, ...updates };
    this.saveSync(data);
    return data.facility;
  }

  // --- Calibration ---
  public getCalibration(): CalibrationData {
    return this.getData().calibration;
  }

  // --- Reset DB to Factory Demo State ---
  public resetToFactoryDemo(): DatabaseSchema {
    const fresh = getDefaultData();
    this.saveSync(fresh);
    return fresh;
  }
}

export const db = new DatabaseService();
