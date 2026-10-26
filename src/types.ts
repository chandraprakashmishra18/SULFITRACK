export type ScreenId =
  | 'landing'
  | 'scan'
  | 'analysis'
  | 'result'
  | 'workers'
  | 'dashboard'
  | 'report'
  | 'how-it-works'
  | 'history';

export interface ExposureRecord {
  id: string;
  workerName: string;
  workerId?: string;
  badgeId: string;
  department?: string;
  shift: string;
  exposure: string;
  exposureValue: number;
  environment: string;
  temp: string;
  humidity: string;
  confidence: string;
  status: 'Safe' | 'Warning' | 'Critical';
  timestamp: string;
  colorHex: string;
  textColorHex: string;
  rgb: string;
  deltaE: string;
  date: string;
  supervisor?: string;
  imageUrl?: string;
}

export interface WorkerTelemetry {
  workerId: string;
  workerName: string;
  role: string;
  department: string;
  gatePassNo: string;
  bloodGroup: string;
  emergencyContact: string;
  medicalFitness: string;
  badgeId: string;
  shift: string;
  estimatedDose: string;
  temp: string;
  humidity: string;
  status: 'Normal' | 'Elevated' | 'Invalid';
  lastScan: string;
  shiftAvgDose?: number;
  weeklyDose?: number;
  monthlyDose?: number;
  complianceRate?: string;
}

export interface ScanContextData {
  imageUrl?: string | null;
  sampledRgb: { r: number; g: number; b: number };
  badgeId: string;
  workerId: string;
  workerName: string;
  department: string;
  shift: string;
  tempC: number;
  humidityRH: number;
  deviceSource?: 'camera' | 'upload' | 'preset';
  analysisResult?: {
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
