// iOS Dark Mode Handler - Fixes transparent images appearing as white squares
export function handleiOSDarkMode() {
  // Detect if we're on iOS Safari
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  const isSafari = /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);
  
  if (!isIOS || !isSafari) return;

  // Function to aggressively fix iOS dark mode image issues
  const applyiOSTransparencyFixes = () => {
    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Target all logo images and related elements
    const selectors = [
      '.logo-image',
      'img[src*="CAMPUSCONNECT"]',
      'img[class*="logo"]',
      'img[alt*="logo"]',
      'img[alt*="Campus Connect"]'
    ];
    
    selectors.forEach(selector => {
      const images = document.querySelectorAll(selector) as NodeListOf<HTMLImageElement>;
      
      images.forEach((img) => {
        if (isDarkMode) {
          // iOS Dark Mode: Force complete transparency
          img.style.setProperty('background', 'none', 'important');
          img.style.setProperty('background-color', 'transparent', 'important');
          img.style.setProperty('background-image', 'none', 'important');
          img.style.setProperty('box-shadow', 'none', 'important');
          img.style.setProperty('border', 'none', 'important');
          
          // iOS Safari specific fixes for white squares
          img.style.setProperty('-webkit-background-composite', 'source-over', 'important');
          img.style.setProperty('image-rendering', '-webkit-optimize-contrast', 'important');
          img.style.setProperty('isolation', 'isolate', 'important');
          img.style.setProperty('contain', 'paint', 'important');
          
          // Force alpha channel respect
          img.style.setProperty('-webkit-user-select', 'none', 'important');
          img.style.setProperty('user-select', 'none', 'important');
          
          // Add iOS dark mode class for CSS targeting
          img.classList.add('ios-dark-mode-fixed');
          
          // Ensure image loads with proper transparency
          if (img.complete) {
            img.style.setProperty('opacity', '1', 'important');
          } else {
            img.addEventListener('load', () => {
              img.style.setProperty('opacity', '1', 'important');
            }, { once: true });
          }
        } else {
          // iOS Light Mode: Clean up styles
          img.style.removeProperty('background');
          img.style.removeProperty('background-color');
          img.style.removeProperty('background-image');
          img.style.removeProperty('-webkit-background-composite');
          img.style.removeProperty('isolation');
          img.style.removeProperty('contain');
          
          img.classList.remove('ios-dark-mode-fixed');
        }
      });
    });
    
    // Also ensure color-scheme is properly set on document
    if (isDarkMode) {
      document.documentElement.style.setProperty('color-scheme', 'light dark', 'important');
    }
  };

  // Apply fixes immediately
  applyiOSTransparencyFixes();

  // Listen for dark mode changes
  const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
  darkModeQuery.addEventListener('change', applyiOSTransparencyFixes);

  // Apply when DOM content loads
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyiOSTransparencyFixes);
  }
  
  // Watch for dynamically added images
  const observer = new MutationObserver((mutations) => {
    let shouldApplyFixes = false;
    mutations.forEach((mutation) => {
      if (mutation.type === 'childList') {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as Element;
            if (element.tagName === 'IMG' || element.querySelector('img')) {
              shouldApplyFixes = true;
            }
          }
        });
      }
    });
    
    if (shouldApplyFixes) {
      setTimeout(applyiOSTransparencyFixes, 100);
    }
  });
  
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
  
  // Return cleanup function
  return () => {
    darkModeQuery.removeEventListener('change', applyiOSTransparencyFixes);
    observer.disconnect();
  };
}
