import { Navigate } from 'react-router-dom';

import { Inventory, VideoEditor, ProductList, UserManagement, WarehouseManagement, Suppliers } from '../pages';

export const protectedRoutes = [
  {
    path: '/inventory',
    element: <Inventory />,
  },
  {
    path: '/',
    element: <Navigate to={'/inventory'} />,
  },
  {
    path: '/view-video',
    element: <VideoEditor />,
  },
  {
    path: '/product-list',
    element: <ProductList />,
  },
  {
    path: '/user-management',
    element: <UserManagement />,
  },
  {
    path: '/warehouse-management',
    element: <WarehouseManagement />,
  },
  {
    path: '/suppliers',
    element: <Suppliers />,
  },
];
