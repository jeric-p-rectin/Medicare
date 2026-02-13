'use client';

import { useState } from 'react';
import { Check, ChevronsUpDown, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface DiseaseTrendEntry {
  disease: string;
  currentCount: number;
}

interface DiseaseFilterCardProps {
  trends: DiseaseTrendEntry[];
  selectedDiseases: Set<string>;
  onSelectionChange: (selected: Set<string>) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filteredDiseases: string[];
  onSelectAll: () => void;
  onClearAll: () => void;
  onToggleDisease: (disease: string) => void;
}

export function DiseaseFilterCard({
  trends,
  selectedDiseases,
  onSelectionChange,
  searchQuery,
  onSearchChange,
  filteredDiseases,
  onSelectAll,
  onClearAll,
  onToggleDisease,
}: DiseaseFilterCardProps) {
  const [open, setOpen] = useState(false);

  // Get case count for a disease
  const getCaseCount = (disease: string) => {
    const trend = trends.find(t => t.disease === disease);
    return trend?.currentCount || 0;
  };

  // Calculate display text for button
  const getButtonText = () => {
    if (selectedDiseases.size === 0) {
      return 'All diseases';
    }
    if (selectedDiseases.size === 1) {
      return `1 disease selected`;
    }
    return `${selectedDiseases.size} diseases selected`;
  };

  // Calculate summary text
  const getSummaryText = () => {
    const totalDiseases = trends.length;
    const visibleCount = selectedDiseases.size === 0 ? totalDiseases : selectedDiseases.size;
    return `Showing ${visibleCount} of ${totalDiseases} diseases`;
  };

  return (
    <Card className="mb-6 bg-white rounded-2xl shadow-lg shadow-red-500/5">
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Dropdown Button */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="flex-1 w-full sm:w-auto">
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className={cn(
                      'w-full sm:w-[300px] justify-between px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl',
                      'hover:border-[#C41E3A] hover:bg-white transition-all h-auto font-normal'
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <Filter className="h-4 w-4 text-gray-500" />
                      <span>{getButtonText()}</span>
                    </div>
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[320px] p-0" align="start">
                  <Command shouldFilter={false}>
                    <CommandInput
                      placeholder="Search diseases..."
                      className="h-9"
                      value={searchQuery}
                      onValueChange={onSearchChange}
                    />
                    <CommandList className="max-h-[400px]">
                      <CommandEmpty>No diseases found.</CommandEmpty>

                      {/* Action Buttons */}
                      <div className="px-2 py-2 flex gap-2 border-b border-gray-100">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={onSelectAll}
                          className="flex-1 h-8 text-xs"
                        >
                          Select All
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={onClearAll}
                          className="flex-1 h-8 text-xs"
                        >
                          Clear All
                        </Button>
                      </div>

                      <CommandGroup>
                        {filteredDiseases.map((disease) => {
                          const isSelected = selectedDiseases.has(disease);
                          const caseCount = getCaseCount(disease);

                          return (
                            <CommandItem
                              key={disease}
                              value={disease}
                              onSelect={() => onToggleDisease(disease)}
                              className="cursor-pointer"
                            >
                              <div className="flex items-center gap-2 flex-1">
                                <Checkbox
                                  checked={isSelected}
                                  onCheckedChange={() => onToggleDisease(disease)}
                                  className="pointer-events-none"
                                />
                                <span className="flex-1 font-medium text-sm">{disease}</span>
                                <Badge
                                  variant="secondary"
                                  className="ml-auto bg-red-100 text-[#C41E3A] font-mono text-xs"
                                >
                                  {caseCount} {caseCount === 1 ? 'case' : 'cases'}
                                </Badge>
                              </div>
                            </CommandItem>
                          );
                        })}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            {/* Summary Text */}
            <div className="text-sm text-gray-500 whitespace-nowrap">
              {getSummaryText()}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
