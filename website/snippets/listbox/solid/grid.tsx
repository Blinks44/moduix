import { createGridCollection } from '@ark-ui/solid/collection';
import { Listbox, ListboxContent, ListboxItem, ListboxItemText, ListboxLabel } from '@moduix/solid/listbox';
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
      <ListboxLabel>Pick a color</ListboxLabel>
      <ListboxContent>
        <For each={colors.items}>
          {(item) => (
            <ListboxItem item={item}>
              <ListboxItemText>{item.label}</ListboxItemText>
            </ListboxItem>
          )}
        </For>
      </ListboxContent>
    </Listbox>
  );
}
