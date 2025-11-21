import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Bus, ChevronRight, LogOut, MapPin } from 'lucide-react';
import { BusRoute } from '../App';

interface BusRoutesListProps {
  onSelectRoute: (route: BusRoute) => void;
  onLogout: () => void;
}

// Rutas reales de Manizales, Colombia
const busRoutes: BusRoute[] = [
  {
    id: '1',
    name: 'Ruta Cable - Centro',
    number: '1A',
    description: 'Cable → Plaza de Bolívar → Alcaldía',
    color: '#EF4444'
  },
  {
    id: '2',
    name: 'La Enea - Milán',
    number: '2B',
    description: 'La Enea → Av. Santander → Barrio Milán',
    color: '#3B82F6'
  },
  {
    id: '3',
    name: 'Terminal - Chipre',
    number: '3C',
    description: 'Terminal de Transportes → Centro → Chipre',
    color: '#10B981'
  },
  {
    id: '4',
    name: 'Fátima - Centro',
    number: '4D',
    description: 'Fátima → Universidad → Plaza de Bolívar',
    color: '#F59E0B'
  },
  {
    id: '5',
    name: 'Sultana - Olivares',
    number: '5E',
    description: 'La Sultana → Centro → Olivares',
    color: '#8B5CF6'
  },
  {
    id: '6',
    name: 'Palermo - Terminal',
    number: '6F',
    description: 'Palermo → Av. Paralela → Terminal',
    color: '#EC4899'
  },
  {
    id: '7',
    name: 'Versalles - La Francia',
    number: '7G',
    description: 'Versalles → Centro → La Francia',
    color: '#06B6D4'
  },
  {
    id: '8',
    name: 'Aranjuez - Fundadores',
    number: '8H',
    description: 'Aranjuez → Cable Aéreo → Fundadores',
    color: '#84CC16'
  }
];

export function BusRoutesList({ onSelectRoute, onLogout }: BusRoutesListProps) {
  return (
    <div className="h-full bg-gradient-to-br from-blue-50 to-slate-100 overflow-auto">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4 shadow-lg">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Bus className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-semibold">A Smart Bus</h1>
              <p className="text-sm text-blue-100">Rutas disponibles</p>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={onLogout}
            className="text-white hover:bg-white/20"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Salir
          </Button>
        </div>
      </div>

      {/* Routes List */}
      <div className="max-w-2xl mx-auto p-4 space-y-3">
        <div className="mb-4">
          <h2 className="text-lg text-gray-700">Selecciona una ruta</h2>
          <p className="text-sm text-gray-500">Toca una ruta para ver la ubicación en tiempo real</p>
        </div>

        {busRoutes.map((route) => (
          <Card 
            key={route.id}
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => onSelectRoute(route)}
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div 
                  className="w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: route.color }}
                >
                  <span className="text-white font-mono">{route.number}</span>
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-900 mb-1">{route.name}</h3>
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-500 line-clamp-2">{route.description}</p>
                  </div>
                </div>
                
                <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
