import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import { Droplets, Thermometer, CloudRain, Leaf, Clock } from 'lucide-react';
import type { Tree } from '../types';

interface Props {
  trees: Tree[];
  onWater: (id: number) => void;
}

const healthColor: Record<string, string> = {
  Healthy: '#22c55e',
  Stressed: '#eab308',
  Dead: '#ef4444',
};

export default function MapView({ trees, onWater }: Props) {
  const center: [number, number] =
    trees.length > 0
      ? [
          trees.reduce((s, t) => s + t.lat, 0) / trees.length,
          trees.reduce((s, t) => s + t.lng, 0) / trees.length,
        ]
      : [12.8728, 77.5802];

  return (
    <div className="glass-card rounded-xl overflow-hidden" style={{ height: '520px' }}>
      <MapContainer
        center={center}
        zoom={16}
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {trees.map((tree) => {
          const color = healthColor[tree.health_status] || '#22c55e';
          return (
            <CircleMarker
              key={tree.id}
              center={[tree.lat, tree.lng]}
              radius={10}
              pathOptions={{
                fillColor: color,
                fillOpacity: 0.7,
                color: color,
                weight: 2,
                opacity: 0.9,
              }}
            >
              <Popup>
                <div className="bg-zinc-900 text-zinc-100 rounded-lg p-3 min-w-[240px] -m-[13px] -mt-[9px]">
                  <div className="flex items-center gap-2 mb-2">
                    <Leaf className="w-4 h-4 text-emerald-400" />
                    <span className="font-semibold text-sm">{tree.species}</span>
                  </div>
                  <p className="text-[11px] text-zinc-500 italic mb-3">{tree.scientific_name}</p>

                  <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                    <div className="flex items-center gap-1.5 text-zinc-400">
                      <Thermometer className="w-3 h-3 text-orange-400" />
                      <span>{tree.temperature}°C</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-zinc-400">
                      <Droplets className="w-3 h-3 text-sky-400" />
                      <span>{tree.humidity}% RH</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-zinc-400">
                      <CloudRain className="w-3 h-3 text-blue-400" />
                      <span>{tree.rainfall_7d.toFixed(1)}mm / 7d</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-zinc-400">
                      <Clock className="w-3 h-3 text-zinc-500" />
                      <span>
                        {tree.last_watered
                          ? new Date(tree.last_watered).toLocaleDateString()
                          : 'Never watered'}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-3">
                    <span
                      className="text-[11px] font-semibold px-2 py-0.5 rounded-full"
                      style={{
                        backgroundColor: `${healthColor[tree.health_status]}20`,
                        color: healthColor[tree.health_status],
                      }}
                    >
                      {tree.health_status}
                    </span>
                    <span className="text-[11px] text-zinc-500">
                      Vitality: {tree.vitality_score}%
                    </span>
                  </div>

                  {tree.health_status !== 'Dead' && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onWater(tree.id);
                      }}
                      className="w-full py-1.5 bg-sky-600 hover:bg-sky-500 text-white text-xs font-medium rounded-md transition-all flex items-center justify-center gap-1.5"
                    >
                      <Droplets className="w-3 h-3" />
                      Dispatch Water
                    </button>
                  )}
                </div>
              </Popup>
            </CircleMarker>
          );
        })}
      </MapContainer>
    </div>
  );
}
