import { useListCollection } from '@ark-ui/solid/collection';
import { useFilter } from '@ark-ui/solid/locale';
import { Combobox } from '@moduix/solid/combobox';
import { For } from 'solid-js';
import styles from '@/components/examples/combobox/component-custom-objects-and-grouping.module.css';

const countries = [
  { country: 'Canada', code: 'CA', continent: 'North America' },
  { country: 'United States', code: 'US', continent: 'North America' },
  { country: 'Germany', code: 'DE', continent: 'Europe' },
  { country: 'France', code: 'FR', continent: 'Europe' },
  { country: 'Japan', code: 'JP', continent: 'Asia' },
  { country: 'South Korea', code: 'KR', continent: 'Asia' },
];

export default function GroupedComboboxDemo() {
  const { contains } = useFilter({ sensitivity: 'base' })();
  const { collection, filter } = useListCollection({
    initialItems: countries,
    itemToString: (item) => item.country,
    itemToValue: (item) => item.code,
    filter: contains,
    groupBy: (item) => item.continent,
  });

  return (
    <Combobox
      collection={collection()}
      onInputValueChange={(details) => filter(details.inputValue)}
    >
      <Combobox.Label>Country</Combobox.Label>
      <Combobox.Control>
        <Combobox.Input placeholder="e.g. Canada" />
        <Combobox.ClearTrigger aria-label="Clear selection" />
        <Combobox.Trigger aria-label="Open options" />
      </Combobox.Control>
      <Combobox.Positioner>
        <Combobox.Content class={styles.content}>
          <Combobox.Empty>No countries found.</Combobox.Empty>
          <For each={collection().group()}>
            {(group) => {
              const [continent, items] = group;

              return (
                <Combobox.ItemGroup>
                  <Combobox.ItemGroupLabel>{continent}</Combobox.ItemGroupLabel>
                  <For each={items}>
                    {(item) => <Combobox.Option item={item}>{item.country}</Combobox.Option>}
                  </For>
                </Combobox.ItemGroup>
              );
            }}
          </For>
        </Combobox.Content>
      </Combobox.Positioner>
    </Combobox>
  );
}