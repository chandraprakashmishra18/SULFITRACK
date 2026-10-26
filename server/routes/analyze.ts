import { Router, Request, Response } from 'express';
import { analyzeDosimeter } from '../spectroEngine';

export const analyzeRouter = Router();

// POST /api/analyze - Run SpectroCV spectrophotometric analysis
analyzeRouter.post('/', async (req: Request, res: Response) => {
  try {
    const {
      rgb,
      image,
      tempC = 31.0,
      humidityRH = 64.0,
      badgeId = 'ST-WB-00124',
      workerId = 'WRK-1048',
      workerName = 'Rajesh Kumar',
      department = 'Hydrocracker Unit (HCU-2)'
    } = req.body;

    let sampleRgb = rgb;

    // If no RGB provided, default to calibrated baseline or warning level
    if (!sampleRgb || sampleRgb.r === undefined) {
      sampleRgb = { r: 217, g: 119, b: 6 }; // Default amber 10.2 PPM·h
    }

    const analysis = analyzeDosimeter({
      rgb: sampleRgb,
      tempC: Number(tempC),
      humidityRH: Number(humidityRH),
      badgeId,
      workerId,
      workerName,
      department
    });

    res.json({
      success: true,
      timestamp: new Date().toISOString(),
      metadata: {
        engine: 'SpectroCV v4.2 · Chemometric Colorimetry',
        standard: 'OISD-114 / DGMS / ISO-45001:2018',
        facility: 'MRPL Refinery Complex, Mangaluru'
      },
      worker: {
        workerId,
        workerName,
        badgeId,
        department
      },
      environmental: {
        tempC: Number(tempC),
        humidityRH: Number(humidityRH),
        kineticFactor: analysis.kineticFactor
      },
      analysis
    });
  } catch (err: any) {
    console.error('[AnalyzeRouter] Error processing analysis:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});
