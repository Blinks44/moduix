import { createListCollection } from '@ark-ui/solid/collection';
import { Button } from '@moduix/solid/button';
import { Listbox, useListbox } from '@moduix/solid/listbox';
import { For } from 'solid-js';
import styles from '@/components/examples/listbox/listbox-root-provider.module.css';

const priorities = createListCollection({
  items: [
    { label: 'Low', value: 'low' },
    { label: 'Medium', value: 'medium' },
    { label: 'High', value: 'high' },
    { label: 'Critical', value: 'critical' },
  ],
});

export default function RootProviderListboxDemo() {
  const listbox = useListbox({ collection: priorities });

  return (
    <div class={styles.stack}>
      <Listbox.RootProvider value={listbox} class={styles.root}>
        <Listbox.Label>Select priority</Listbox.Label>
        <Listbox.Content>
          <For each={priorities.items}>
            {(item) => (
              <Listbox.Item item={item}>
                <Listbox.ItemText>{item.label}</Listbox.ItemText>
                <Listbox.ItemIndicator />
              </Listbox.Item>
            )}
          </For>
        </Listbox.Content>
      </Listbox.RootProvider>
      <div>
        <output>Selected: {listbox().value[0] ?? 'none'}</output>
        <Button onClick={() => listbox().setValue(['high'])}>Set to high</Button>
      </div>
    </div>
  );
}