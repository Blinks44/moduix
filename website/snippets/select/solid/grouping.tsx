import { createListCollection } from '@ark-ui/solid/collection';
import { Select } from '@moduix/solid/select';
import { For } from 'solid-js';

const produce = createListCollection({
  items: [
    { label: 'Apple', value: 'apple', type: 'Fruits' },
    { label: 'Mango', value: 'mango', type: 'Fruits' },
    { label: 'Orange', value: 'orange', type: 'Fruits' },
    { label: 'Broccoli', value: 'broccoli', type: 'Vegetables' },
    { label: 'Carrot', value: 'carrot', type: 'Vegetables' },
    { label: 'Spinach', value: 'spinach', type: 'Vegetables' },
  ],
  groupBy: (item) => item.type,
});

export default function SelectGroupingDemo() {
  return (
    <Select collection={produce}>
      <Select.Label>Choose produce</Select.Label>
      <Select.Field placeholder="Select item" clearLabel="Clear selection" />
      <Select.Positioner>
        <Select.Content>
          <For each={produce.group()}>
            {([type, group]) => (
              <Select.ItemGroup>
                <Select.ItemGroupLabel>{type}</Select.ItemGroupLabel>
                <For each={group}>
                  {(item) => (
                    <Select.Item item={item}>
                      <Select.ItemText>{item.label}</Select.ItemText>
                      <Select.ItemIndicator />
                    </Select.Item>
                  )}
                </For>
              </Select.ItemGroup>
            )}
          </For>
        </Select.Content>
      </Select.Positioner>
    </Select>
  );
}