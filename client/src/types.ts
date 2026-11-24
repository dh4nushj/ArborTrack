export interface Tree {
  id: number;
  lat: number;
  lng: number;
  species: string;
  scientific_name: string;
  confidence: number;
  health_status: 'Healthy' | 'Stressed' | 'Dead';
  vitality_score: number;
  moisture_stress: number;
  temperature: number;
  rainfall_7d: number;
  humidity: number;
  last_watered: string | null;
  planted_at: string;
  image_url: string;
}

export interface Stats {
  total: number;
  healthy: number;
  stressed: number;
  dead: number;
  survivalRate: number;
  needsWater: number;
  co2SequestrationKg: number;
}

export interface InspectResult {
  tree: Tree;
  diagnosis: {
    species: string;
    scientific_name: string;
    confidence: number;
    weather: {
      temperature: number;
      humidity: number;
      rainfall_7d: number;
      moisture_stress: number;
    };
    health_status: string;
    vitality_score: number;
  };
}
