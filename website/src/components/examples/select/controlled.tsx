import { createListCollection } from '@ark-ui/react/collection';
import {
  Select,
  SelectLabel,
  SelectControl,
  SelectTrigger,
  SelectValueText,
  SelectIndicator,
  SelectClearTrigger,
  SelectPositioner,
  SelectContent,
  SelectItem,
  SelectItemText,
  SelectItemIndicator,
} from '@moduix/react/select';
import { useState } from 'react';

const themes = createListCollection({
  items: [
    {
      label: 'System',
      value: 'system',
    },
    {
      label: 'Light',
      value: 'light',
    },
    {
      label: 'Dark',
      value: 'dark',
    },
  ],
});

export default function SelectControlledDemo() {
  const [value, setValue] = useState(['light']);

  return (
    <Select collection={themes} value={value} onValueChange={(details) => setValue(details.value)}>
      <SelectLabel>Theme</SelectLabel>
      <SelectControl>
        <SelectTrigger>
          <SelectValueText placeholder="Select theme" />
        </SelectTrigger>
        <SelectIndicator />
        <SelectClearTrigger aria-label="Clear selection" />
      </SelectControl>
      <SelectPositioner>
        <SelectContent>
          {themes.items.map((item) => (
            <SelectItem key={item.value} item={item}>
              <SelectItemText>{item.label}</SelectItemText>
              <SelectItemIndicator />
            </SelectItem>
          ))}
        </SelectContent>
      </SelectPositioner>
    </Select>
  );
}