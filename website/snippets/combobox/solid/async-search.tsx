import { createListCollection } from '@ark-ui/solid/collection';
import { Combobox } from '@moduix/solid/combobox';
import { createEffect, createMemo, createSignal, For, onCleanup, Show } from 'solid-js';
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
  const [query, setQuery] = createSignal('');
  const [items, setItems] = createSignal<typeof fruits>([]);
  const [loading, setLoading] = createSignal(false);
  const collection = createMemo(() => createListCollection({ items: items() }));

  createEffect(() => {
    const currentQuery = query();

    if (!currentQuery) {
      setItems([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const timeout = window.setTimeout(() => {
      setItems(
        fruits.filter((item) => item.label.toLowerCase().includes(currentQuery.toLowerCase())),
      );
      setLoading(false);
    }, 300);

    onCleanup(() => window.clearTimeout(timeout));
  });

  return (
    <Combobox
      collection={collection()}
      inputValue={query()}
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
        <Combobox.Content class={styles.content}>
          <Show when={!query()}>
            <Combobox.Status>Start typing to search…</Combobox.Status>
          </Show>
          <Show when={loading()}>
            <Combobox.Status>Searching…</Combobox.Status>
          </Show>
          <Show when={!loading() && query()}>
            <Combobox.Empty>No results found.</Combobox.Empty>
          </Show>
          <Combobox.List>
            <For each={collection().items}>
              {(item) => <Combobox.Option item={item}>{item.label}</Combobox.Option>}
            </For>
          </Combobox.List>
        </Combobox.Content>
      </Combobox.Positioner>
    </Combobox>
  );
}