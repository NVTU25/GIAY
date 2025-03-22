import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import { StrictMode } from 'react';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={new QueryClient}>
        <App />
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
)
