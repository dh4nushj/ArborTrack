import { useState, useRef, useCallback } from 'react';
import {
  X,
  Upload,
  MapPin,
  Loader2,
  Camera,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import type { InspectResult } from '../types';

interface Props {
  onClose: () => void;
  onComplete: () => void;
}

export default function AuditModal({ onClose, onComplete }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [lat, setLat] = useState('12.8728');
  const [lng, setLng] = useState('77.5802');
  const [loading, setLoading] = useState(false);
  const [gpsLoading, setGpsLoading] = useState(false);
  const [result, setResult] = useState<InspectResult | null>(null);
  const [error, setError] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (f: File) => {
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setError('');
    setResult(null);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const f = e.dataTransfer.files[0];
    if (f && f.type.startsWith('image/')) handleFile(f);
  }, []);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => setDragOver(false);

  const detectGPS = () => {
    setGpsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLat(pos.coords.latitude.toFixed(6));
        setLng(pos.coords.longitude.toFixed(6));
        setGpsLoading(false);
      },
      (err) => {
        setError('GPS error: ' + err.message);
        setGpsLoading(false);
      },
      { enableHighAccuracy: true }
    );
  };

  const handleSubmit = async () => {
    if (!file) {
      setError('Please upload a photo');
      return;
    }
    if (!lat || !lng) {
      setError('Please provide coordinates');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const formData = new FormData();
      formData.append('lat', lat || '12.8728');
      formData.append('lng', lng || '77.5802');
      formData.append('file', file);

      const res = await fetch('/api/inspect', { method: 'POST', body: formData });
      if (!res.ok) throw new Error('Inspection failed');
      const data: InspectResult = await res.json();
      setResult(data);
    } catch (e: any) {
      setError(e.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="glass-card rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-zinc-700/50">
          <h2 className="text-lg font-semibold text-zinc-100 flex items-center gap-2">
            <Camera className="w-5 h-5 text-emerald-400" />
            Audit Sapling
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-zinc-700/50 transition-all"
          >
            <X className="w-5 h-5 text-zinc-400" />
          </button>
        </div>

        <div className="p-4 space-y-4">
          {!result ? (
            <>
              {/* Drop Zone */}
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all
                  ${dragOver ? 'drop-zone-active' : 'border-zinc-700 hover:border-zinc-500'}
                  ${preview ? 'p-2' : ''}`}
              >
                {preview ? (
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <Upload className="w-10 h-10 text-zinc-600" />
                    <p className="text-sm text-zinc-400">
                      Drag & drop a sapling photo, or{' '}
                      <span className="text-emerald-400 font-medium">browse</span>
                    </p>
                    <p className="text-xs text-zinc-600">JPG, PNG up to 10MB</p>
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) handleFile(f);
                  }}
                />
              </div>

              {/* GPS Fields */}
              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="text-xs text-zinc-500 mb-1 block">Latitude</label>
                  <input
                    type="number"
                    step="any"
                    value={lat}
                    onChange={(e) => setLat(e.target.value)}
                    placeholder="12.8728"
                    className="w-full px-3 py-2 bg-zinc-800/50 border border-zinc-700/50 rounded-lg text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-emerald-500/50"
                  />
                </div>
                <div className="flex-1">
                  <label className="text-xs text-zinc-500 mb-1 block">Longitude</label>
                  <input
                    type="number"
                    step="any"
                    value={lng}
                    onChange={(e) => setLng(e.target.value)}
                    placeholder="77.5802"
                    className="w-full px-3 py-2 bg-zinc-800/50 border border-zinc-700/50 rounded-lg text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-emerald-500/50"
                  />
                </div>
              </div>

              <button
                onClick={detectGPS}
                disabled={gpsLoading}
                className="w-full py-2 bg-zinc-800/50 border border-zinc-700/50 rounded-lg text-sm text-zinc-300 hover:bg-zinc-700/50 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {gpsLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <MapPin className="w-4 h-4 text-emerald-400" />
                )}
                Detect Current GPS
              </button>

              {error && (
                <div className="flex items-center gap-2 text-amber-400 text-sm bg-amber-500/10 border border-amber-500/20 rounded-lg p-3">
                  <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                  {error}
                </div>
              )}

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-800 disabled:opacity-50 text-white font-medium rounded-lg transition-all flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Analyzing with AI…
                  </>
                ) : (
                  'Audit Sapling'
                )}
              </button>
            </>
          ) : (
            /* Result View */
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-emerald-400">
                <CheckCircle2 className="w-5 h-5" />
                <span className="font-semibold">Sapling Audited Successfully</span>
              </div>

              <div className="bg-zinc-800/50 rounded-xl p-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-zinc-400 text-sm">Species</span>
                  <span className="text-zinc-100 text-sm font-medium">
                    {result.diagnosis.species}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400 text-sm">Scientific Name</span>
                  <span className="text-zinc-300 text-sm italic">
                    {result.diagnosis.scientific_name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400 text-sm">AI Confidence</span>
                  <span className="text-emerald-400 text-sm font-medium">
                    {result.diagnosis.confidence}%
                  </span>
                </div>
                <hr className="border-zinc-700/50" />
                <div className="flex justify-between">
                  <span className="text-zinc-400 text-sm">Temperature</span>
                  <span className="text-orange-400 text-sm">
                    {result.diagnosis.weather.temperature}°C
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400 text-sm">7-day Rainfall</span>
                  <span className="text-blue-400 text-sm">
                    {result.diagnosis.weather.rainfall_7d.toFixed(1)} mm
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400 text-sm">Moisture Stress</span>
                  <span className="text-amber-400 text-sm">
                    {result.diagnosis.weather.moisture_stress.toFixed(1)}%
                  </span>
                </div>
                <hr className="border-zinc-700/50" />
                <div className="flex justify-between">
                  <span className="text-zinc-400 text-sm">Health Status</span>
                  <span
                    className={`text-sm font-semibold ${
                      result.diagnosis.health_status === 'Healthy'
                        ? 'text-emerald-400'
                        : result.diagnosis.health_status === 'Stressed'
                          ? 'text-amber-400'
                          : 'text-red-400'
                    }`}
                  >
                    {result.diagnosis.health_status}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400 text-sm">Vitality Score</span>
                  <span className="text-zinc-100 text-sm font-medium">
                    {result.diagnosis.vitality_score}%
                  </span>
                </div>
              </div>

              <button
                onClick={onComplete}
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-medium rounded-lg transition-all"
              >
                Done — View on Map
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
