import { ExposureRecord, WorkerTelemetry } from '../types';

export const INITIAL_EXPOSURE_RECORDS: ExposureRecord[] = [
  {
    id: 'REC-9042',
    workerName: 'Marcus Vance',
    badgeId: 'BDG-8841',
    shift: 'Morning (06:00 - 14:30)',
    exposure: '1.8 PPM',
    exposureValue: 1.8,
    environment: '34.2°C / 62% RH',
    temp: '34.2°C',
    humidity: '62% RH',
    confidence: '98.4%',
    status: 'Safe',
    timestamp: 'Oct 24, 2023 - 09:14 AM',
    colorHex: '#E2E8F0',
    textColorHex: '#009668',
    rgb: 'R: 215 G: 220 B: 224',
    deltaE: '0.42',
    date: 'Oct 24, 09:14'
  },
  {
    id: 'REC-9039',
    workerName: 'Elena Rostova',
    badgeId: 'BDG-1029',
    shift: 'Morning (06:00 - 14:30)',
    exposure: '7.4 PPM',
    exposureValue: 7.4,
    environment: '38.5°C / 78% RH',
    temp: '38.5°C',
    humidity: '78% RH',
    confidence: '94.2%',
    status: 'Warning',
    timestamp: 'Oct 24, 2023 - 08:30 AM',
    colorHex: '#FDE047',
    textColorHex: '#CA8A04',
    rgb: 'R: 198 G: 180 B: 120',
    deltaE: '1.85',
    date: 'Oct 24, 08:30'
  },
  {
    id: 'REC-9011',
    workerName: 'Derrick Cole',
    badgeId: 'BDG-4402',
    shift: 'Night (22:00 - 06:30)',
    exposure: '14.2 PPM',
    exposureValue: 14.2,
    environment: '41.0°C / 85% RH',
    temp: '41.0°C',
    humidity: '85% RH',
    confidence: '91.8%',
    status: 'Critical',
    timestamp: 'Oct 23, 2023 - 11:45 PM',
    colorHex: '#F87171',
    textColorHex: '#B91C1C',
    rgb: 'R: 164 G: 110 B: 72',
    deltaE: '3.92',
    date: 'Oct 23, 23:45'
  },
  {
    id: 'REC-8988',
    workerName: 'Sarah Chen',
    badgeId: 'BDG-3310',
    shift: 'Evening (14:00 - 22:30)',
    exposure: '0.5 PPM',
    exposureValue: 0.5,
    environment: '29.1°C / 50% RH',
    temp: '29.1°C',
    humidity: '50% RH',
    confidence: '99.1%',
    status: 'Safe',
    timestamp: 'Oct 23, 2023 - 18:20 PM',
    colorHex: '#E2E8F0',
    textColorHex: '#009668',
    rgb: 'R: 228 G: 232 B: 235',
    deltaE: '0.18',
    date: 'Oct 23, 18:20'
  },
  {
    id: 'REC-8954',
    workerName: 'Javier Gomez',
    badgeId: 'BDG-9921',
    shift: 'Morning (06:00 - 14:30)',
    exposure: '6.1 PPM',
    exposureValue: 6.1,
    environment: '36.0°C / 70% RH',
    temp: '36.0°C',
    humidity: '70% RH',
    confidence: '95.5%',
    status: 'Warning',
    timestamp: 'Oct 23, 2023 - 10:15 AM',
    colorHex: '#FDE047',
    textColorHex: '#CA8A04',
    rgb: 'R: 202 G: 185 B: 130',
    deltaE: '1.45',
    date: 'Oct 23, 10:15'
  }
];

export const WORKER_TELEMETRY_LIST: WorkerTelemetry[] = [
  {
    workerId: 'W1',
    workerName: 'J. Miller',
    badgeId: 'BDG-9021',
    shift: 'Morning (A)',
    estimatedDose: '1.2 PPM',
    temp: '24.5°C',
    humidity: '45%',
    status: 'Normal',
    lastScan: '2m ago'
  },
  {
    workerId: 'W4',
    workerName: 'S. Vance',
    badgeId: 'BDG-8812',
    shift: 'Morning (A)',
    estimatedDose: '8.6 PPM',
    temp: '29.1°C',
    humidity: '62%',
    status: 'Elevated',
    lastScan: '12m ago'
  },
  {
    workerId: 'W8',
    workerName: 'A. Sterling',
    badgeId: 'BDG-7743',
    shift: 'Evening (B)',
    estimatedDose: '0.4 PPM',
    temp: '22.0°C',
    humidity: '40%',
    status: 'Normal',
    lastScan: '1m ago'
  },
  {
    workerId: 'W12',
    workerName: 'R. Kincaid',
    badgeId: 'BDG-6501',
    shift: 'Evening (B)',
    estimatedDose: '—',
    temp: '—',
    humidity: '—',
    status: 'Invalid',
    lastScan: '4h ago'
  },
  {
    workerId: 'W15',
    workerName: 'M. Chen',
    badgeId: 'BDG-9102',
    shift: 'Morning (A)',
    estimatedDose: '2.1 PPM',
    temp: '23.8°C',
    humidity: '48%',
    status: 'Normal',
    lastScan: 'Just now'
  }
];

export const PIPELINE_STAGES = [
  {
    num: '01',
    title: 'Passive H₂S Exposure',
    icon: 'sensors',
    desc: 'Badge polymer reacts continuously with ambient hydrogen sulfide gas over the monitoring shift.'
  },
  {
    num: '02',
    title: 'Chemical Colour Response',
    icon: 'palette',
    desc: 'Reactivity indicator shifts chromatic value from pale yellow toward deep metallic brown.'
  },
  {
    num: '03',
    title: 'Reference Scale',
    icon: 'straighten',
    desc: 'Integrated optical targets provide fixed chromatic calibration points during scanning.'
  },
  {
    num: '04',
    title: 'Smartphone Camera',
    icon: 'photo_camera',
    desc: 'High-resolution capture records badge sensor array under controlled framing guides.'
  },
  {
    num: '05',
    title: 'Image Quality Check',
    icon: 'verified',
    desc: 'Algorithmic validation ensures optimal focus, sharpness, and angular alignment.'
  },
  {
    num: '06',
    title: 'Lighting Correction',
    icon: 'wb_sunny',
    desc: 'White balance normalization eliminates environmental color casts from ambient plant lighting.'
  },
  {
    num: '07',
    title: 'Colour Feature Extraction',
    icon: 'colorize',
    desc: 'CIELAB color space coordinates are isolated from the active reaction matrix region.'
  },
  {
    num: '08',
    title: 'Temperature + Humidity Compensation',
    icon: 'device_thermostat',
    desc: 'Environmental sensor metadata dynamically adjusts chemical kinetic equations.'
  },
  {
    num: '09',
    title: 'AI Regression',
    icon: 'psychology',
    desc: 'Neural network maps multi-variable color shifts against validated empirical datasets.'
  },
  {
    num: '10',
    title: 'Estimated Cumulative Exposure',
    icon: 'analytics',
    desc: 'Final dosage calculation outputted in PPM-hours for compliance logging.'
  }
];
