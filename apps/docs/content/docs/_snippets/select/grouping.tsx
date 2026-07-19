/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { createListCollection } from '@ark-ui/react/collection';
import { Select } from '@moduix/react';

const produce = createListCollection({
  items: [
    {
      label: 'Apple',
      value: 'apple',
      type: 'Fruits',
    },
    {
      label: 'Mango',
      value: 'mango',
      type: 'Fruits',
    },
    {
      label: 'Orange',
      value: 'orange',
      type: 'Fruits',
    },
    {
      label: 'Broccoli',
      value: 'broccoli',
      type: 'Vegetables',
    },
    {
      label: 'Carrot',
      value: 'carrot',
      type: 'Vegetables',
    },
    {
      label: 'Spinach',
      value: 'spinach',
      type: 'Vegetables',
    },
  ],
  groupBy: (item) => item.type,
});

export function SelectGroupingDemo() {
  return (
    <Select collection={produce}>
      <Select.Label>Choose produce</Select.Label>
      <Select.Field placeholder="Select item" clearLabel="Clear selection" />
      <Select.Positioner>
        <Select.Content>
          {produce.group().map(([type, group]) => (
            <Select.ItemGroup key={type}>
              <Select.ItemGroupLabel>{type}</Select.ItemGroupLabel>
              {group.map((item) => (
                <Select.Item key={item.value} item={item}>
                  <Select.ItemText>{item.label}</Select.ItemText>
                  <Select.ItemIndicator />
                </Select.Item>
              ))}
            </Select.ItemGroup>
          ))}
        </Select.Content>
      </Select.Positioner>
    </Select>
  );
}

//#endregion