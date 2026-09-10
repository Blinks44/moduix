import { createListCollection } from '@ark-ui/solid/collection';
import { Listbox } from '@moduix/solid/listbox';
import { For } from 'solid-js';
import styles from '@/components/examples/listbox/listbox-extended-selection.module.css';

const frameworks = createListCollection({
  items: [
    { label: 'React', value: 'react' },
    { label: 'Vue', value: 'vue' },
    { label: 'Angular', value: 'angular' },
    { label: 'Svelte', value: 'svelte' },
    { label: 'Solid', value: 'solid' },
    { label: 'Preact', value: 'preact' },
  ],
});

export default function ExtendedListboxDemo() {
  return (
    <Listbox collection={frameworks} class={styles.root} selectionMode="extended">
      <Listbox.Label>Hold Cmd or Ctrl to select multiple</Listbox.Label>
      <Listbox.Content>
        <For each={frameworks.items}>
          {(item) => (
            <Listbox.Item item={item}>
              <Listbox.ItemText>{item.label}</Listbox.ItemText>
              <Listbox.ItemIndicator />
            </Listbox.Item>
          )}
        </For>
      </Listbox.Content>
    </Listbox>
  );
}