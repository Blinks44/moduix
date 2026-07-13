/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { createListCollection } from '@ark-ui/react/collection';
import { Select } from '@moduix/react';

const fruits = createListCollection({
  items: [
    {
      label: 'Apple',
      value: 'apple',
    },
    {
      label: 'Banana',
      value: 'banana',
    },
    {
      label: 'Blueberry',
      value: 'blueberry',
    },
    {
      label: 'Grape',
      value: 'grape',
    },
    {
      label: 'Kiwi',
      value: 'kiwi',
    },
    {
      label: 'Mango',
      value: 'mango',
    },
    {
      label: 'Orange',
      value: 'orange',
    },
    {
      label: 'Pineapple',
      value: 'pineapple',
    },
    {
      label: 'Strawberry',
      value: 'strawberry',
    },
    {
      label: 'Watermelon',
      value: 'watermelon',
    },
  ],
});

export function SelectOverflowDemo() {
  return (
    <Select
      collection={fruits}
      positioning={{
        fitViewport: true,
        placement: 'bottom-start',
        sameWidth: true,
      }}
    >
      <Select.Label>Choose fruit</Select.Label>
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder="Select an option" />
        </Select.Trigger>
        <Select.Indicators>
          <Select.ClearTrigger aria-label="Clear selection" />
          <Select.Indicator />
        </Select.Indicators>
      </Select.Control>
      <Select.Positioner>
        <Select.Content>
          {fruits.items.map((item) => (
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