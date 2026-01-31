'use client';

import { useState } from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
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
import { useSections } from '@/hooks/useSections';

interface SectionComboboxProps {
  gradeLevel?: string;
  value: string;
  onValueChange: (value: string) => void;
  disabled?: boolean;
}

export function SectionCombobox({
  gradeLevel,
  value,
  onValueChange,
  disabled = false,
}: SectionComboboxProps) {
  const [open, setOpen] = useState(false);
  const { sections, isLoading, error } = useSections(gradeLevel);

  // Find display name for current value
  const selectedSection = sections.find((s) => s.sectionName === value);
  const displayValue = selectedSection?.displayName || 'Select section...';

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={disabled || !gradeLevel}
          className={cn(
            'w-full justify-between px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl',
            'focus:border-[#C41E3A] focus:bg-white focus:ring-4 focus:ring-red-50',
            'transition-all outline-none h-auto font-normal',
            !value && 'text-muted-foreground'
          )}
        >
          {isLoading ? 'Loading...' : displayValue}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start" style={{ width: 'var(--radix-popover-trigger-width)' }}>
        <Command>
          <CommandInput placeholder="Search sections..." className="h-9" />
          <CommandList>
            <CommandEmpty>
              {error ? 'Error loading sections' : 'No section found.'}
            </CommandEmpty>
            <CommandGroup>
              {sections.map((section) => (
                <CommandItem
                  key={section.id}
                  value={section.displayName}
                  onSelect={() => {
                    onValueChange(section.sectionName);
                    setOpen(false);
                  }}
                >
                  {section.displayName}
                  <Check
                    className={cn(
                      'ml-auto h-4 w-4',
                      value === section.sectionName ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
