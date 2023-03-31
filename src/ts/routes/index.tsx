import { useRoutes } from 'react-router-dom';

import { protectedRoutes } from './protected-routes';
import { publicRoutes } from './public-routes';
import MainLayout from '../layouts/mainLayout';
import { useAuthData } from '@api/auth-api';
import storage from '../utils/storage';

export const MainRoutes = () => {
  const user = useAuthData() || storage.getStorage('userData');
  const route = user ? (
    <MainLayout children={useRoutes(protectedRoutes)} />
  ) : (
    useRoutes(publicRoutes)
  );

  return <>{route}</>;
};
