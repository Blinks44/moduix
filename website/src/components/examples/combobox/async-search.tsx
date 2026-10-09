import { createListCollection } from '@ark-ui/react/collection';
import {
  Combobox,
  ComboboxClearTrigger,
  ComboboxContent,
  ComboboxControl,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxLabel,
  ComboboxList,
  ComboboxOption,
  ComboboxPositioner,
  ComboboxStatus,
  ComboboxTrigger,
} from '@moduix/react/combobox';
import { useEffect, useMemo, useState } from 'react';
import styles from '@/components/examples/combobox/component-async-search.module.css';

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
      <ComboboxLabel>Search fruit</ComboboxLabel>
      <ComboboxControl>
        <ComboboxInput placeholder="Start typing" />
        <ComboboxClearTrigger aria-label="Clear search" />
        <ComboboxTrigger aria-label="Open options" />
      </ComboboxControl>
      <ComboboxPositioner>
        <ComboboxContent className={styles.content}>
          {!query ? <ComboboxStatus>Start typing to search…</ComboboxStatus> : null}
          {loading ? <ComboboxStatus>Searching…</ComboboxStatus> : null}
          {!loading && query ? <ComboboxEmpty>No results found.</ComboboxEmpty> : null}
          <ComboboxList>
            {collection.items.map((item) => (
              <ComboboxOption key={item.value} item={item}>
                {item.label}
              </ComboboxOption>
            ))}
          </ComboboxList>
        </ComboboxContent>
      </ComboboxPositioner>
    </Combobox>
  );
}