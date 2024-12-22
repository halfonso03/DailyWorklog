import { createBrowserRouter, Navigate, RouteObject } from 'react-router-dom';
// import Home from '../pages/Home';
import App from '../app/layout/App';
import Dashboard from '../pages/Dashboard';
import Projects from '../pages/Projects';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <App></App>,
    children: [
      {
        index: true,
        element: <Navigate replace to="dashboard" />,
      },
      {
        path: '/dashboard',
        element: <Dashboard></Dashboard>,
      },
      {
        path: '/projects',
        element: <Projects></Projects>,
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
