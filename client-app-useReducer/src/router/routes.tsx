import { createBrowserRouter, Navigate, RouteObject } from 'react-router-dom';
// import Home from '../pages/Home';
import App from '../app/layout/App';
import Dashboard from '../pages/Dashboard';
import Projects from '../pages/Projects';
import Tasks from '../pages/Tasks';

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
      {
        path: '/tasks/:year/:month',
        element: <Tasks></Tasks>,
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
