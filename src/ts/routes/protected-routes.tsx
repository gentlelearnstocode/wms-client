import { Navigate } from 'react-router-dom';
import { Products } from '../features/products';
import { Inventory } from '../features/inventory';
import { Users } from '../features/users';
import { Warehouse } from '../features/warehouses';
import { Suppliers } from '../features/suppliers';
import { Sales } from '../features/sales';
import { Purchases } from '../features/purchases';
import { Todo } from '../features/todo';

export const protectedRoutes = [
  {
    path: 'dashboard',
    element: <Todo />,
  },
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
    path: '/users',
    element: <Users />,
  },
  {
    path: '/warehouses',
    element: <Warehouse />,
  },
  {
    path: '/suppliers',
    element: <Suppliers />,
  },
  {
    path: '/sales',
    element: <Sales />,
  },
  {
    path: '/purchases',
    element: <Purchases />,
  },
];
