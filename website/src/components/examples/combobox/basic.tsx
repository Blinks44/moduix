import {
  Combobox,
  ComboboxDropdown,
  ComboboxEmpty,
  ComboboxField,
  ComboboxLabel,
  ComboboxList,
  ComboboxOption,
  useFilteredCollection,
} from '@moduix/react/combobox';

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
    <Combobox collection={collection} filter={filter}>
      <ComboboxLabel>Choose fruit</ComboboxLabel>
      <ComboboxField
        placeholder="e.g. Mango"
        clearLabel="Clear selection"
        triggerLabel="Open options"
      />
      <ComboboxDropdown>
        <ComboboxEmpty>No fruits found.</ComboboxEmpty>
        <ComboboxList>
          {collection.items.map((item) => (
            <ComboboxOption key={item.value} item={item}>
              {item.label}
            </ComboboxOption>
          ))}
        </ComboboxList>
      </ComboboxDropdown>
    </Combobox>
  );
}