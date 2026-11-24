import { useState, useEffect, useCallback } from 'react';
import { TreePine, RefreshCw } from 'lucide-react';
import type { Tree, Stats } from './types';
import MetricCards from './components/MetricCards';
import MapView from './components/MapView';
import AuditModal from './components/AuditModal';

export default function App() {
  const [trees, setTrees] = useState<Tree[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [showAudit, setShowAudit] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [treesRes, statsRes] = await Promise.all([
        fetch('/api/trees'),
        fetch('/api/stats'),
      ]);
      const treesData = await treesRes.json();
      const statsData = await statsRes.json();
      setTrees(treesData);
      setStats(statsData);
    } catch (e) {
      console.error('Failed to fetch data:', e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleWater = async (id: number) => {
    try {
      await fetch(`/api/trees/${id}/water`, { method: 'PATCH' });
      await fetchData();
    } catch (e) {
      console.error('Failed to water tree:', e);
    }
  };

  const handleInspectComplete = () => {
    setShowAudit(false);
    fetchData();
  };

  return (
    <div className="min-h-screen bg-zinc-950 p-4 md:p-6">
      {/* Header */}
      <header className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
            <TreePine className="w-7 h-7 text-emerald-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-zinc-100 tracking-tight">ArborTrack</h1>
            <p className="text-xs text-zinc-500 font-medium">Urban Sapling Monitoring System</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchData}
            disabled={loading}
            className="p-2 rounded-lg bg-zinc-800/50 border border-zinc-700/50 hover:bg-zinc-700/50 transition-all disabled:opacity-50"
            title="Refresh Data"
          >
            <RefreshCw className={`w-4 h-4 text-zinc-400 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={() => setShowAudit(true)}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium rounded-lg transition-all flex items-center gap-2 shadow-lg shadow-emerald-900/30"
          >
            <span className="text-lg leading-none">+</span> Audit Sapling
          </button>
        </div>
      </header>

      {/* Metric Cards */}
      {stats && <MetricCards stats={stats} />}

      {/* Map */}
      <div className="mt-6">
        <MapView trees={trees} onWater={handleWater} />
      </div>

      {/* Audit Modal */}
      {showAudit && (
        <AuditModal onClose={() => setShowAudit(false)} onComplete={handleInspectComplete} />
      )}
    </div>
  );
}
