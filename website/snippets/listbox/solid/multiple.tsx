import { createListCollection } from '@ark-ui/solid/collection';
import { Listbox } from '@moduix/solid/listbox';
import { For } from 'solid-js';
import styles from '@/components/examples/listbox/listbox-multiple.module.css';

const days = createListCollection({
  items: [
    { label: 'Monday', value: 'mon' },
    { label: 'Tuesday', value: 'tue' },
    { label: 'Wednesday', value: 'wed' },
    { label: 'Thursday', value: 'thu' },
    { label: 'Friday', value: 'fri' },
    { label: 'Saturday', value: 'sat' },
    { label: 'Sunday', value: 'sun' },
  ],
});

export default function MultipleListboxDemo() {
  return (
    <Listbox
      collection={days}
      class={styles.root}
      selectionMode="multiple"
      defaultValue={['mon', 'wed', 'fri']}
    >
      <Listbox.Label>Select days</Listbox.Label>
      <Listbox.Content>
        <For each={days.items}>
          {(item) => (
            <Listbox.Item item={item}>
              <Listbox.ItemText>{item.label}</Listbox.ItemText>
              <Listbox.ItemIndicator />
            </Listbox.Item>
          )}
        </For>
      </Listbox.Content>
      <Listbox.ValueText />
    </Listbox>
  );
}