import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import { RouterProvider } from 'react-router-dom';
import { router } from './router/routes';
import LogProvider from './context/LogContextProvider';
import App from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LogProvider>
      <App>
        <RouterProvider router={router}></RouterProvider>
      </App>
    </LogProvider>
  </StrictMode>
);
