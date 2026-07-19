//#region demo
import { useListCollection } from '@ark-ui/react/collection';
import { useFilter } from '@ark-ui/react/locale';
import { Combobox } from '@moduix/react';

const countries = [
  { country: 'Canada', code: 'CA', continent: 'North America' },
  {
    country: 'United States',
    code: 'US',
    continent: 'North America',
  },
  { country: 'Germany', code: 'DE', continent: 'Europe' },
  { country: 'France', code: 'FR', continent: 'Europe' },
  { country: 'Japan', code: 'JP', continent: 'Asia' },
  { country: 'South Korea', code: 'KR', continent: 'Asia' },
];

export function GroupedComboboxDemo() {
  const { contains } = useFilter({ sensitivity: 'base' });
  const { collection, filter } = useListCollection({
    initialItems: countries,
    itemToString: (item) => item.country,
    itemToValue: (item) => item.code,
    filter: contains,
    groupBy: (item) => item.continent,
  });

  return (
    <Combobox collection={collection} onInputValueChange={(details) => filter(details.inputValue)}>
      <Combobox.Label>Country</Combobox.Label>
      <Combobox.Control>
        <Combobox.Input placeholder="e.g. Canada" />
        <Combobox.ClearTrigger aria-label="Clear selection" />
        <Combobox.Trigger aria-label="Open options" />
      </Combobox.Control>
      <Combobox.Positioner>
        <Combobox.Content>
          <Combobox.Empty>No countries found.</Combobox.Empty>
          {collection.group().map(([continent, items]) => (
            <Combobox.ItemGroup key={continent}>
              <Combobox.ItemGroupLabel>{continent}</Combobox.ItemGroupLabel>
              {items.map((item) => (
                <Combobox.Option key={item.code} item={item}>
                  {item.country}
                </Combobox.Option>
              ))}
            </Combobox.ItemGroup>
          ))}
        </Combobox.Content>
      </Combobox.Positioner>
    </Combobox>
  );
}
//#endregion