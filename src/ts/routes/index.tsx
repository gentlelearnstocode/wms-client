import { useRoutes } from 'react-router-dom';

import { protectedRoutes } from './protected-routes';
import { publicRoutes } from './public-routes';
import MainLayout from '../layouts/MainLayout';
import { useAuthData } from '../auth';
import { storage } from '@utils/storage';

export const MainRoutes = () => {
  const user = useAuthData() || storage.getStorage('userData');
  const route = user ? (
    <MainLayout authInfo={user}>{useRoutes(protectedRoutes)}</MainLayout>
  ) : (
    useRoutes(publicRoutes)
  );

  return <>{route}</>;
};
