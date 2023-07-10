import { Navigate } from 'react-router-dom';
import { Products } from '../features/products';
import { Inventory } from '../features/inventory';
import { User } from '../features/user';
import { Warehouse } from '../features/warehouse';
import { Suppliers } from '../features/suppliers';

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
    path: '/products',
    element: <Products />,
  },
  {
    path: '/user',
    element: <User />,
  },
  {
    path: '/warehouse',
    element: <Warehouse />,
  },
  {
    path: '/suppliers',
    element: <Suppliers />,
  },
];
