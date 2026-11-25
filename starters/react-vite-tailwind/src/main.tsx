import '@fontsource-variable/noto-sans';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles.css';

createRoot(document.getElementById('app-root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);