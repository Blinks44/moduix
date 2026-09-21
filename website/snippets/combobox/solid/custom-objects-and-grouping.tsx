import { useListCollection } from '@ark-ui/solid/collection';
import { useFilter } from '@ark-ui/solid/locale';
import {
  Combobox,
  ComboboxClearTrigger,
  ComboboxContent,
  ComboboxControl,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItemGroup,
  ComboboxItemGroupLabel,
  ComboboxLabel,
  ComboboxOption,
  ComboboxPositioner,
  ComboboxTrigger,
} from '@moduix/solid/combobox';
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
      <ComboboxLabel>Country</ComboboxLabel>
      <ComboboxControl>
        <ComboboxInput placeholder="e.g. Canada" />
        <ComboboxClearTrigger aria-label="Clear selection" />
        <ComboboxTrigger aria-label="Open options" />
      </ComboboxControl>
      <ComboboxPositioner>
        <ComboboxContent class={styles.content}>
          <ComboboxEmpty>No countries found.</ComboboxEmpty>
          <For each={collection().group()}>
            {(group) => {
              const [continent, items] = group;

              return (
                <ComboboxItemGroup>
                  <ComboboxItemGroupLabel>{continent}</ComboboxItemGroupLabel>
                  <For each={items}>
                    {(item) => <ComboboxOption item={item}>{item.country}</ComboboxOption>}
                  </For>
                </ComboboxItemGroup>
              );
            }}
          </For>
        </ComboboxContent>
      </ComboboxPositioner>
    </Combobox>
  );
}