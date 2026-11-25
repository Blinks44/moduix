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
} from '@moduix/solid/select';
import { For } from 'solid-js';

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
          <For each={fruits.items}>
            {(item) => <SelectOption item={item}>{item.label}</SelectOption>}
          </For>
        </SelectItemGroup>
      </SelectDropdown>
      <SelectHiddenSelect />
    </Select>
  );
}