'use client';

import { useState, useEffect } from 'react';
import { DiseaseThreshold } from '@/types/disease-threshold';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { CreateThresholdDialog } from './create-threshold-dialog';
import { EditThresholdDialog } from './edit-threshold-dialog';
import { toast } from 'sonner';
import { Plus, Edit, Trash2, Loader2, CheckCircle, XCircle } from 'lucide-react';

export function DiseaseThresholdTable() {
  const [thresholds, setThresholds] = useState<DiseaseThreshold[]>([]);
  const [existingDiseases, setExistingDiseases] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingThreshold, setEditingThreshold] = useState<DiseaseThreshold | null>(null);

  const fetchThresholds = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/disease-thresholds');
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to fetch thresholds');
      }

      setThresholds(result.thresholds);
      setExistingDiseases(result.existingDiseases);
    } catch (error: any) {
      toast.error(error.message || 'Failed to fetch thresholds');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchThresholds();
  }, []);

  const handleDelete = async (id: string, diseaseName: string) => {
    if (!confirm(`Are you sure you want to delete the threshold for ${diseaseName}?`)) {
      return;
    }

    try {
      const response = await fetch(`/api/disease-thresholds/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || 'Failed to delete threshold');
      }

      toast.success('Threshold deleted successfully');
      fetchThresholds();
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete threshold');
    }
  };

  const handleToggleActive = async (threshold: DiseaseThreshold) => {
    try {
      const response = await fetch(`/api/disease-thresholds/${threshold.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !threshold.isActive }),
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || 'Failed to update threshold');
      }

      toast.success(`Threshold ${!threshold.isActive ? 'activated' : 'deactivated'}`);
      fetchThresholds();
    } catch (error: any) {
      toast.error(error.message || 'Failed to update threshold');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-[#C41E3A]" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Disease Alert Thresholds</h2>
          <p className="text-sm text-gray-500 mt-1">
            Configure alert detection thresholds for automatic alert generation
          </p>
        </div>
        <Button
          onClick={() => setIsCreateDialogOpen(true)}
          className="bg-gradient-to-r from-[#C41E3A] to-[#E63946] text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Alert Threshold
        </Button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Disease</TableHead>
              <TableHead>Threshold (Cases/Week)</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {thresholds.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-gray-500 py-8">
                  No disease alert thresholds configured
                </TableCell>
              </TableRow>
            ) : (
              thresholds.map((threshold) => (
                <TableRow key={threshold.id}>
                  <TableCell className="font-semibold">{threshold.diseaseName}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="font-mono">
                      {threshold.casesPerWeek}
                    </Badge>
                  </TableCell>
                  <TableCell className="max-w-xs truncate text-sm text-gray-600">
                    {threshold.description || '—'}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={threshold.isActive ? 'default' : 'secondary'}
                      className={
                        threshold.isActive
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-600'
                      }
                    >
                      {threshold.isActive ? (
                        <>
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Active
                        </>
                      ) : (
                        <>
                          <XCircle className="w-3 h-3 mr-1" />
                          Inactive
                        </>
                      )}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setEditingThreshold(threshold)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleToggleActive(threshold)}
                    >
                      {threshold.isActive ? 'Deactivate' : 'Activate'}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(threshold.id, threshold.diseaseName)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Dialogs */}
      <CreateThresholdDialog
        open={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        onSuccess={fetchThresholds}
        existingDiseases={existingDiseases}
      />

      {editingThreshold && (
        <EditThresholdDialog
          threshold={editingThreshold}
          open={!!editingThreshold}
          onClose={() => setEditingThreshold(null)}
          onSuccess={fetchThresholds}
        />
      )}
    </div>
  );
}
