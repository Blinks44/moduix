/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { createListCollection } from '@ark-ui/react/collection';
import { Select } from '@moduix/react';
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

export function SelectControlledDemo() {
  const [value, setValue] = useState(['light']);

  return (
    <Select collection={themes} value={value} onValueChange={(details) => setValue(details.value)}>
      <Select.Label>Theme</Select.Label>
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder="Select theme" />
        </Select.Trigger>
        <Select.Indicators>
          <Select.ClearTrigger aria-label="Clear selection" />
          <Select.Indicator />
        </Select.Indicators>
      </Select.Control>
      <Select.Positioner>
        <Select.Content>
          {themes.items.map((item) => (
            <Select.Item key={item.value} item={item}>
              <Select.ItemText>{item.label}</Select.ItemText>
              <Select.ItemIndicator />
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Positioner>
    </Select>
  );
}

//#endregion