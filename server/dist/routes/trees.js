import db from '../db.js';
export async function treesRoutes(app) {
    // GET /api/trees — return all saved saplings
    app.get('/api/trees', async (_req, reply) => {
        const trees = db.prepare('SELECT * FROM trees ORDER BY id ASC').all();
        return reply.send(trees);
    });
    // Handler for dispatching water
    const waterHandler = async (req, reply) => {
        const { id } = req.params;
        const tree = db.prepare('SELECT * FROM trees WHERE id = ?').get(id);
        if (!tree) {
            return reply.status(404).send({ error: 'Tree not found' });
        }
        if (tree.health_status === 'Dead') {
            return reply.status(400).send({ error: 'Cannot water a dead tree' });
        }
        const now = new Date().toISOString();
        db.prepare(`
      UPDATE trees
      SET health_status = 'Healthy',
          last_watered = ?,
          vitality_score = MIN(100, MAX(80, vitality_score + 35)),
          moisture_stress = 0,
          needs_water = 0
      WHERE id = ?
    `).run(now, id);
        const updated = db.prepare('SELECT * FROM trees WHERE id = ?').get(id);
        return reply.send(updated);
    };
    // Support both PATCH and POST for /api/trees/:id/water
    app.patch('/api/trees/:id/water', waterHandler);
    app.post('/api/trees/:id/water', waterHandler);
}
//# sourceMappingURL=trees.js.map