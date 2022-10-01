import { createBrowserRouter } from 'react-router-dom';
import { App } from './App';
import { ErrorPage } from './pages/ErrorPage';
import { IVRFLowPage } from './pages/IVRFLowPage';
import { ProductCreatePage } from './pages/ProductCreatePage';
import { ProductDeletePage } from './pages/ProductDeletePage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductUpdatePage } from './pages/ProductUpdatePage';
import { WorkingHourCreatePage } from './pages/WorkingHourCreatePage';
import { WorkingHourDeletePage } from './pages/WorkingHourDeletePage';
import { WorkingHoursPage } from './pages/WorkingHoursPage';
import { WorkingHourUpdatePage } from './pages/WorkingHourUpdatePage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '',
        element: <IVRFLowPage />
      },
      {
        path: 'products',
        children: [
          {
            path: '',
            element: <ProductsPage />,
          },
          {
            path: 'create',
            element: <ProductCreatePage />
          },
          {
            path: ':id/update',
            element: <ProductUpdatePage />
          },
          {
            path: ':id/delete',
            element: <ProductDeletePage />
          }
        ]
      },
      {
        path: 'working-hours',
        children: [
          {
            path: '',
            element: <WorkingHoursPage />,
          },
          {
            path: 'create',
            element: <WorkingHourCreatePage />
          },
          {
            path: ':id/update',
            element: <WorkingHourUpdatePage />
          },
          {
            path: ':id/delete',
            element: <WorkingHourDeletePage />
          }
        ]
      }
    ]
  },
]);
