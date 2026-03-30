import { createBrowserRouter } from 'react-router';
import { RootLayout } from './components/RootLayout';
import { QueueView } from './components/QueueView';
import { Cases } from './components/Cases';

export const router = createBrowserRouter(
  [
    {
      path: '/',
      Component: RootLayout,
      children: [
        { index: true, Component: QueueView },
        { path: 'cases', Component: Cases },
        { path: '*', Component: NotFound },
      ],
    },
  ],
  { basename: '/Patientsupportspecialistworkspace/' }
);

function NotFound() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center">
        <h1 className="mb-2">Page Not Found</h1>
        <p className="text-neutral-600">The page you're looking for doesn't exist.</p>
      </div>
    </div>
  );
}
