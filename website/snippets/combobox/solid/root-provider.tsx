import { createListCollection } from '@ark-ui/solid/collection';
import { Combobox, useCombobox } from '@moduix/solid/combobox';
import { For } from 'solid-js';
import styles from '@/components/examples/combobox/component-root-provider.module.css';

const jobTitles = [
  { label: 'Designer', value: 'designer' },
  { label: 'Developer', value: 'developer' },
  { label: 'Product Manager', value: 'product-manager' },
];

const collection = createListCollection({ items: jobTitles });

export default function RootProviderComboboxDemo() {
  const combobox = useCombobox({ collection });

  return (
    <Combobox.RootProvider value={combobox}>
      <Combobox.Label>Job title</Combobox.Label>
      <Combobox.Control>
        <Combobox.Input />
        <Combobox.ClearTrigger aria-label="Clear selection" />
        <Combobox.Trigger aria-label="Open options" />
      </Combobox.Control>
      <Combobox.Positioner>
        <Combobox.Content class={styles.content}>
          <Combobox.List>
            <For each={collection.items}>
              {(item) => <Combobox.Option item={item}>{item.label}</Combobox.Option>}
            </For>
          </Combobox.List>
        </Combobox.Content>
      </Combobox.Positioner>
    </Combobox.RootProvider>
  );
}