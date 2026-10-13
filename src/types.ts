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

