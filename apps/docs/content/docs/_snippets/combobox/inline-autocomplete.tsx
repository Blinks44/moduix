//#region demo
import { useListCollection } from '@ark-ui/react/collection';
import { useFilter } from '@ark-ui/react/locale';
import { Combobox } from '@moduix/react';

const seaCreatures = [
  { label: 'Whale', value: 'whale' },
  { label: 'Dolphin', value: 'dolphin' },
  { label: 'Shark', value: 'shark' },
  { label: 'Octopus', value: 'octopus' },
  { label: 'Jellyfish', value: 'jellyfish' },
  { label: 'Seahorse', value: 'seahorse' },
];

export function InlineAutocompleteComboboxDemo() {
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
      <Combobox.Label>Sea creature</Combobox.Label>
      <Combobox.Control>
        <Combobox.Input placeholder="e.g. Dolphin" />
        <Combobox.ClearTrigger aria-label="Clear selection" />
        <Combobox.Trigger aria-label="Open options" />
      </Combobox.Control>
      <Combobox.Positioner>
        <Combobox.Content>
          <Combobox.Empty>No creatures found.</Combobox.Empty>
          <Combobox.List>
            {collection.items.map((item) => (
              <Combobox.Option key={item.value} item={item}>
                {item.label}
              </Combobox.Option>
            ))}
          </Combobox.List>
        </Combobox.Content>
      </Combobox.Positioner>
    </Combobox>
  );
}
//#endregion