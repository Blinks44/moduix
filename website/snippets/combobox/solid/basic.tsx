import {
  Combobox,
  ComboboxDropdown,
  ComboboxEmpty,
  ComboboxField,
  ComboboxLabel,
  ComboboxList,
  ComboboxOption,
  useFilteredCollection,
} from '@moduix/solid/combobox';
import { For } from 'solid-js';

const fruits = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Mango', value: 'mango' },
];

export default function ComboboxDemo() {
  const { collection, filter } = useFilteredCollection({
    initialItems: fruits,
  });

  return (
    <Combobox collection={collection()} filter={filter}>
      <ComboboxLabel>Choose fruit</ComboboxLabel>
      <ComboboxField
        placeholder="e.g. Mango"
        clearLabel="Clear selection"
        triggerLabel="Open options"
      />
      <ComboboxDropdown>
        <ComboboxEmpty>No fruits found.</ComboboxEmpty>
        <ComboboxList>
          <For each={collection().items}>
            {(item) => <ComboboxOption item={item}>{item.label}</ComboboxOption>}
          </For>
        </ComboboxList>
      </ComboboxDropdown>
    </Combobox>
  );
}