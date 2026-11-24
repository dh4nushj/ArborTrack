export interface PlantNetResult {
    species: string;
    scientific_name: string;
    confidence: number;
}
export declare function identifyPlant(imageBuffer: Buffer, filename: string, apiKey: string): Promise<PlantNetResult>;
