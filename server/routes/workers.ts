import { Router, Request, Response } from 'express';
import { db } from '../db';

export const workersRouter = Router();

// GET /api/workers - List all workers
workersRouter.get('/', (req: Request, res: Response) => {
  try {
    const workers = db.getWorkers();
    res.json({
      success: true,
      count: workers.length,
      data: workers
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/workers/:id - Single worker details
workersRouter.get('/:id', (req: Request, res: Response) => {
  try {
    const worker = db.getWorkerById(req.params.id);
    if (!worker) {
      res.status(404).json({ success: false, error: 'Worker not found' });
      return;
    }
    // Also include their records
    const workerRecords = db.getRecords({ workerId: req.params.id });
    res.json({
      success: true,
      data: {
        ...worker,
        records: workerRecords
      }
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/workers - Add or update worker
workersRouter.post('/', (req: Request, res: Response) => {
  try {
    const workerData = req.body;
    if (!workerData.workerId || !workerData.workerName) {
      res.status(400).json({ success: false, error: 'workerId and workerName are required' });
      return;
    }
    const saved = db.createWorker(workerData);
    res.status(201).json({ success: true, data: saved });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// PATCH /api/workers/:id - Partial update
workersRouter.patch('/:id', (req: Request, res: Response) => {
  try {
    const updated = db.updateWorker(req.params.id, req.body);
    if (!updated) {
      res.status(404).json({ success: false, error: 'Worker not found' });
      return;
    }
    res.json({ success: true, data: updated });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});
