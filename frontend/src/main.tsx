import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import './icons/library.ts';
import './fonts/fonts.css';

createRoot(document.getElementById('root')!).render(<App />);