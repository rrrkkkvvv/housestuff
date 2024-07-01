import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './routes/App.tsx';
import './styles/index.css';
import ThemesContextProvider from './contexts/theme-context.tsx';
import PopUpContextProvider from './contexts/popUp-context.tsx';
import OrdersContextProvider from './contexts/orders-context.tsx';
import LoginContextProvider from './contexts/login-context.tsx';

import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';
import AdminPanel from './routes/AdminPanel.tsx';
import ErrorPage from './routes/ErrorPage.tsx';
 const basename = "/houseStuff-ts-port-/";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/admin",
    element: <AdminPanel />,
    errorElement: <ErrorPage />,
  }
], {basename: basename});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
       <LoginContextProvider>
        <OrdersContextProvider>
          <PopUpContextProvider>
            <ThemesContextProvider>
              <RouterProvider router={router} />
            </ThemesContextProvider>
          </PopUpContextProvider>
        </OrdersContextProvider>
      </LoginContextProvider>
   </React.StrictMode>
);
