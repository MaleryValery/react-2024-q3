import { createBrowserRouter } from 'react-router-dom';
import CardDetails from '../pages/cards/CardDetails';
import NotFound from '../pages/NotFound/NotFound';
import ErrorElement from '../shared/ui/ErrorElement';
import Layout from '../shared/ui/Layout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorElement />,
    children: [
      {
        path: '/:id',
        element: <CardDetails />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
