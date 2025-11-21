import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { ArrowLeft, Bus, Navigation, Clock } from 'lucide-react';
import { BusRoute } from '../App';

interface BusMapProps {
  route: BusRoute;
  onBack: () => void;
}

interface BusLocation {
  lat: number;
  lng: number;
  speed: number;
  lastUpdate: string;
}

export function BusMap({ route, onBack }: BusMapProps) {
  const [busLocation, setBusLocation] = useState<BusLocation>({
    lat: 5.0703,
    lng: -75.5138,
    speed: 35,
    lastUpdate: new Date().toLocaleTimeString('es-CO')
  });

  // Simular movimiento del bus
  useEffect(() => {
    const interval = setInterval(() => {
      setBusLocation(prev => ({
        lat: prev.lat + (Math.random() - 0.5) * 0.001,
        lng: prev.lng + (Math.random() - 0.5) * 0.001,
        speed: Math.floor(Math.random() * 40 + 20),
        lastUpdate: new Date().toLocaleTimeString('es-CO')
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // URL del mapa de OpenStreetMap con marcador
  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${busLocation.lng - 0.01},${busLocation.lat - 0.01},${busLocation.lng + 0.01},${busLocation.lat + 0.01}&layer=mapnik&marker=${busLocation.lat},${busLocation.lng}`;

  return (
    <div className="h-full bg-white flex flex-col">
      {/* Header */}
      <div 
        className="text-white p-4 shadow-lg"
        style={{ backgroundColor: route.color }}
      >
        <div className="max-w-2xl mx-auto">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={onBack}
            className="text-white hover:bg-white/20 mb-3 -ml-2"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver
          </Button>
          
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <span className="font-mono">{route.number}</span>
            </div>
            <div>
              <h1 className="font-semibold">{route.name}</h1>
              <p className="text-sm text-white/90">{route.description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="flex-1 relative">
        <iframe
          width="100%"
          height="100%"
          frameBorder="0"
          scrolling="no"
          marginHeight={0}
          marginWidth={0}
          src={mapUrl}
          className="absolute inset-0"
        />
      </div>

      {/* Bus Info Card */}
      <div className="p-4 bg-white border-t border-gray-200">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-4">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: route.color }}
                >
                  <Bus className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-medium">Bus en movimiento</p>
                  <p className="text-sm text-gray-500">Ruta {route.number}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-gray-500">
                    <Navigation className="w-4 h-4" />
                    <span className="text-xs">Velocidad</span>
                  </div>
                  <p className="font-medium">{busLocation.speed} km/h</p>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span className="text-xs">Actualización</span>
                  </div>
                  <p className="font-medium">{busLocation.lastUpdate}</p>
                </div>

                <div className="space-y-1">
                  <p className="text-xs text-gray-500">Coordenadas</p>
                  <p className="text-xs font-mono">
                    {busLocation.lat.toFixed(4)}, {busLocation.lng.toFixed(4)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
