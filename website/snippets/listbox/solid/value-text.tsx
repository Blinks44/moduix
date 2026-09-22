import { createListCollection } from '@ark-ui/solid/collection';
import {
  Listbox,
  ListboxContent,
  ListboxItem,
  ListboxItemIndicator,
  ListboxItemText,
  ListboxLabel,
  ListboxValueText,
} from '@moduix/solid/listbox';
import { For } from 'solid-js';
import styles from '@/components/examples/listbox/listbox-value-text.module.css';

const countries = createListCollection({
  items: [
    { label: 'United States', value: 'us' },
    { label: 'United Kingdom', value: 'uk' },
    { label: 'Canada', value: 'ca' },
  ],
});

export default function ValueTextListboxDemo() {
  return (
    <Listbox collection={countries} class={styles.root} defaultValue={['ca']}>
      <ListboxLabel>Select country</ListboxLabel>
      <ListboxContent>
        <For each={countries.items}>
          {(item) => (
            <ListboxItem item={item}>
              <ListboxItemText>{item.label}</ListboxItemText>
              <ListboxItemIndicator />
            </ListboxItem>
          )}
        </For>
      </ListboxContent>
      <ListboxValueText placeholder="No country selected" />
    </Listbox>
  );
}