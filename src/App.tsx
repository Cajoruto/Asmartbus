import { useState } from 'react';
import { LoginScreen } from './components/LoginScreen';
import { BusRoutesList } from './components/BusRoutesList';
import { BusMap } from './components/BusMap';
import { Toaster } from './components/ui/sonner';

export type Screen = 'login' | 'routes' | 'map';

export interface BusRoute {
  id: string;
  name: string;
  number: string;
  description: string;
  color: string;
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState<BusRoute | null>(null);

  const handleLogin = () => {
    setIsAuthenticated(true);
    setCurrentScreen('routes');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentScreen('login');
    setSelectedRoute(null);
  };

  const handleSelectRoute = (route: BusRoute) => {
    setSelectedRoute(route);
    setCurrentScreen('map');
  };

  const handleBackToRoutes = () => {
    setCurrentScreen('routes');
    setSelectedRoute(null);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      {/* Mobile device frame */}
      <div className="w-full max-w-md h-[844px] bg-white rounded-3xl shadow-2xl overflow-hidden relative">
        {currentScreen === 'login' && (
          <LoginScreen onLogin={handleLogin} />
        )}
        
        {currentScreen === 'routes' && isAuthenticated && (
          <BusRoutesList 
            onSelectRoute={handleSelectRoute}
            onLogout={handleLogout}
          />
        )}
        
        {currentScreen === 'map' && selectedRoute && (
          <BusMap 
            route={selectedRoute}
            onBack={handleBackToRoutes}
          />
        )}
      </div>
      
      <Toaster />
    </div>
  );
}
