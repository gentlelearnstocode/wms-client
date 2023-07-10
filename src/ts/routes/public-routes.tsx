import { Navigate } from 'react-router-dom';
import { LoginPage } from '../auth';
export const publicRoutes = [
  {
    path: '/signin',
    element: <LoginPage />,
  },
  {
    path: '/',
    element: <Navigate to={'/signin'} />,
  },
  {
    path: '*',
    element: <Navigate to={'/signin'} />,
  },
];
