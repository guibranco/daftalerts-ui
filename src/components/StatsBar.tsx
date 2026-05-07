import React from 'react';
import { useTranslation } from 'react-i18next';
import { Stats } from '../types/property';
import { Card } from './ui/card';
import { formatPrice } from '../lib/format';
import { TrendingUp, BarChart3, PieChart } from 'lucide-react';

interface StatsBarProps {
  stats?: Stats;
}

export function StatsBar({ stats }: StatsBarProps) {
  const { t } = useTranslation();

  if (!stats) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Card className="p-4 flex items-center gap-4 bg-primary/5 border-primary/10">
        <div className="p-2 bg-primary/10 rounded-lg text-primary">
          <PieChart className="w-5 h-5" />
        </div>
        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{t('nav.approved')}</p>
          <p className="text-2xl font-bold">{stats.approvedCount}</p>
        </div>
      </Card>
      
      <Card className="p-4 flex items-center gap-4">
        <div className="p-2 bg-accent/10 rounded-lg text-accent-dark">
          <TrendingUp className="w-5 h-5" />
        </div>
        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Avg. Price</p>
          <p className="text-2xl font-bold">{formatPrice(stats.avgApprovedPrice)}</p>
        </div>
      </Card>

      <Card className="p-4 flex items-center gap-4">
        <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
          <BarChart3 className="w-5 h-5" />
        </div>
        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Median Price</p>
          <p className="text-2xl font-bold">{formatPrice(stats.medianApprovedPrice)}</p>
        </div>
      </Card>

      <Card className="p-4 flex items-center gap-4">
        <div className="p-2 bg-orange-100 rounded-lg text-orange-600">
          <PieChart className="w-5 h-5" />
        </div>
        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Inbox</p>
          <p className="text-2xl font-bold">{stats.inboxCount}</p>
        </div>
      </Card>
    </div>
  );
}
