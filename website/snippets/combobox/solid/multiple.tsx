import { useListCollection } from '@ark-ui/solid/collection';
import { useFilter } from '@ark-ui/solid/locale';
import { Combobox } from '@moduix/solid/combobox';
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
      <Combobox.Label>Fruits</Combobox.Label>
      <div class={styles.tags}>
        <Show when={selectedItems().length === 0}>
          <span class={styles.note}>None selected</span>
        </Show>
        <For each={selectedItems()}>{(item) => <span class={styles.tag}>{item.label}</span>}</For>
      </div>
      <Combobox.Control>
        <Combobox.Input placeholder="Search fruits" />
        <Combobox.Trigger aria-label="Open options" />
      </Combobox.Control>
      <Combobox.Positioner>
        <Combobox.Content class={styles.content}>
          <Combobox.Empty>No fruits found.</Combobox.Empty>
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