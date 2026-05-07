import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { AppShell } from './components/AppShell';
import Inbox from './routes/Inbox';
import Approved from './routes/Approved';
import Recycled from './routes/Recycled';
import Settings from './routes/Settings';
import { PropertyDetail } from './components/PropertyDetail';
import { TooltipProvider } from './components/ui/tooltip';

import { MapsKeyProvider, useMapsKey } from './hooks/useMapsKey';
import { MapsKeyModal } from './components/MapsKeyModal';
import { ApiConfigProvider } from './hooks/useApiConfig';
import { ApiConfigModal } from './components/ApiConfigModal';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function AppRoutes() {
  const location = useLocation();
  const state = location.state as { backgroundLocation?: any };

  return (
    <>
      <Routes location={state?.backgroundLocation || location}>
        <Route path="/" element={<AppShell children={<Navigate to="/inbox" replace />} />} />
        <Route path="/inbox" element={<AppShell children={<Inbox />} />} />
        <Route path="/approved" element={<AppShell children={<Approved />} />} />
        <Route path="/recycled" element={<AppShell children={<Recycled />} />} />
        <Route path="/settings" element={<AppShell children={<Settings />} />} />
        {/* Regular route for refresh stability */}
        <Route path="/property/:id" element={<AppShell children={<PropertyDetail />} />} />
      </Routes>

      {/* Show modal if backgroundLocation is present */}
      {state?.backgroundLocation && (
        <Routes>
          <Route path="/property/:id" element={<PropertyDetail />} />
        </Routes>
      )}
    </>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ApiConfigProvider>
        <MapsKeyProvider>
          <TooltipProvider>
            <HashRouter>
              <AppRoutes />
              <MapsKeyModal />
              <ApiConfigModal />
              <Toaster position="bottom-right" />
            </HashRouter>
          </TooltipProvider>
        </MapsKeyProvider>
      </ApiConfigProvider>
    </QueryClientProvider>
  );
}
