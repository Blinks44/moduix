import { useListCollection } from '@ark-ui/solid/collection';
import { useFilter } from '@ark-ui/solid/locale';
import {
  Combobox,
  ComboboxClearTrigger,
  ComboboxContent,
  ComboboxControl,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxLabel,
  ComboboxList,
  ComboboxOption,
  ComboboxPositioner,
  ComboboxTrigger,
} from '@moduix/solid/combobox';
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
      <ComboboxLabel>Sea creature</ComboboxLabel>
      <ComboboxControl>
        <ComboboxInput placeholder="e.g. Dolphin" />
        <ComboboxClearTrigger aria-label="Clear selection" />
        <ComboboxTrigger aria-label="Open options" />
      </ComboboxControl>
      <ComboboxPositioner>
        <ComboboxContent class={styles.content}>
          <ComboboxEmpty>No creatures found.</ComboboxEmpty>
          <ComboboxList>
            <For each={collection().items}>
              {(item) => <ComboboxOption item={item}>{item.label}</ComboboxOption>}
            </For>
          </ComboboxList>
        </ComboboxContent>
      </ComboboxPositioner>
    </Combobox>
  );
}