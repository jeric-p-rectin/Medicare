'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import type { DiseaseTrendEntry } from '@/types/statistics';

interface DiseaseHistogramProps {
  entry: DiseaseTrendEntry;
  colorIndex: number;
}

const COLORS = ['#C41E3A', '#E63946', '#DC143C', '#E57373', '#8B1A2E', '#FF6B6B'];

export function DiseaseHistogram({ entry, colorIndex }: DiseaseHistogramProps) {
  const barColor = COLORS[colorIndex % COLORS.length];

  // --- trend badge logic ---
  const renderTrendBadge = () => {
    const { currentCount, previousCount, percentChange } = entry;

    // No change: either both zero or same count
    if (currentCount === previousCount) {
      return (
        <Badge variant="outline" className="text-gray-500 border-gray-300 text-xs">
          — No change
        </Badge>
      );
    }

    if (previousCount === 0 && currentCount > 0) {
      // Previous was zero -- show absolute new cases, green badge
      return (
        <Badge className="bg-green-100 text-green-700 border-green-200 text-xs">
          +{currentCount} new
        </Badge>
      );
    }

    if (percentChange !== null) {
      if (percentChange > 0) {
        return (
          <Badge className="bg-red-100 text-[#C41E3A] border-red-200 text-xs">
            ↑ {percentChange}%
          </Badge>
        );
      }
      if (percentChange < 0) {
        return (
          <Badge className="bg-green-100 text-green-700 border-green-200 text-xs">
            ↓ {Math.abs(percentChange)}%
          </Badge>
        );
      }
    }

    return (
      <Badge variant="outline" className="text-gray-500 border-gray-300 text-xs">
        — No change
      </Badge>
    );
  };

  return (
    <Card className="bg-white rounded-2xl shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold text-gray-800">
            {entry.disease}
          </CardTitle>
          {renderTrendBadge()}
        </div>
        <p className="text-xs text-gray-500 mt-1">
          {entry.currentCount} case{entry.currentCount !== 1 ? 's' : ''} this month
        </p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={entry.months}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="label"
              tick={{ fontSize: 10, fill: '#6B7280' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              allowDecimals={false}
              tick={{ fontSize: 10, fill: '#6B7280' }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                borderRadius: '8px',
                border: '1px solid #E5E7EB',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              }}
            />
            <Bar dataKey="count" fill={barColor} radius={[4, 4, 0, 0]} name="Cases" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
