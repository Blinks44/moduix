import { useListCollection } from '@ark-ui/solid/collection';
import { useFilter } from '@ark-ui/solid/locale';
import { Combobox } from '@moduix/solid/combobox';
import { For } from 'solid-js';
import styles from '@/components/examples/combobox/component-inline-autocomplete.module.css';

const seaCreatures = [
  { label: 'Whale', value: 'whale' },
  { label: 'Dolphin', value: 'dolphin' },
  { label: 'Shark', value: 'shark' },
  { label: 'Octopus', value: 'octopus' },
  { label: 'Jellyfish', value: 'jellyfish' },
  { label: 'Seahorse', value: 'seahorse' },
];

export default function InlineAutocompleteComboboxDemo() {
  const { startsWith } = useFilter({ sensitivity: 'base' })();
  const { collection, filter } = useListCollection({
    initialItems: seaCreatures,
    filter: startsWith,
  });

  return (
    <Combobox
      collection={collection()}
      inputBehavior="autocomplete"
      onInputValueChange={(details) => filter(details.inputValue)}
    >
      <Combobox.Label>Sea creature</Combobox.Label>
      <Combobox.Control>
        <Combobox.Input placeholder="e.g. Dolphin" />
        <Combobox.ClearTrigger aria-label="Clear selection" />
        <Combobox.Trigger aria-label="Open options" />
      </Combobox.Control>
      <Combobox.Positioner>
        <Combobox.Content class={styles.content}>
          <Combobox.Empty>No creatures found.</Combobox.Empty>
          <Combobox.List>
            <For each={collection().items}>
              {(item) => <Combobox.Option item={item}>{item.label}</Combobox.Option>}
            </For>
          </Combobox.List>
        </Combobox.Content>
      </Combobox.Positioner>
    </Combobox>
  );
}