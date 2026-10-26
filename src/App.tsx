import React, { useState, useEffect, useCallback } from 'react';
import { ScreenId, ExposureRecord, WorkerTelemetry, ScanContextData } from './types';
import { INITIAL_EXPOSURE_RECORDS, WORKER_TELEMETRY_LIST, CURRENT_SAFETY_OFFICER } from './data/mockData';
import { api } from './services/api';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { LandingScreen } from './screens/LandingScreen';
import { ScanScreen } from './screens/ScanScreen';
import { AnalysisScreen } from './screens/AnalysisScreen';
import { ResultScreen } from './screens/ResultScreen';
import { WorkerProfileScreen } from './screens/WorkerProfileScreen';
import { DashboardScreen } from './screens/DashboardScreen';
import { ReportScreen } from './screens/ReportScreen';
import { HowItWorksScreen } from './screens/HowItWorksScreen';
import { HistoryScreen } from './screens/HistoryScreen';

const DEFAULT_SCAN_CONTEXT: ScanContextData = {
  imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCRcQitauIBBmBNkxwZV2N7bT1S6bnhk2ERfey9nsdsqH8_1PcLFbLSOTxpVp3NXDeeCYs9xB6tkoxTzxXqm89Wk5uqzK0oiVMusUAxZxiQ9IE4vD0eLAa3gtXfYuwTzzfoAOSuM-Rv8ZEBhYwkjWey69kHvy4Z4v-M8i1ngUNYE3e_7gduRx3Iu59J-bp1o9dgj3DSzFzmu4-GxEGng1nyRTggw4-9u9O8wvGir2_rXsrWNKU8rhJAoA',
  sampledRgb: { r: 217, g: 119, b: 6 },
  badgeId: 'ST-WB-00124',
  workerId: 'WRK-1048',
  workerName: 'Rajesh Kumar',
  department: 'Hydrocracker Unit (HCU-2)',
  shift: 'Evening (Shift B)',
  tempC: 31.0,
  humidityRH: 64
};

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('landing');
  const [historyStack, setHistoryStack] = useState<ScreenId[]>(['landing']);
  const [records, setRecords] = useState<ExposureRecord[]>(INITIAL_EXPOSURE_RECORDS);
  const [workers, setWorkers] = useState<WorkerTelemetry[]>(WORKER_TELEMETRY_LIST);
  const [selectedWorkerId, setSelectedWorkerId] = useState<string>('WRK-1048');
  const [scanContext, setScanContext] = useState<ScanContextData>(DEFAULT_SCAN_CONTEXT);

  // Fetch initial records and workers from backend API
  const refreshData = useCallback(async () => {
    try {
      const [fetchedRecords, fetchedWorkers] = await Promise.all([
        api.getRecords(),
        api.getWorkers()
      ]);
      if (fetchedRecords && fetchedRecords.length > 0) {
        setRecords(fetchedRecords);
      }
      if (fetchedWorkers && fetchedWorkers.length > 0) {
        setWorkers(fetchedWorkers);
      }
    } catch (err) {
      console.warn('[App] Backend sync error, maintaining cached state:', err);
    }
  }, []);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  // Sync with browser history / hash
  useEffect(() => {
    const handlePopState = () => {
      const hash = window.location.hash.replace('#', '') as ScreenId;
      if (hash && ['landing', 'scan', 'analysis', 'result', 'workers', 'dashboard', 'report', 'how-it-works', 'history'].includes(hash)) {
        setCurrentScreen(hash);
      } else {
        setHistoryStack((prev) => {
          if (prev.length > 1) {
            const nextStack = [...prev];
            nextStack.pop();
            const prevScreen = nextStack[nextStack.length - 1];
            setCurrentScreen(prevScreen);
            return nextStack;
          }
          setCurrentScreen('landing');
          return ['landing'];
        });
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (screen: ScreenId) => {
    setHistoryStack((prev) => [...prev, screen]);
    setCurrentScreen(screen);
    window.history.pushState({ screen }, '', `#${screen}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    if (historyStack.length > 1) {
      const nextStack = [...historyStack];
      nextStack.pop();
      const prevScreen = nextStack[nextStack.length - 1];
      setHistoryStack(nextStack);
      setCurrentScreen(prevScreen);
      window.history.back();
    } else {
      setCurrentScreen('landing');
      setHistoryStack(['landing']);
    }
  };

  const handleStartAnalysis = (context: ScanContextData) => {
    setScanContext(context);
    setSelectedWorkerId(context.workerId);
  };

  const handleUpdateAnalysisResult = (result: any) => {
    setScanContext((prev) => ({
      ...prev,
      analysisResult: result
    }));
  };

  const handleSaveExposureRecord = (savedRecord?: ExposureRecord) => {
    if (savedRecord) {
      setRecords((prev) => [savedRecord, ...prev.filter((r) => r.id !== savedRecord.id)]);
    }
    refreshData();
  };

  const handleResetDemo = () => {
    setRecords(INITIAL_EXPOSURE_RECORDS);
    setWorkers(WORKER_TELEMETRY_LIST);
    setScanContext(DEFAULT_SCAN_CONTEXT);
    refreshData();
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* Top Header */}
      <Header
        currentScreen={currentScreen}
        onNavigate={navigateTo}
        onBack={handleBack}
        onResetDemo={handleResetDemo}
      />

      {/* Main Screen Content Container */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 pt-20 pb-20">
        {currentScreen === 'landing' && <LandingScreen onNavigate={navigateTo} />}

        {currentScreen === 'scan' && (
          <ScanScreen
            onNavigate={navigateTo}
            onStartAnalysis={handleStartAnalysis}
            currentWorkers={workers}
          />
        )}

        {currentScreen === 'analysis' && (
          <AnalysisScreen
            onNavigate={navigateTo}
            onBack={handleBack}
            scanContext={scanContext}
            onUpdateAnalysisResult={handleUpdateAnalysisResult}
          />
        )}

        {currentScreen === 'result' && (
          <ResultScreen
            onNavigate={navigateTo}
            onBack={handleBack}
            scanContext={scanContext}
            onSaveRecord={handleSaveExposureRecord}
          />
        )}

        {currentScreen === 'workers' && (
          <WorkerProfileScreen
            onNavigate={navigateTo}
            onBack={handleBack}
            workerId={selectedWorkerId}
            onSelectWorker={setSelectedWorkerId}
            workers={workers}
          />
        )}

        {currentScreen === 'dashboard' && (
          <DashboardScreen
            onNavigate={navigateTo}
            onSelectWorker={setSelectedWorkerId}
            workers={workers}
          />
        )}

        {currentScreen === 'report' && (
          <ReportScreen
            onNavigate={navigateTo}
            onBack={handleBack}
            workerId={selectedWorkerId}
            workers={workers}
          />
        )}

        {currentScreen === 'how-it-works' && (
          <HowItWorksScreen onNavigate={navigateTo} onBack={handleBack} />
        )}

        {currentScreen === 'history' && (
          <HistoryScreen onNavigate={navigateTo} records={records} />
        )}
      </main>

      {/* Persistent Bottom Navigation */}
      <BottomNav currentScreen={currentScreen} onNavigate={navigateTo} />
    </div>
  );
}
