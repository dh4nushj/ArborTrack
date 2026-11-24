import db from '../db.js';
export async function statsRoutes(app) {
    app.get('/api/stats', async (_req, reply) => {
        const total = db.prepare('SELECT COUNT(*) as count FROM trees').get().count;
        const healthy = db.prepare("SELECT COUNT(*) as count FROM trees WHERE health_status = 'Healthy'").get().count;
        const stressed = db.prepare("SELECT COUNT(*) as count FROM trees WHERE health_status = 'Stressed'").get().count;
        const dead = db.prepare("SELECT COUNT(*) as count FROM trees WHERE health_status = 'Dead'").get().count;
        const needsWater = db.prepare("SELECT COUNT(*) as count FROM trees WHERE needs_water = 1 OR health_status = 'Stressed'").get().count;
        const survivalRate = total > 0 ? Math.round(((total - dead) / total) * 1000) / 10 : 0;
        // Each young sapling sequesters ~6.3 kg CO₂ per year on average
        const alive = total - dead;
        const co2Kg = Math.round(alive * 6.3 * 10) / 10;
        return reply.send({
            total,
            healthy,
            stressed,
            dead,
            survivalRate,
            needsWater,
            co2SequestrationKg: co2Kg,
        });
    });
}
//# sourceMappingURL=stats.js.map