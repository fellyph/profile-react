import { createRoot } from 'react-dom/client';
import App from './app';
import Hero3D from './hero/Hero3D';

// Render Hero3D component
const heroContainer = document.getElementById('hero-root');
if (heroContainer) {
  const heroRoot = createRoot(heroContainer);
  heroRoot.render(<Hero3D />);
}

// Render Portfolio App
const container = document.getElementById('jobs');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}
