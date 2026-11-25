import {
  Select,
  SelectDropdown,
  SelectField,
  SelectHiddenSelect,
  SelectItemGroup,
  SelectItemGroupLabel,
  SelectLabel,
  SelectOption,
  createListCollection,
} from '@moduix/react/select';

const fruits = createListCollection({
  items: [
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    { label: 'Blueberry', value: 'blueberry' },
  ],
});

export default function SelectDemo() {
  return (
    <Select collection={fruits}>
      <SelectLabel>Choose fruit</SelectLabel>
      <SelectField placeholder="Select an option" clearLabel="Clear selection" />
      <SelectDropdown>
        <SelectItemGroup>
          <SelectItemGroupLabel>Fruits</SelectItemGroupLabel>
          {fruits.items.map((item) => (
            <SelectOption key={item.value} item={item}>
              {item.label}
            </SelectOption>
          ))}
        </SelectItemGroup>
      </SelectDropdown>
      <SelectHiddenSelect />
    </Select>
  );
}