import { useListCollection } from '@ark-ui/solid/collection';
import { useFilter } from '@ark-ui/solid/locale';
import {
  Combobox,
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
import styles from '@/components/examples/combobox/component-limit-results.module.css';

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

export default function LimitComboboxDemo() {
  const { contains } = useFilter({ sensitivity: 'base' })();
  const { collection, filter } = useListCollection({
    initialItems: cities,
    filter: contains,
    limit: 5,
  });

  return (
    <Combobox
      collection={collection()}
      onInputValueChange={(details) => filter(details.inputValue)}
    >
      <ComboboxLabel>City</ComboboxLabel>
      <ComboboxControl>
        <ComboboxInput placeholder="e.g. San" />
        <ComboboxTrigger aria-label="Open options" />
      </ComboboxControl>
      <ComboboxPositioner>
        <ComboboxContent class={styles.content}>
          <ComboboxEmpty>No cities found.</ComboboxEmpty>
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