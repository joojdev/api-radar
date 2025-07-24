import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import './icons/library.ts';
import './fonts/fonts.css';
import { AppContextProvider } from './hooks/useAppContext.tsx';

createRoot(document.getElementById('root')!).render(<AppContextProvider><App /></AppContextProvider>);