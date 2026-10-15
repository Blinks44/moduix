import { useListCollection } from '@ark-ui/react/collection';
import { useFilter } from '@ark-ui/react/locale';
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
} from '@moduix/react/combobox';

const seaCreatures = [
  { label: 'Whale', value: 'whale' },
  { label: 'Dolphin', value: 'dolphin' },
  { label: 'Shark', value: 'shark' },
  { label: 'Octopus', value: 'octopus' },
  { label: 'Jellyfish', value: 'jellyfish' },
  { label: 'Seahorse', value: 'seahorse' },
];

export default function InlineAutocompleteComboboxDemo() {
  const { startsWith } = useFilter({ sensitivity: 'base' });
  const { collection, filter } = useListCollection({
    initialItems: seaCreatures,
    filter: startsWith,
  });

  return (
    <Combobox
      collection={collection}
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
        <ComboboxContent>
          <ComboboxEmpty>No creatures found.</ComboboxEmpty>
          <ComboboxList>
            {collection.items.map((item) => (
              <ComboboxOption key={item.value} item={item}>
                {item.label}
              </ComboboxOption>
            ))}
          </ComboboxList>
        </ComboboxContent>
      </ComboboxPositioner>
    </Combobox>
  );
}