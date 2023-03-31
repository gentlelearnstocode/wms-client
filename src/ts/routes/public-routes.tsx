import { Navigate } from 'react-router-dom';
import LoginPage from '../auth/components/login-form';

export const publicRoutes = [
  {
    path: '/signin',
    element: <LoginPage />,
  },
  {
    path: '/',
    element: <Navigate to={'/signin'} />,
  },
];
