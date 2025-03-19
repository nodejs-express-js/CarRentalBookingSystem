import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import { BrowserRouter } from 'react-router-dom'
import RenterContextProvider from './state/RenterContextProvider.tsx'
import RenterLocationProvider from './state/RenterLocationProvider.tsx'
import RenterEachLocationContextProvider from './state/RenterEachLocationContextProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
        <RenterContextProvider>
        <RenterLocationProvider>
        <RenterEachLocationContextProvider>
        <BrowserRouter>
              <App />
        </BrowserRouter>
        </RenterEachLocationContextProvider>  
        </RenterLocationProvider>
        </RenterContextProvider>
  </StrictMode>,
)
