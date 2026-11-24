# ArborTrack — Urban Sapling Monitoring System

ArborTrack is an environmental plantation monitoring platform designed for real-time tracking, health telemetry, and maintenance of saplings across campus grounds. This deployment is localized to the RVITM Campus (Bengaluru).

## 🚀 Key Features
- **Spatial Map Telemetry:** Interactive Leaflet GIS dashboard tracking individual saplings on campus grounds.
- **Micro-Climate Telemetry:** Real-time weather, heat, and moisture indicators integrated via Open-Meteo.
- **Dynamic State Engine:** Real-time classification (`Healthy`, `Stressed`, `Dead`) with automated watering dispatch routines.
- **Audit & Identification Flow:** Form modal for registering newly audited saplings with geolocation and botanical metadata.

---

## 🛠️ Tech Stack
- **Frontend:** React, TypeScript, Leaflet / Carto Dark Tiles, Tailwind CSS, Lucide Icons
- **Backend:** Fastify, TypeScript, SQLite (`better-sqlite3`)
- **Telemetry APIs:** Open-Meteo Weather API

---

## 💻 Local Setup & Execution

### Prerequisites
- Node.js 22 (see `.node-version`)
- npm

### 1. Backend Server Setup
```bash
cd server
npm install
npm run dev
```

### 2. Frontend Client Setup
```bash
cd client
npm install
npm run dev
```

*Frontend runs at `http://localhost:5173` and backend runs at `http://localhost:3001`.*

## Deploy on Render

Create a **Web Service** from the GitHub repository and select the **Node** runtime and **Free** instance type. Use the `master` branch and leave **Root Directory** blank.

| Setting | Value |
| --- | --- |
| Build Command | `npm ci --prefix server --include=dev && npm ci --prefix client --include=dev && npm run build` |
| Start Command | `npm start` |
| Health Check Path | `/api/health` |

Set `PLANTNET_API_KEY` in Render's environment settings if you want photo-based species identification. Without a key, audits use a fallback species. Render supplies `PORT` and sets `NODE_ENV` at runtime. The Node version comes from `.node-version`.

The free instance spins down after 15 minutes of inactivity. SQLite changes, including new audits and watering records, are lost when the instance spins down, restarts, or redeploys. The app loads its sample trees when it starts with a fresh database.
