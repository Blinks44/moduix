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
import styles from '@/components/examples/combobox/component-auto-highlight.module.css';

const departments = [
  { label: 'Engineering', value: 'engineering' },
  { label: 'Marketing', value: 'marketing' },
  { label: 'Sales', value: 'sales' },
  { label: 'Finance', value: 'finance' },
  { label: 'Human Resources', value: 'human-resources' },
  { label: 'Operations', value: 'operations' },
];

export default function AutoHighlightComboboxDemo() {
  const { contains } = useFilter({ sensitivity: 'base' })();
  const { collection, filter } = useListCollection({
    initialItems: departments,
    filter: contains,
  });

  return (
    <Combobox
      collection={collection()}
      inputBehavior="autohighlight"
      onInputValueChange={(details) => filter(details.inputValue)}
    >
      <ComboboxLabel>Department</ComboboxLabel>
      <ComboboxControl>
        <ComboboxInput placeholder="e.g. Engineering" />
        <ComboboxClearTrigger aria-label="Clear selection" />
        <ComboboxTrigger aria-label="Open options" />
      </ComboboxControl>
      <ComboboxPositioner>
        <ComboboxContent class={styles.content}>
          <ComboboxEmpty>No departments found.</ComboboxEmpty>
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