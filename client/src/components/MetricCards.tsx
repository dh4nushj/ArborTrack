import { Trees, HeartPulse, Droplets, Wind } from 'lucide-react';
import type { Stats } from '../types';

interface Props {
  stats: Stats;
}

export default function MetricCards({ stats }: Props) {
  const cards = [
    {
      label: 'Total Monitored',
      value: stats.total,
      icon: Trees,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/20',
    },
    {
      label: 'Survival Rate',
      value: `${stats.survivalRate}%`,
      icon: HeartPulse,
      color: 'text-sky-400',
      bg: 'bg-sky-500/10',
      border: 'border-sky-500/20',
    },
    {
      label: 'Need Water',
      value: stats.needsWater,
      icon: Droplets,
      color: 'text-amber-400',
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/20',
    },
    {
      label: 'CO₂ Sequestered',
      value: `${stats.co2SequestrationKg} kg`,
      icon: Wind,
      color: 'text-violet-400',
      bg: 'bg-violet-500/10',
      border: 'border-violet-500/20',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => (
        <div key={card.label} className="glass-card rounded-xl p-4 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
              {card.label}
            </span>
            <div className={`p-1.5 rounded-lg ${card.bg} ${card.border} border`}>
              <card.icon className={`w-4 h-4 ${card.color}`} />
            </div>
          </div>
          <span className={`text-3xl font-bold ${card.color}`}>{card.value}</span>
        </div>
      ))}
    </div>
  );
}
