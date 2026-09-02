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
  badgeId: string;
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
}

export interface WorkerTelemetry {
  workerId: string;
  workerName: string;
  badgeId: string;
  shift: string;
  estimatedDose: string;
  temp: string;
  humidity: string;
  status: 'Normal' | 'Elevated' | 'Invalid';
  lastScan: string;
}
