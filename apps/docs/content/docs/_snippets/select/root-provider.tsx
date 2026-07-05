/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { createListCollection } from '@ark-ui/react/collection';
import { useSelect } from '@ark-ui/react/select';
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

export function SelectRootProviderDemo() {
  const select = useSelect({
    collection: fruits,
    defaultValue: ['banana'],
  });
  return (
    <>
      <output>Selected: {select.valueAsString}</output>
      <Select.RootProvider value={select}>
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
        <Select.HiddenSelect />
      </Select.RootProvider>
    </>
  );
}

//#endregion