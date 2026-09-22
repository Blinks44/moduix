import { createListCollection } from '@ark-ui/solid/collection';
import { Input } from '@moduix/solid/input';
import {
  Select,
  SelectLabel,
  SelectField,
  SelectPositioner,
  SelectContent,
  SelectItem,
  SelectItemText,
  SelectItemIndicator,
} from '@moduix/solid/select';
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
        <SelectLabel>Choose fruit</SelectLabel>
        <SelectField placeholder="Select an option" clearLabel="Clear selection" />
        <SelectPositioner>
          <SelectContent>
            <For each={collection().items}>
              {(item) => (
                <SelectItem item={item}>
                  <SelectItemText>{item.label}</SelectItemText>
                  <SelectItemIndicator />
                </SelectItem>
              )}
            </For>
          </SelectContent>
        </SelectPositioner>
      </Select>
    </div>
  );
}