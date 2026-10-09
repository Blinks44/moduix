import { useListCollection } from '@ark-ui/react/collection';
import { useFilter } from '@ark-ui/react/locale';
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
} from '@moduix/react/combobox';
import styles from '@/components/examples/combobox/component-custom-objects-and-grouping.module.css';

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

export default function GroupedComboboxDemo() {
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
      <ComboboxLabel>Country</ComboboxLabel>
      <ComboboxControl>
        <ComboboxInput placeholder="e.g. Canada" />
        <ComboboxClearTrigger aria-label="Clear selection" />
        <ComboboxTrigger aria-label="Open options" />
      </ComboboxControl>
      <ComboboxPositioner>
        <ComboboxContent className={styles.content}>
          <ComboboxEmpty>No countries found.</ComboboxEmpty>
          {collection.group().map(([continent, items]) => (
            <ComboboxItemGroup key={continent}>
              <ComboboxItemGroupLabel>{continent}</ComboboxItemGroupLabel>
              {items.map((item) => (
                <ComboboxOption key={item.code} item={item}>
                  {item.country}
                </ComboboxOption>
              ))}
            </ComboboxItemGroup>
          ))}
        </ComboboxContent>
      </ComboboxPositioner>
    </Combobox>
  );
}