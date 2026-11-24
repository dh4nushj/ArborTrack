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
export declare const SEED_TREES: SeedTree[];
export declare function seedDatabase(): Promise<void>;
