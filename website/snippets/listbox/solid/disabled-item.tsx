import { createListCollection } from '@ark-ui/solid/collection';
import { Listbox, ListboxContent, ListboxItem, ListboxItemIndicator, ListboxItemText, ListboxLabel } from '@moduix/solid/listbox';
import { For } from 'solid-js';
import styles from '@/components/examples/listbox/listbox-disabled-item.module.css';

const plans = createListCollection({
  items: [
    { label: 'Free', value: 'free' },
    { label: 'Pro', value: 'pro' },
    { label: 'Enterprise', value: 'enterprise', disabled: true },
    { label: 'Custom', value: 'custom' },
  ],
});

export default function DisabledItemListboxDemo() {
  return (
    <Listbox collection={plans} class={styles.root}>
      <ListboxLabel>Select plan</ListboxLabel>
      <ListboxContent>
        <For each={plans.items}>
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
