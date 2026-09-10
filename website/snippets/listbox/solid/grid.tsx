import { createGridCollection } from '@ark-ui/solid/collection';
import { Listbox } from '@moduix/solid/listbox';
import { For } from 'solid-js';
import styles from '@/components/examples/listbox/listbox-grid.module.css';

const colors = createGridCollection({
  items: [
    { label: 'Red', value: 'red' },
    { label: 'Green', value: 'green' },
    { label: 'Blue', value: 'blue' },
  ],
  columnCount: 3,
});

export default function GridListboxDemo() {
  return (
    <Listbox collection={colors} class={styles.gridRoot}>
      <Listbox.Label>Pick a color</Listbox.Label>
      <Listbox.Content>
        <For each={colors.items}>
          {(item) => (
            <Listbox.Item item={item}>
              <Listbox.ItemText>{item.label}</Listbox.ItemText>
            </Listbox.Item>
          )}
        </For>
      </Listbox.Content>
    </Listbox>
  );
}