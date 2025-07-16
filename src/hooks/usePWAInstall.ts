import { useState, useEffect } from 'react';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

// Helper function to detect iOS
const isIOS = () => {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
};

// Helper function to detect if running in Safari
const isIOSSafari = () => {
  const ua = navigator.userAgent;
  return /iPad|iPhone|iPod/.test(ua) && /Safari/.test(ua) && !/Chrome|CriOS|FxiOS/.test(ua);
};

// Helper function to detect if already installed as PWA
const isRunningStandalone = () => {
  return window.matchMedia('(display-mode: standalone)').matches || 
         (window.navigator as any).standalone === true;
};

export function usePWAInstall() {
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  console.log('PWA Install Hook State:', {
    installPrompt: !!installPrompt,
    isInstallable,
    isInstalled
  });

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      console.log('🎯 PWA Install prompt available!', e);
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Store the event so it can be triggered later
      setInstallPrompt(e as BeforeInstallPromptEvent);
      setIsInstallable(true);
    };

    const handleAppInstalled = () => {
      console.log('✅ PWA App installed successfully!');
      setIsInstalled(true);
      setIsInstallable(false);
      setInstallPrompt(null);
    };

    // Check if app is already installed
    if (isRunningStandalone()) {
      console.log('📱 PWA already running in standalone mode');
      setIsInstalled(true);
      return;
    }

    // Set up PWA install listeners for standard browsers (Android, Windows, etc.)
    console.log('🔄 Setting up PWA install listeners...');
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const installApp = async () => {
    if (!installPrompt) return false;

    try {
      await installPrompt.prompt();
      const { outcome } = await installPrompt.userChoice;
      
      if (outcome === 'accepted') {
        setIsInstalled(true);
        setIsInstallable(false);
        setInstallPrompt(null);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error installing PWA:', error);
      return false;
    }
  };

  return {
    isInstallable,
    isInstalled,
    installApp,
  };
}
