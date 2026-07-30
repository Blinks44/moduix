import { createListCollection } from '@ark-ui/react/collection';
import { Input, Select } from '@moduix/react';
import { useState } from 'react';

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

export default function SelectDynamicItemsDemo() {
  const [query, setQuery] = useState('');
  const collection = createListCollection({
    items: fruits.items.filter((item) => item.label.toLowerCase().includes(query)),
  });

  return (
    <div className="select-dynamic-items">
      <Input
        aria-label="Filter fruits"
        value={query}
        onChange={(event) => setQuery(event.target.value.toLowerCase())}
        placeholder="Filter fruits"
      />
      <Select collection={collection}>
        <Select.Label>Choose fruit</Select.Label>
        <Select.Field placeholder="Select an option" clearLabel="Clear selection" />
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
      </Select>
    </div>
  );
}