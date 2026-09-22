import { createListCollection } from '@ark-ui/solid/collection';
import {
  Select,
  SelectLabel,
  SelectField,
  SelectPositioner,
  SelectContent,
  SelectItemGroup,
  SelectItemGroupLabel,
  SelectItem,
  SelectItemText,
  SelectItemIndicator,
  SelectHiddenSelect,
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
      <SelectPositioner>
        <SelectContent>
          <SelectItemGroup>
            <SelectItemGroupLabel>Fruits</SelectItemGroupLabel>
            <For each={fruits.items}>
              {(item) => (
                <SelectItem item={item}>
                  <SelectItemText>{item.label}</SelectItemText>
                  <SelectItemIndicator />
                </SelectItem>
              )}
            </For>
          </SelectItemGroup>
        </SelectContent>
      </SelectPositioner>
      <SelectHiddenSelect />
    </Select>
  );
}
