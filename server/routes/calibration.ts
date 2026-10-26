import { Router, Request, Response } from 'express';
import { db } from '../db';

export const calibrationRouter = Router();

// GET /api/calibration - Get calibration scale & limits
calibrationRouter.get('/', (req: Request, res: Response) => {
  try {
    const calibration = db.getCalibration();
    res.json({ success: true, data: calibration });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});
