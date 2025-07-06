import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { LoadingProvider } from "./context/LoadingContext.jsx";
import { DecksProvider } from './context/DecksContext.jsx';

createRoot(document.getElementById('root')).render(
  // Loading provider is providing loading context to every component that is present inside
  <DecksProvider>
  <LoadingProvider>
    <App />
  </LoadingProvider>
  </DecksProvider>
)
