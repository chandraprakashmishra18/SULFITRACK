import { Router, Request, Response } from 'express';
import { db } from '../db';

export const facilityRouter = Router();

// GET /api/facility - Get refinery facility context and telemetry
facilityRouter.get('/', (req: Request, res: Response) => {
  try {
    const facility = db.getFacility();
    res.json({ success: true, data: facility });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// PATCH /api/facility - Update micro-climate conditions
facilityRouter.patch('/', (req: Request, res: Response) => {
  try {
    const updated = db.updateFacility(req.body);
    res.json({ success: true, data: updated });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});
