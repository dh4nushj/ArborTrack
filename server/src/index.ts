import 'dotenv/config';
import Fastify from 'fastify';
import cors from '@fastify/cors';
import multipart from '@fastify/multipart';
import { treesRoutes } from './routes/trees.js';
import { statsRoutes } from './routes/stats.js';
import { inspectRoutes } from './routes/inspect.js';
import { seedDatabase } from './services/seed.js';

const app = Fastify({ logger: true });

async function start() {
  await app.register(cors, { origin: true });
  await app.register(multipart, { limits: { fileSize: 10 * 1024 * 1024 } });

  await app.register(treesRoutes);
  await app.register(statsRoutes);
  await app.register(inspectRoutes);

  // Health check
  app.get('/api/health', async () => ({ status: 'ok', timestamp: new Date().toISOString() }));

  // Seed the database on first startup
  await seedDatabase();

  const port = parseInt(process.env.PORT || '3001', 10);
  await app.listen({ port, host: '0.0.0.0' });
  console.log(`🌲 ArborTrack server running on http://localhost:${port}`);
}

start().catch((err) => {
  console.error(err);
  process.exit(1);
});
