'use client';

import { useEffect, useState, useMemo } from 'react';
import { Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DiseaseHistogram } from '@/components/statistics/disease-histogram';
import { DiseaseFilterCard } from '@/components/statistics/disease-filter-card';
import { useDiseaseFilters } from '@/hooks/useDiseaseFilters';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import type { StatisticsData, TimePeriod, DiseaseTrendsResponse } from '@/types/statistics';

const COLORS = ['#C41E3A', '#E63946', '#DC143C', '#E57373', '#8B1A2E', '#FF6B6B'];

export default function StatisticsDashboard() {
  const [timePeriod, setTimePeriod] = useState<TimePeriod>('month');
  const [data, setData] = useState<StatisticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [trendData, setTrendData] = useState<DiseaseTrendsResponse | null>(null);
  const [trendsLoading, setTrendsLoading] = useState(true);

  // Get available diseases from trend data
  const availableDiseases = useMemo(() => {
    return trendData?.trends.map(t => t.disease) || [];
  }, [trendData]);

  // Disease filter state
  const {
    selectedDiseases,
    setSelectedDiseases,
    searchQuery,
    setSearchQuery,
    filteredDiseases,
    selectAll,
    clearAll,
    toggleDisease,
  } = useDiseaseFilters(availableDiseases);

  // Calculate visible trends based on filter
  const visibleTrends = useMemo(() => {
    if (!trendData) return [];

    // If no diseases selected, show all
    if (selectedDiseases.size === 0) {
      return trendData.trends;
    }

    // Filter to selected diseases only
    return trendData.trends.filter(entry =>
      selectedDiseases.has(entry.disease)
    );
  }, [trendData, selectedDiseases]);

  useEffect(() => {
    fetchStatistics();
  }, [timePeriod]);

  useEffect(() => {
    fetchDiseaseTrends();
  }, []); // trends data is not period-dependent -- always 12 months

  const fetchStatistics = async () => {
    try {
      const response = await fetch(`/api/statistics?period=${timePeriod}`);
      if (response.ok) {
        const result = await response.json();
        setData(result);
      }
    } catch (error) {
      console.error('Error fetching statistics:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchDiseaseTrends = async () => {
    try {
      const response = await fetch('/api/statistics/disease-trends');
      if (response.ok) {
        const result = await response.json();
        setTrendData(result);
      }
    } catch (error) {
      console.error('Error fetching disease trends:', error);
    } finally {
      setTrendsLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-[#C41E3A]" />
      </div>
    );
  }

  return (
    <div className="p-8 min-h-screen bg-[#FAFAFA]">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Statistics Dashboard
        </h1>
        <Select value={timePeriod} onValueChange={(value) => setTimePeriod(value as TimePeriod)}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">Past Week</SelectItem>
            <SelectItem value="month">Past Month</SelectItem>
            <SelectItem value="quarter">Past Quarter</SelectItem>
            <SelectItem value="year">Past Year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Total Cases Summary */}
      <div className="bg-white rounded-2xl shadow-lg shadow-red-500/5 p-6 mb-8">
        <div className="text-center">
          <p className="text-lg text-gray-600 mb-2">Total Medical Cases</p>
          <div className="text-5xl font-bold bg-gradient-to-r from-[#C41E3A] to-[#E63946] bg-clip-text text-transparent">
            {data?.totalCases || 0}
          </div>
          <p className="text-sm text-gray-500 mt-2">
            {timePeriod === 'week' && 'Past Week'}
            {timePeriod === 'month' && 'Past Month'}
            {timePeriod === 'quarter' && 'Past Quarter'}
            {timePeriod === 'year' && 'Past Year'}
          </p>
        </div>
      </div>

      {data && data.diseaseBreakdown.length > 0 ? (
        <>
          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Pie Chart */}
            <Card className="bg-white rounded-2xl shadow-lg">
              <CardHeader>
                <CardTitle>Disease Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={data.diseaseBreakdown}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${percent ? (percent * 100).toFixed(0) : 0}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {data.diseaseBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Bar Chart */}
            <Card className="bg-white rounded-2xl shadow-lg">
              <CardHeader>
                <CardTitle>Cases by Category</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={data.diseaseBreakdown}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#C41E3A" name="Cases" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Line Chart */}
          <Card className="bg-white rounded-2xl shadow-lg">
            <CardHeader>
              <CardTitle>Trend Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data.trendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="cases"
                    stroke="#C41E3A"
                    strokeWidth={2}
                    dot={{ fill: '#C41E3A', r: 4 }}
                    name="Cases"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Case Summary List */}
          <Card className="mt-6 bg-white rounded-2xl shadow-lg">
            <CardHeader>
              <CardTitle>Case Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {data.diseaseBreakdown.map((disease, index) => (
                  <li key={index} className="flex items-center justify-between p-3 bg-[#FFF5F6] rounded-lg">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      />
                      <span className="font-semibold text-gray-800">{disease.name}</span>
                    </div>
                    <span className="text-gray-600">
                      {disease.value} {disease.value === 1 ? 'case' : 'cases'}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </>
      ) : (
        <Card className="bg-white rounded-2xl shadow-lg">
          <CardContent className="py-12">
            <div className="text-center text-gray-500">
              <p className="text-lg mb-2">No medical records found</p>
              <p className="text-sm">
                Statistics will appear here once medical records are added to the system.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Disease Trend Histograms */}
      <div className="mt-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Disease Trend Histograms
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          Monthly case counts for each disease over the last 12 months
        </p>

        {trendsLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-[#C41E3A]" />
          </div>
        ) : trendData && trendData.trends.length > 0 ? (
          <>
            {/* Filter Card */}
            <DiseaseFilterCard
              trends={trendData.trends}
              selectedDiseases={selectedDiseases}
              onSelectionChange={setSelectedDiseases}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              filteredDiseases={filteredDiseases}
              onSelectAll={selectAll}
              onClearAll={clearAll}
              onToggleDisease={toggleDisease}
            />

            {/* Histogram Grid */}
            {visibleTrends.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {visibleTrends.map((entry, index) => (
                  <DiseaseHistogram key={entry.disease} entry={entry} colorIndex={index} />
                ))}
              </div>
            ) : (
              <Card className="bg-white rounded-2xl shadow-lg">
                <CardContent className="py-8">
                  <div className="text-center text-gray-500">
                    <p className="text-sm">No diseases selected. Use the filter above to select diseases to view.</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </>
        ) : (
          <Card className="bg-white rounded-2xl shadow-lg">
            <CardContent className="py-8">
              <div className="text-center text-gray-500">
                <p className="text-sm">No disease data available for histograms.</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
