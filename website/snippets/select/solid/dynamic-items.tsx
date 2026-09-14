import { createListCollection } from '@ark-ui/solid/collection';
import { Input } from '@moduix/solid/input';
import { Select } from '@moduix/solid/select';
import { createMemo, createSignal, For } from 'solid-js';
import styles from '@/components/examples/select/select-dynamic-items.module.css';

const fruits = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Blueberry', value: 'blueberry' },
  { label: 'Grape', value: 'grape' },
  { label: 'Kiwi', value: 'kiwi' },
  { label: 'Mango', value: 'mango' },
  { label: 'Orange', value: 'orange' },
  { label: 'Pineapple', value: 'pineapple' },
  { label: 'Strawberry', value: 'strawberry' },
  { label: 'Watermelon', value: 'watermelon' },
];

export default function SelectDynamicItemsDemo() {
  const [query, setQuery] = createSignal('');
  const collection = createMemo(() =>
    createListCollection({
      items: fruits.filter((item) => item.label.toLowerCase().includes(query())),
    }),
  );

  return (
    <div class={styles.root}>
      <Input
        aria-label="Filter fruits"
        value={query()}
        onInput={(event) => setQuery(event.currentTarget.value.toLowerCase())}
        placeholder="Filter fruits"
      />
      <Select collection={collection()}>
        <Select.Label>Choose fruit</Select.Label>
        <Select.Field placeholder="Select an option" clearLabel="Clear selection" />
        <Select.Positioner>
          <Select.Content>
            <For each={collection().items}>
              {(item) => (
                <Select.Item item={item}>
                  <Select.ItemText>{item.label}</Select.ItemText>
                  <Select.ItemIndicator />
                </Select.Item>
              )}
            </For>
          </Select.Content>
        </Select.Positioner>
      </Select>
    </div>
  );
}