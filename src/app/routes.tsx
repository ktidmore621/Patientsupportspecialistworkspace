import { createBrowserRouter } from 'react-router';
import { RootLayout } from './components/RootLayout';
import { QueueView } from './components/QueueView';
import { Cases } from './components/Cases';
import { CaseRecord } from './components/CaseRecord';

export const router = createBrowserRouter(
  [
    {
      path: '/',
      Component: RootLayout,
      children: [
        { index: true, Component: QueueView },
        { path: 'cases', Component: Cases },
        { path: 'cases/:caseId', Component: CaseRecord },
        { path: '*', Component: NotFound },
      ],
    },
  ],
  // import.meta.env.BASE_URL is '/' in dev and '/Patientsupportspecialistworkspace/' in production,
  // matching the base set in vite.config.ts. This ensures React Router navigates correctly on GitHub Pages.
  { basename: import.meta.env.BASE_URL }
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