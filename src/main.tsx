import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Register Service Worker for PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    console.log('🔄 Registering Service Worker...');
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('✅ SW registered successfully:', registration);
        console.log('📱 PWA functionality enabled!');
      })
      .catch((registrationError) => {
        console.error('❌ SW registration failed:', registrationError);
      });
  });
} else {
  console.log('❌ Service Workers not supported in this browser');
}

createRoot(document.getElementById("root")!).render(<App />);
