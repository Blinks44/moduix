import { createListCollection } from '@ark-ui/react/collection';
import { Select } from '@moduix/react';

const fruits = createListCollection({
  items: [
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    { label: 'Blueberry', value: 'blueberry' },
  ],
});

export default function SelectCustomItemLayoutDemo() {
  return (
    <Select collection={fruits}>
      <Select.Label>Choose fruit</Select.Label>
      <Select.Field placeholder="Select an option" clearLabel="Clear selection" />
      <Select.Positioner>
        <Select.Content>
          {fruits.items.map((item) => (
            <Select.Item key={item.value} item={item}>
              <Select.ItemText>
                <Select.ItemTextContent>
                  <Select.ItemTextIcon aria-hidden>i</Select.ItemTextIcon>
                  <Select.ItemTextLabel>{item.label}</Select.ItemTextLabel>
                </Select.ItemTextContent>
              </Select.ItemText>
              <Select.ItemIndicator />
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Positioner>
    </Select>
  );
}