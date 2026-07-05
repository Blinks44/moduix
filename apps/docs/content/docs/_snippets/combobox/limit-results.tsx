//#region demo
import { useListCollection } from '@ark-ui/react/collection';
import { useFilter } from '@ark-ui/react/locale';
import { Combobox } from '@moduix/react';

const cities = [
  'New York',
  'Los Angeles',
  'Chicago',
  'Houston',
  'Phoenix',
  'Philadelphia',
  'San Antonio',
  'San Diego',
  'Dallas',
  'San Jose',
  'Austin',
  'Jacksonville',
].map((label) => ({
  label,
  value: label.toLowerCase().replaceAll(' ', '-'),
}));

export function LimitComboboxDemo() {
  const { contains } = useFilter({ sensitivity: 'base' });
  const { collection, filter } = useListCollection({
    initialItems: cities,
    filter: contains,
    limit: 5,
  });

  return (
    <Combobox collection={collection} onInputValueChange={(details) => filter(details.inputValue)}>
      <Combobox.Label>City</Combobox.Label>
      <Combobox.Control>
        <Combobox.Input placeholder="e.g. San" />
        <Combobox.Trigger aria-label="Open options" />
      </Combobox.Control>
      <Combobox.Positioner>
        <Combobox.Content>
          <Combobox.Empty>No cities found.</Combobox.Empty>
          <Combobox.List>
            {collection.items.map((item) => (
              <Combobox.Item key={item.value} item={item}>
                <Combobox.ItemText>{item.label}</Combobox.ItemText>
                <Combobox.ItemIndicator />
              </Combobox.Item>
            ))}
          </Combobox.List>
        </Combobox.Content>
      </Combobox.Positioner>
    </Combobox>
  );
}
//#endregion