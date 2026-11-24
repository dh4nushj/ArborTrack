import { FastifyInstance } from 'fastify';
import db from '../db.js';

interface Tree {
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
  needs_water: number;
}

export async function treesRoutes(app: FastifyInstance) {
  // GET /api/trees — return all saved saplings
  app.get('/api/trees', async (_req, reply) => {
    const trees = db.prepare('SELECT * FROM trees ORDER BY id ASC').all() as Tree[];
    return reply.send(trees);
  });

  // Handler for dispatching water
  const waterHandler = async (req: any, reply: any) => {
    const { id } = req.params;
    const tree = db.prepare('SELECT * FROM trees WHERE id = ?').get(id) as Tree | undefined;

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

    const updated = db.prepare('SELECT * FROM trees WHERE id = ?').get(id) as Tree;
    return reply.send(updated);
  };

  // Support both PATCH and POST for /api/trees/:id/water
  app.patch<{ Params: { id: string } }>('/api/trees/:id/water', waterHandler);
  app.post<{ Params: { id: string } }>('/api/trees/:id/water', waterHandler);
}
