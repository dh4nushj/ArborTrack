export interface WeatherData {
    temperature: number;
    humidity: number;
    rain: number;
    rainfall_7d: number;
    moisture_stress: number;
}
export declare function fetchWeather(lat: number, lng: number): Promise<WeatherData>;
