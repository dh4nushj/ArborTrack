import db from '../db.js';

export interface SeedTree {
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
  needs_water: number;
}

export const SEED_TREES: SeedTree[] = [
  // 10 Healthy saplings (vitality > 75%, moisture_stress low, needs_water: 0)
  // Dry land west/south-west (80 Feet Road & Vishwendra / Amruth Nagar area)
  {
    lat: 12.8720,
    lng: 77.5780,
    species: 'Indian Banyan',
    scientific_name: 'Ficus benghalensis',
    confidence: 94.2,
    health_status: 'Healthy',
    vitality_score: 88.5,
    moisture_stress: 15.2,
    temperature: 27.8,
    rainfall_7d: 14.2,
    humidity: 65,
    last_watered: '2026-10-19T10:00:00.000Z',
    planted_at: '2026-08-15T09:00:00.000Z',
    image_url: '',
    needs_water: 0,
  },
  {
    lat: 12.8715,
    lng: 77.5775,
    species: 'Neem',
    scientific_name: 'Azadirachta indica',
    confidence: 91.5,
    health_status: 'Healthy',
    vitality_score: 82.0,
    moisture_stress: 18.0,
    temperature: 28.1,
    rainfall_7d: 13.8,
    humidity: 63,
    last_watered: '2026-10-19T11:30:00.000Z',
    planted_at: '2026-08-18T10:00:00.000Z',
    image_url: '',
    needs_water: 0,
  },
  {
    lat: 12.8710,
    lng: 77.5782,
    species: 'Gulmohar',
    scientific_name: 'Delonix regia',
    confidence: 89.0,
    health_status: 'Healthy',
    vitality_score: 79.4,
    moisture_stress: 20.5,
    temperature: 28.0,
    rainfall_7d: 12.5,
    humidity: 62,
    last_watered: '2026-10-18T16:00:00.000Z',
    planted_at: '2026-08-20T08:30:00.000Z',
    image_url: '',
    needs_water: 0,
  },
  {
    lat: 12.8705,
    lng: 77.5770,
    species: 'Peepal',
    scientific_name: 'Ficus religiosa',
    confidence: 96.0,
    health_status: 'Healthy',
    vitality_score: 91.2,
    moisture_stress: 12.4,
    temperature: 27.6,
    rainfall_7d: 15.0,
    humidity: 67,
    last_watered: '2026-10-20T08:00:00.000Z',
    planted_at: '2026-07-10T11:00:00.000Z',
    image_url: '',
    needs_water: 0,
  },
  {
    lat: 12.8722,
    lng: 77.5765,
    species: 'Ashoka',
    scientific_name: 'Saraca asoca',
    confidence: 88.5,
    health_status: 'Healthy',
    vitality_score: 85.3,
    moisture_stress: 16.8,
    temperature: 28.2,
    rainfall_7d: 13.0,
    humidity: 64,
    last_watered: '2026-10-19T09:15:00.000Z',
    planted_at: '2026-07-25T09:30:00.000Z',
    image_url: '',
    needs_water: 0,
  },
  {
    lat: 12.8718,
    lng: 77.5772,
    species: 'Rain Tree',
    scientific_name: 'Samanea saman',
    confidence: 92.4,
    health_status: 'Healthy',
    vitality_score: 83.7,
    moisture_stress: 17.5,
    temperature: 27.9,
    rainfall_7d: 14.5,
    humidity: 66,
    last_watered: '2026-10-19T14:45:00.000Z',
    planted_at: '2026-08-01T14:00:00.000Z',
    image_url: '',
    needs_water: 0,
  },
  {
    lat: 12.8708,
    lng: 77.5768,
    species: 'Indian Almond',
    scientific_name: 'Terminalia catappa',
    confidence: 90.1,
    health_status: 'Healthy',
    vitality_score: 87.0,
    moisture_stress: 14.1,
    temperature: 28.0,
    rainfall_7d: 13.5,
    humidity: 63,
    last_watered: '2026-10-19T12:00:00.000Z',
    planted_at: '2026-08-05T10:15:00.000Z',
    image_url: '',
    needs_water: 0,
  },
  {
    lat: 12.8712,
    lng: 77.5788,
    species: 'Tamarind',
    scientific_name: 'Tamarindus indica',
    confidence: 87.8,
    health_status: 'Healthy',
    vitality_score: 80.5,
    moisture_stress: 19.2,
    temperature: 28.3,
    rainfall_7d: 12.8,
    humidity: 61,
    last_watered: '2026-10-18T15:30:00.000Z',
    planted_at: '2026-08-12T16:00:00.000Z',
    image_url: '',
    needs_water: 0,
  },
  {
    lat: 12.8702,
    lng: 77.5778,
    species: 'Mango',
    scientific_name: 'Mangifera indica',
    confidence: 93.3,
    health_status: 'Healthy',
    vitality_score: 84.1,
    moisture_stress: 15.8,
    temperature: 27.9,
    rainfall_7d: 14.0,
    humidity: 65,
    last_watered: '2026-10-20T07:45:00.000Z',
    planted_at: '2026-07-15T11:45:00.000Z',
    image_url: '',
    needs_water: 0,
  },
  {
    lat: 12.8724,
    lng: 77.5779,
    species: 'Jamun',
    scientific_name: 'Syzygium cumini',
    confidence: 91.0,
    health_status: 'Healthy',
    vitality_score: 86.8,
    moisture_stress: 13.9,
    temperature: 27.7,
    rainfall_7d: 14.8,
    humidity: 66,
    last_watered: '2026-10-20T09:00:00.000Z',
    planted_at: '2026-07-20T13:30:00.000Z',
    image_url: '',
    needs_water: 0,
  },

  // 4 Stressed saplings (health_status: 'Stressed', vitality around 40-50%, moisture_stress: 75-85%, needs_water: 1)
  {
    lat: 12.8706,
    lng: 77.5785,
    species: 'Coconut Palm',
    scientific_name: 'Cocos nucifera',
    confidence: 85.0,
    health_status: 'Stressed',
    vitality_score: 45.0,
    moisture_stress: 81.5,
    temperature: 29.5,
    rainfall_7d: 1.5,
    humidity: 44,
    last_watered: null,
    planted_at: '2026-08-25T10:00:00.000Z',
    image_url: '',
    needs_water: 1,
  },
  {
    lat: 12.8714,
    lng: 77.5762,
    species: 'Curry Leaf',
    scientific_name: 'Murraya koenigii',
    confidence: 83.2,
    health_status: 'Stressed',
    vitality_score: 42.5,
    moisture_stress: 78.0,
    temperature: 29.8,
    rainfall_7d: 1.2,
    humidity: 43,
    last_watered: null,
    planted_at: '2026-08-28T09:00:00.000Z',
    image_url: '',
    needs_water: 1,
  },
  {
    lat: 12.8709,
    lng: 77.5776,
    species: 'Jackfruit',
    scientific_name: 'Artocarpus heterophyllus',
    confidence: 86.7,
    health_status: 'Stressed',
    vitality_score: 48.0,
    moisture_stress: 76.5,
    temperature: 29.1,
    rainfall_7d: 1.8,
    humidity: 46,
    last_watered: null,
    planted_at: '2026-08-22T15:00:00.000Z',
    image_url: '',
    needs_water: 1,
  },
  {
    lat: 12.8717,
    lng: 77.5784,
    species: 'Teak',
    scientific_name: 'Tectona grandis',
    confidence: 84.5,
    health_status: 'Stressed',
    vitality_score: 44.0,
    moisture_stress: 83.2,
    temperature: 29.6,
    rainfall_7d: 1.0,
    humidity: 42,
    last_watered: null,
    planted_at: '2026-08-30T11:00:00.000Z',
    image_url: '',
    needs_water: 1,
  },

  // 1 Dead sapling (health_status: 'Dead', vitality: 0, needs_water: 0)
  {
    lat: 12.8704,
    lng: 77.5765,
    species: 'Honge (Pongamia)',
    scientific_name: 'Millettia pinnata',
    confidence: 81.0,
    health_status: 'Dead',
    vitality_score: 0.0,
    moisture_stress: 96.0,
    temperature: 30.2,
    rainfall_7d: 0.0,
    humidity: 38,
    last_watered: null,
    planted_at: '2026-07-05T08:00:00.000Z',
    image_url: '',
    needs_water: 0,
  },
];

export async function seedDatabase(): Promise<void> {
  const existing = db.prepare('SELECT COUNT(*) as count FROM trees').get() as { count: number };
  if (existing.count > 0) {
    return;
  }

  const insert = db.prepare(`
    INSERT INTO trees (
      lat, lng, species, scientific_name, confidence, health_status,
      vitality_score, moisture_stress, temperature, rainfall_7d, humidity,
      last_watered, planted_at, image_url, needs_water
    ) VALUES (
      @lat, @lng, @species, @scientific_name, @confidence, @health_status,
      @vitality_score, @moisture_stress, @temperature, @rainfall_7d, @humidity,
      @last_watered, @planted_at, @image_url, @needs_water
    )
  `);

  const seedTransaction = db.transaction((trees: SeedTree[]) => {
    for (const tree of trees) {
      insert.run(tree);
    }
  });

  seedTransaction(SEED_TREES);
  console.log(`🌱 Successfully seeded ${SEED_TREES.length} trees around RVITM campus.`);
}
