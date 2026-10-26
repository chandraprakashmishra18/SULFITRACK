import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { db } from './db';
import { workersRouter } from './routes/workers';
import { recordsRouter } from './routes/records';
import { analyzeRouter } from './routes/analyze';
import { facilityRouter } from './routes/facility';
import { calibrationRouter } from './routes/calibration';

export const app = express();

// Enable CORS for frontend Vite development
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Body parsers with high limit for captured dosimeter camera images
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true, limit: '25mb' }));

// Request logging middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    if (req.path.startsWith('/api')) {
      console.log(`[API] ${req.method} ${req.path} -> ${res.statusCode} (${duration}ms)`);
    }
  });
  next();
});

// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  const workers = db.getWorkers();
  const records = db.getRecords();
  res.json({
    status: 'healthy',
    system: 'SulfiTrack Passive H2S Exposure Intelligence Backend',
    version: '4.2.0',
    database: {
      type: 'Persistent File-Backed Atomic Database',
      workersCount: workers.length,
      recordsCount: records.length,
      status: 'connected'
    },
    refinery: 'MRPL Refinery Complex, Mangaluru',
    timestamp: new Date().toISOString()
  });
});

// Scans audit log endpoint
app.get('/api/scans', (req: Request, res: Response) => {
  try {
    const scans = db.getScans();
    res.json({ success: true, count: scans.length, data: scans });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Demo Reset Endpoint
app.post('/api/reset-demo', (req: Request, res: Response) => {
  try {
    const fresh = db.resetToFactoryDemo();
    res.json({
      success: true,
      message: 'Database reset to factory demonstration baseline successfully',
      data: {
        workersCount: fresh.workers.length,
        recordsCount: fresh.records.length
      }
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Mount modular sub-routers
app.use('/api/workers', workersRouter);
app.use('/api/records', recordsRouter);
app.use('/api/analyze', analyzeRouter);
app.use('/api/facility', facilityRouter);
app.use('/api/calibration', calibrationRouter);

// Catch-all for API 404
app.use('/api/*', (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: `API route ${req.method} ${req.originalUrl} not found`
  });
});
