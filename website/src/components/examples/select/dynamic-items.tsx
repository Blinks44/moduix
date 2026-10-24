import { createListCollection } from '@ark-ui/react/collection';
import { Input } from '@moduix/react/input';
import {
  Select,
  SelectLabel,
  SelectField,
  SelectPositioner,
  SelectContent,
  SelectOption,
} from '@moduix/react/select';
import { useState } from 'react';
import styles from '@/components/examples/select/select-dynamic-items.module.css';

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
    <div className={styles.root}>
      <Input
        aria-label="Filter fruits"
        value={query}
        onChange={(event) => setQuery(event.target.value.toLowerCase())}
        placeholder="Filter fruits"
      />
      <Select collection={collection}>
        <SelectLabel>Choose fruit</SelectLabel>
        <SelectField placeholder="Select an option" clearLabel="Clear selection" />
        <SelectPositioner>
          <SelectContent>
            {collection.items.map((item) => (
              <SelectOption key={item.value} item={item}>
                {item.label}
              </SelectOption>
            ))}
          </SelectContent>
        </SelectPositioner>
      </Select>
    </div>
  );
}