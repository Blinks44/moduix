import { useListCollection } from '@ark-ui/solid/collection';
import { Combobox } from '@moduix/solid/combobox';
import { For } from 'solid-js';
import styles from '@/components/examples/combobox/component-dynamic.module.css';

const domains = ['gmail.com', 'outlook.com', 'proton.me'];

export default function DynamicComboboxDemo() {
  const { collection, set } = useListCollection({
    initialItems: [] as string[],
  });

  return (
    <Combobox
      collection={collection()}
      onInputValueChange={(details) => {
        if (details.reason !== 'input-change') {
          return;
        }

        const name = details.inputValue.trim();
        set(name ? domains.map((domain) => `${name}@${domain}`) : []);
      }}
    >
      <Combobox.Label>Email</Combobox.Label>
      <Combobox.Control>
        <Combobox.Input placeholder="e.g. alex" />
        <Combobox.Trigger aria-label="Open options" />
      </Combobox.Control>
      <Combobox.Positioner>
        <Combobox.Content class={styles.content}>
          <Combobox.List>
            <For each={collection().items}>
              {(item) => <Combobox.Option item={item}>{item}</Combobox.Option>}
            </For>
          </Combobox.List>
        </Combobox.Content>
      </Combobox.Positioner>
    </Combobox>
  );
}