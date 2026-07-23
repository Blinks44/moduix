import { createListCollection } from '@ark-ui/react/collection';
import { Combobox } from '@moduix/react';
import { useEffect, useMemo, useState } from 'react';

const fruits = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Mango', value: 'mango' },
  { label: 'Orange', value: 'orange' },
  { label: 'Pineapple', value: 'pineapple' },
  { label: 'Strawberry', value: 'strawberry' },
];

export default function AsyncSearchComboboxDemo() {
  const [query, setQuery] = useState('');
  const [items, setItems] = useState([] as typeof fruits);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) {
      setItems([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const timeout = window.setTimeout(() => {
      setItems(fruits.filter((item) => item.label.toLowerCase().includes(query.toLowerCase())));
      setLoading(false);
    }, 300);

    return () => window.clearTimeout(timeout);
  }, [query]);

  const collection = useMemo(() => createListCollection({ items }), [items]);

  return (
    <Combobox
      collection={collection}
      inputValue={query}
      onInputValueChange={(details) => {
        if (details.reason === 'input-change' || details.inputValue === '') {
          setQuery(details.inputValue);
        }
      }}
    >
      <Combobox.Label>Search fruit</Combobox.Label>
      <Combobox.Control>
        <Combobox.Input placeholder="Start typing" />
        <Combobox.ClearTrigger aria-label="Clear search" />
        <Combobox.Trigger aria-label="Open options" />
      </Combobox.Control>
      <Combobox.Positioner>
        <Combobox.Content>
          {!query ? <Combobox.Status>Start typing to search…</Combobox.Status> : null}
          {loading ? <Combobox.Status>Searching…</Combobox.Status> : null}
          {!loading && query ? <Combobox.Empty>No results found.</Combobox.Empty> : null}
          <Combobox.List>
            {collection.items.map((item) => (
              <Combobox.Option key={item.value} item={item}>
                {item.label}
              </Combobox.Option>
            ))}
          </Combobox.List>
        </Combobox.Content>
      </Combobox.Positioner>
    </Combobox>
  );
}