import { createListCollection } from '@ark-ui/solid/collection';
import {
  Listbox,
  ListboxContent,
  ListboxItem,
  ListboxItemIndicator,
  ListboxItemText,
  ListboxLabel,
} from '@moduix/solid/listbox';
import { createSignal, For } from 'solid-js';
import styles from '@/components/examples/listbox/listbox-controlled.module.css';

const sizes = createListCollection({
  items: [
    { label: 'Small', value: 'sm' },
    { label: 'Medium', value: 'md' },
    { label: 'Large', value: 'lg' },
    { label: 'Extra Large', value: 'xl' },
  ],
});

export default function ControlledListboxDemo() {
  const [value, setValue] = createSignal<string[]>(['md']);

  return (
    <Listbox
      collection={sizes}
      class={styles.root}
      value={value()}
      onValueChange={(details) => setValue(details.value)}
    >
      <ListboxLabel>Select size</ListboxLabel>
      <ListboxContent>
        <For each={sizes.items}>
          {(item) => (
            <ListboxItem item={item}>
              <ListboxItemText>{item.label}</ListboxItemText>
              <ListboxItemIndicator />
            </ListboxItem>
          )}
        </For>
      </ListboxContent>
    </Listbox>
  );
}