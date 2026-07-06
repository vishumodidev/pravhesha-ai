import { QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { queryClient } from './query/queryClient';
import './api/mockAdapter'; // Intercepts requests when VITE_USE_MOCKS is true

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
