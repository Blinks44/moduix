import { createListCollection } from '@ark-ui/solid/collection';
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
} from '@moduix/solid/combobox';
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
      <ComboboxLabel>Search fruit</ComboboxLabel>
      <ComboboxControl>
        <ComboboxInput placeholder="Start typing" />
        <ComboboxClearTrigger aria-label="Clear search" />
        <ComboboxTrigger aria-label="Open options" />
      </ComboboxControl>
      <ComboboxPositioner>
        <ComboboxContent class={styles.content}>
          <Show when={!query()}>
            <ComboboxStatus>Start typing to search…</ComboboxStatus>
          </Show>
          <Show when={loading()}>
            <ComboboxStatus>Searching…</ComboboxStatus>
          </Show>
          <Show when={!loading() && query()}>
            <ComboboxEmpty>No results found.</ComboboxEmpty>
          </Show>
          <ComboboxList>
            <For each={collection().items}>
              {(item) => <ComboboxOption item={item}>{item.label}</ComboboxOption>}
            </For>
          </ComboboxList>
        </ComboboxContent>
      </ComboboxPositioner>
    </Combobox>
  );
}