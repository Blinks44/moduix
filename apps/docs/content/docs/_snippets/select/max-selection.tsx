/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { createListCollection } from '@ark-ui/react/collection';
import { Select } from '@moduix/react';

const value = ['javascript'];

const collection = createListCollection({
  items: [
    {
      label: 'C#',
      value: 'csharp',
      disabled: false,
    },
    {
      label: 'Go',
      value: 'go',
      disabled: false,
    },
    {
      label: 'JavaScript',
      value: 'javascript',
      disabled: false,
    },
    {
      label: 'Python',
      value: 'python',
      disabled: false,
    },
    {
      label: 'Rust',
      value: 'rust',
      disabled: false,
    },
    {
      label: 'TypeScript',
      value: 'typescript',
      disabled: false,
    },
  ],
});

export function SelectMaxSelectionDemo() {
  return (
    <Select
      collection={collection}
      multiple
      value={value}
      onValueChange={(details) => {
        if (details.value.length <= 3) setValue(details.value);
      }}
    >
      <Select.Label>Languages</Select.Label>
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder="Select up to 3" />
        </Select.Trigger>
        <Select.Indicators>
          <Select.ClearTrigger aria-label="Clear selection" />
          <Select.Indicator />
        </Select.Indicators>
      </Select.Control>
      <Select.Positioner>
        <Select.Content>
          {collection.items.map((item) => (
            <Select.Item key={item.value} item={item}>
              <Select.ItemText>{item.label}</Select.ItemText>
              <Select.ItemIndicator />
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Positioner>
      <Select.HiddenSelect />
    </Select>
  );
}

//#endregion