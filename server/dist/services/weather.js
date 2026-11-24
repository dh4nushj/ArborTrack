import { request } from 'undici';
export async function fetchWeather(lat, lng) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,relative_humidity_2m,rain&daily=precipitation_sum&timezone=auto`;
    try {
        const { body } = await request(url);
        const data = (await body.json());
        const temperature = data.current?.temperature_2m ?? 26.5;
        const humidity = data.current?.relative_humidity_2m ?? 65;
        const rain = data.current?.rain ?? 0;
        // Sum of 7-day precipitation
        const dailyPrecip = data.daily?.precipitation_sum ?? [];
        const rainfall_7d = dailyPrecip.reduce((sum, v) => sum + (v || 0), 0);
        // Soil Moisture Stress Index (0–100, higher = more stressed)
        const tempFactor = Math.max(0, (temperature - 20) * 2.5);
        const rainFactor = Math.max(0, 50 - rainfall_7d * 5);
        const humidityFactor = Math.max(0, (50 - humidity) * 0.5);
        const moisture_stress = Math.min(100, Math.max(0, (tempFactor + rainFactor + humidityFactor) / 3));
        return { temperature, humidity, rain, rainfall_7d, moisture_stress };
    }
    catch (err) {
        console.warn('Open-Meteo fetch failed, using realistic Bengaluru weather:', err);
        return {
            temperature: 26.5,
            humidity: 65,
            rain: 0,
            rainfall_7d: 14.0,
            moisture_stress: 15.0,
        };
    }
}
//# sourceMappingURL=weather.js.map