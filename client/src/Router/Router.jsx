import { createBrowserRouter } from 'react-router';
import Root from '../Layout/Root/Root';
import Home from '../Pages/Home/Home';
import AdminLogin from '../Pages/AdminLogin/AdminLogin';
import PrivateRoute from './PrivateRoute';
import AdminRoot from '../Layout/Admin/AdminRoot';
import Statistics from '../components/Admin/Statistics/Statistics';
import AllProducts from '../Pages/Adnin/AllProducts/AllProducts';
import AddProduct from '../Pages/Adnin/AddProduct/AddProduct';
import Order from '../Pages/Adnin/Order/Order';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      {
        index: true,
        Component: Home,
      },

      {
        path: '/admin-login',
        Component: AdminLogin,
      },
    ],
  },
  {
    path: '/admin',
    element: (
      <PrivateRoute>
        <AdminRoot></AdminRoot>
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        Component: Statistics,
      },
      {
        path: '/admin/all-products',
        Component: AllProducts,
      },
      {
        path: '/admin/add-product',
        Component: AddProduct,
      },
      {
        path: '/admin/orders',
        Component: Order,
      },
    ],
  },
]);
