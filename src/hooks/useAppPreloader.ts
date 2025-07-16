import { useEffect } from 'react';
import { universityService } from '../services/universityService';

/**
 * Hook to preload critical data when the app starts
 * This ensures universities are available instantly when users reach the form
 */
export function useAppPreloader() {
  useEffect(() => {
    // Start preloading universities immediately when app loads
    const startPreloading = async () => {
      try {
        console.log('🚀 Starting app preloader...');
        
        // Preload universities in background
        const startTime = Date.now();
        const universities = await universityService.getAllUniversities();
        const loadTime = Date.now() - startTime;
        
        console.log(`✅ Preloaded ${universities.length} universities in ${loadTime}ms`);
        
        // Preload other critical data here in the future
        // - User preferences
        // - App configuration
        // - Feature flags
        
      } catch (error) {
        console.error('❌ App preloader failed:', error);
      }
    };

    startPreloading();
  }, []);
}

/**
 * Hook to get loading status for UI feedback
 */
export function usePreloadingStatus() {
  const isLoading = universityService.isLoadingUniversities();
  const loadedCount = universityService.getLoadedCount();
  
  return {
    isLoading,
    loadedCount,
    isReady: loadedCount > 0
  };
}
