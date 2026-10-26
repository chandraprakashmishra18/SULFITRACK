import { Router, Request, Response } from 'express';
import { db } from '../db';
import { ExposureRecord } from '../../src/types';

export const recordsRouter = Router();

// GET /api/records - Query all exposure records
recordsRouter.get('/', (req: Request, res: Response) => {
  try {
    const { search, workerId, status, department, shift } = req.query;
    const records = db.getRecords({
      search: search as string,
      workerId: workerId as string,
      status: status as string,
      department: department as string,
      shift: shift as string
    });
    res.json({
      success: true,
      count: records.length,
      data: records
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/records/:id - Get single record
recordsRouter.get('/:id', (req: Request, res: Response) => {
  try {
    const record = db.getRecordById(req.params.id);
    if (!record) {
      res.status(404).json({ success: false, error: 'Record not found' });
      return;
    }
    res.json({ success: true, data: record });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/records - Create and persist a new exposure record
recordsRouter.post('/', (req: Request, res: Response) => {
  try {
    const body = req.body;
    if (!body.workerName || !body.exposure || body.exposureValue === undefined) {
      res.status(400).json({
        success: false,
        error: 'workerName, exposure, and exposureValue are required fields'
      });
      return;
    }

    const newRecord: ExposureRecord = {
      id: body.id || `REC-${Math.floor(1000 + Math.random() * 9000)}`,
      workerId: body.workerId || 'WRK-1048',
      workerName: body.workerName,
      badgeId: body.badgeId || 'ST-WB-00124',
      department: body.department || 'Hydrocracker Unit (HCU-2)',
      shift: body.shift || 'Evening (Shift B: 14:00 - 22:00)',
      exposure: body.exposure,
      exposureValue: Number(body.exposureValue),
      environment: body.environment || '31.0°C / 64% RH',
      temp: body.temp || '31.0°C',
      humidity: body.humidity || '64% RH',
      confidence: body.confidence || '95.2%',
      status: body.status || (Number(body.exposureValue) >= 10.0 ? 'Critical' : Number(body.exposureValue) >= 5.0 ? 'Warning' : 'Safe'),
      timestamp: body.timestamp || `${new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })} - Just now IST`,
      colorHex: body.colorHex || '#d97706',
      textColorHex: body.textColorHex || '#ffffff',
      rgb: body.rgb || 'R: 217 G: 119 B: 6',
      deltaE: body.deltaE || '2.84',
      date: body.date || `${new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}, Just now`,
      supervisor: body.supervisor || 'Er. Vikramaditya Sharma'
    };

    const saved = db.createRecord(newRecord);

    // Also log to scan audit
    db.logScan({
      id: `SCN-${Date.now().toString().slice(-4)}`,
      timestamp: newRecord.timestamp,
      badgeId: newRecord.badgeId,
      workerId: newRecord.workerId || 'WRK-1048',
      workerName: newRecord.workerName,
      exposurePPMh: newRecord.exposureValue,
      status: newRecord.status,
      deltaE: parseFloat(newRecord.deltaE) || 2.84,
      confidence: newRecord.confidence,
      ambientTemp: newRecord.temp,
      ambientHumidity: newRecord.humidity,
      deviceCamera: body.deviceCamera || 'Optical Dosimeter Scanner (SpectroCV v4.2)'
    });

    res.status(201).json({
      success: true,
      message: 'Exposure dossier committed to persistent safety database',
      data: saved
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// DELETE /api/records/:id - Delete record
recordsRouter.delete('/:id', (req: Request, res: Response) => {
  try {
    const deleted = db.deleteRecord(req.params.id);
    if (!deleted) {
      res.status(404).json({ success: false, error: 'Record not found' });
      return;
    }
    res.json({ success: true, message: 'Record deleted' });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});
