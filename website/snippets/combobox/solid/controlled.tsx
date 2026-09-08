import { useListCollection } from '@ark-ui/solid/collection';
import { useFilter } from '@ark-ui/solid/locale';
import { Combobox } from '@moduix/solid/combobox';
import { createSignal, For } from 'solid-js';
import styles from '@/components/examples/combobox/component-controlled.module.css';

const fruits = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Mango', value: 'mango' },
  { label: 'Orange', value: 'orange' },
];

export default function ControlledComboboxDemo() {
  const { contains } = useFilter({ sensitivity: 'base' })();
  const { collection, filter } = useListCollection({
    initialItems: fruits,
    filter: contains,
  });
  const [value, setValue] = createSignal(['mango']);

  return (
    <div class={styles.stack}>
      <Combobox
        collection={collection()}
        value={value()}
        onInputValueChange={(details) => filter(details.inputValue)}
        onValueChange={(details) => setValue(details.value)}
      >
        <Combobox.Label>Choose fruit</Combobox.Label>
        <Combobox.Control>
          <Combobox.Input />
          <Combobox.ClearTrigger aria-label="Clear selection" />
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
      <output>Selected: {value()[0] ?? 'none'}</output>
    </div>
  );
}