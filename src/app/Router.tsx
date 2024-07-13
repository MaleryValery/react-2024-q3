import CardDetails from '@/pages/cards/CardDetails/CardDetails';
import NotFound from '@/pages/NotFound/NotFound';
import ErrorElement from '@/shared/ui/ErrorElement/ErrorElement';
import Layout from '@/shared/ui/Layout/Layout';
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorElement />,
    children: [
      {
        path: '/details/:id',
        element: <CardDetails />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default router;
