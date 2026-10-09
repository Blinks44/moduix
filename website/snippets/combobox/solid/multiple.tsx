import { useListCollection } from '@ark-ui/solid/collection';
import { useFilter } from '@ark-ui/solid/locale';
import {
  Combobox,
  ComboboxContent,
  ComboboxControl,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxLabel,
  ComboboxList,
  ComboboxOption,
  ComboboxPositioner,
  ComboboxTrigger,
} from '@moduix/solid/combobox';
import { createSignal, For, Show } from 'solid-js';
import styles from '@/components/examples/combobox/component-multiple.module.css';

const fruits = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Mango', value: 'mango' },
  { label: 'Orange', value: 'orange' },
];

export default function MultipleComboboxDemo() {
  const { contains } = useFilter({ sensitivity: 'base' })();
  const { collection, filter } = useListCollection({
    initialItems: fruits,
    filter: contains,
  });
  const [value, setValue] = createSignal<string[]>([]);
  const selectedItems = () => fruits.filter((item) => value().includes(item.value));

  return (
    <Combobox
      collection={collection()}
      value={value()}
      onValueChange={(details) => setValue(details.value)}
      onInputValueChange={(details) => filter(details.inputValue)}
      multiple
    >
      <ComboboxLabel>Fruits</ComboboxLabel>
      <div class={styles.tags}>
        <Show when={selectedItems().length === 0}>
          <span class={styles.note}>None selected</span>
        </Show>
        <For each={selectedItems()}>{(item) => <span class={styles.tag}>{item.label}</span>}</For>
      </div>
      <ComboboxControl>
        <ComboboxInput placeholder="Search fruits" />
        <ComboboxTrigger aria-label="Open options" />
      </ComboboxControl>
      <ComboboxPositioner>
        <ComboboxContent class={styles.content}>
          <ComboboxEmpty>No fruits found.</ComboboxEmpty>
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