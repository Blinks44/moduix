import { createListCollection } from '@ark-ui/solid/collection';
import { Listbox } from '@moduix/solid/listbox';
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
      <Listbox.Label>Select country</Listbox.Label>
      <Listbox.Content>
        <For each={countries.items}>
          {(item) => (
            <Listbox.Item item={item}>
              <Listbox.ItemText>{item.label}</Listbox.ItemText>
              <Listbox.ItemIndicator />
            </Listbox.Item>
          )}
        </For>
      </Listbox.Content>
      <Listbox.ValueText placeholder="No country selected" />
    </Listbox>
  );
}