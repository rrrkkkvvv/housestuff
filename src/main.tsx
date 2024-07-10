import React from 'react';
import ReactDOM from 'react-dom/client';
 import './index.css';
import ThemesContextProvider from './contexts/theme-context.tsx';
 import LoginContextProvider from './contexts/login-context.tsx';

import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';
import ErrorPage from './features/ErrorPage';
import App from './App.tsx';
import AdminPanel from './features/AdminPanel';

import { Provider } from 'react-redux'; 
import { store } from './store/store.ts';


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
               <ThemesContextProvider>
                <Provider store={store}>
                  <RouterProvider router={router} />
                </Provider>
              </ThemesContextProvider>
          </LoginContextProvider>
   </React.StrictMode>
);
