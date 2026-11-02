// Declare the reset and token layers before importing component styles.
import '@moduix/react/reset.css';
import '@moduix/react/style.css';
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