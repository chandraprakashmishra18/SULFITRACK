import React, { useState, useEffect } from 'react';
import { ScreenId, ExposureRecord } from './types';
import { INITIAL_EXPOSURE_RECORDS } from './data/mockData';
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

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('landing');
  const [historyStack, setHistoryStack] = useState<ScreenId[]>(['landing']);
  const [records, setRecords] = useState<ExposureRecord[]>(INITIAL_EXPOSURE_RECORDS);

  // Sync with browser history / hash if user or test automation triggers history.back()
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

  const handleSaveExposureRecord = () => {
    const newRecord: ExposureRecord = {
      id: `REC-${Math.floor(1000 + Math.random() * 9000)}`,
      date: 'Oct 24, Just now',
      timestamp: 'Oct 24, 2023 - Just now',
      workerName: 'Rajesh Kumar',
      badgeId: 'ST-WB-00124',
      shift: 'Evening Shift (B)',
      exposure: '10.2 PPM',
      exposureValue: 10.2,
      environment: '31.0°C | 64%',
      temp: '31.0°C',
      humidity: '64%',
      confidence: '92.0%',
      status: 'Warning',
      colorHex: '#d97706',
      textColorHex: '#ffffff',
      rgb: 'R: 217 G: 119 B: 6',
      deltaE: '2.84'
    };

    setRecords((prev) => [newRecord, ...prev]);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* Top Header */}
      <Header
        currentScreen={currentScreen}
        onNavigate={navigateTo}
        onBack={handleBack}
      />

      {/* Main Screen Content Container */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 pt-20 pb-20">
        {currentScreen === 'landing' && <LandingScreen onNavigate={navigateTo} />}
        {currentScreen === 'scan' && <ScanScreen onNavigate={navigateTo} />}
        {currentScreen === 'analysis' && (
          <AnalysisScreen onNavigate={navigateTo} onBack={handleBack} />
        )}
        {currentScreen === 'result' && (
          <ResultScreen
            onNavigate={navigateTo}
            onBack={handleBack}
            onSaveRecord={handleSaveExposureRecord}
          />
        )}
        {currentScreen === 'workers' && (
          <WorkerProfileScreen onNavigate={navigateTo} onBack={handleBack} />
        )}
        {currentScreen === 'dashboard' && <DashboardScreen onNavigate={navigateTo} />}
        {currentScreen === 'report' && (
          <ReportScreen onNavigate={navigateTo} onBack={handleBack} />
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
