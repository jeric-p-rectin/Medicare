'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Loader2, Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface CreateThresholdDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  existingDiseases: string[];
}

export function CreateThresholdDialog({
  open,
  onClose,
  onSuccess,
  existingDiseases
}: CreateThresholdDialogProps) {
  const [diseaseName, setDiseaseName] = useState('');
  const [casesPerWeek, setCasesPerWeek] = useState<number>(5);
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [comboboxOpen, setComboboxOpen] = useState(false);
  const [customDisease, setCustomDisease] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const finalDiseaseName = customDisease || diseaseName;

    if (!finalDiseaseName.trim()) {
      toast.error('Please enter a disease name');
      return;
    }

    if (casesPerWeek <= 0) {
      toast.error('Threshold must be greater than 0');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/disease-thresholds', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          diseaseName: finalDiseaseName.trim(),
          casesPerWeek: Math.floor(casesPerWeek),
          description: description.trim() || undefined
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to create threshold');
      }

      toast.success('Threshold created successfully');
      onSuccess();
      onClose();

      // Reset form
      setDiseaseName('');
      setCustomDisease('');
      setCasesPerWeek(5);
      setDescription('');
    } catch (error: any) {
      toast.error(error.message || 'Failed to create threshold');
    } finally {
      setIsSubmitting(false);
    }
  };

  const displayValue = customDisease || diseaseName || 'Select or type disease name...';

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Disease Alert Threshold</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Disease Name Combobox */}
          <div>
            <Label htmlFor="diseaseName">Disease Name</Label>
            <Popover open={comboboxOpen} onOpenChange={setComboboxOpen}>
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  role="combobox"
                  aria-expanded={comboboxOpen}
                  className={cn(
                    'w-full justify-between px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl',
                    'focus:border-[#C41E3A] focus:bg-white focus:ring-4 focus:ring-red-50',
                    'transition-all outline-none h-auto font-normal',
                    !diseaseName && !customDisease && 'text-muted-foreground'
                  )}
                >
                  {displayValue}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0" align="start" style={{ width: 'var(--radix-popover-trigger-width)' }}>
                <Command>
                  <CommandInput
                    placeholder="Search or type disease name..."
                    className="h-9"
                    value={customDisease}
                    onValueChange={setCustomDisease}
                  />
                  <CommandList>
                    <CommandEmpty>
                      <div className="px-2 py-3 text-sm">
                        <p className="text-gray-600">No disease found.</p>
                        {customDisease && (
                          <p className="text-green-600 mt-1">
                            Press Enter to use &quot;{customDisease}&quot;
                          </p>
                        )}
                      </div>
                    </CommandEmpty>
                    <CommandGroup>
                      {existingDiseases.map((disease) => (
                        <CommandItem
                          key={disease}
                          value={disease}
                          onSelect={(value) => {
                            setDiseaseName(value);
                            setCustomDisease('');
                            setComboboxOpen(false);
                          }}
                        >
                          {disease}
                          <Check
                            className={cn(
                              'ml-auto h-4 w-4',
                              diseaseName === disease ? 'opacity-100' : 'opacity-0'
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            <p className="text-xs text-gray-500 mt-1">
              Select from existing diseases or type a new one
            </p>
          </div>

          {/* Cases Per Week */}
          <div>
            <Label htmlFor="casesPerWeek">Threshold (Cases per Week)</Label>
            <Input
              id="casesPerWeek"
              type="number"
              min="1"
              value={casesPerWeek}
              onChange={(e) => setCasesPerWeek(parseInt(e.target.value) || 1)}
              required
              className="px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl focus:border-[#C41E3A] focus:ring-4 focus:ring-red-50"
            />
            <p className="text-xs text-gray-500 mt-1">
              Alert will trigger when cases in past 7 days exceed this number
            </p>
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="E.g., Seasonal flu outbreak threshold based on historical data"
              rows={3}
              className="px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl focus:border-[#C41E3A] focus:ring-4 focus:ring-red-50"
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-gradient-to-r from-[#C41E3A] to-[#E63946] text-white"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Creating...
                </>
              ) : (
                'Create Alert Threshold'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
