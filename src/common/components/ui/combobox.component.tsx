'use client';

import { useCallback, useState } from 'react';
import cn from 'clsx';
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';
import { Button } from './button.component';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from './command.component';
import { Popover, PopoverContent, PopoverTrigger } from './popover.component';

export type ComboboxOption = { label: string; value: string };

export function Combobox(props: {
  options: ComboboxOption[];
  selectedValue: string | null;
  onChange: (value: any) => void;
  searchActivated?: boolean;
  placeholder?: string;
  searchPlaceholder?: string;
}) {
  const { options, selectedValue, placeholder, searchPlaceholder, onChange } =
    props;
  const selected = options.find(({ value }) => value === selectedValue);
  const searchActivated = props.searchActivated ?? false;
  //
  const [open, setOpen] = useState(false);
  const onSelect = useCallback(
    (v: string) => {
      onChange(v);
      setOpen(false);
    },
    [onChange],
  );
  //
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {selected?.label ?? placeholder ?? 'Sélectionner...'}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          {searchActivated && (
            <>
              <CommandInput placeholder={searchPlaceholder} className="h-9" />
              <CommandEmpty>Aucune correspondance.</CommandEmpty>
            </>
          )}
          <CommandGroup>
            {options.map((option, index) => (
              <CommandItem key={index} value={option.value} onSelect={onSelect}>
                {option.label}
                <CheckIcon
                  className={cn(
                    'ml-auto h-4 w-4',
                    selectedValue === option.value
                      ? 'opacity-100'
                      : 'opacity-0',
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
