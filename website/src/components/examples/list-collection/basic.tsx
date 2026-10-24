import { createListCollection } from '@ark-ui/react/collection';
import {
  Select,
  SelectLabel,
  SelectField,
  SelectPositioner,
  SelectContent,
  SelectItemGroup,
  SelectItemGroupLabel,
  SelectHiddenSelect,
  SelectOption,
} from '@moduix/react/select';

const fruits = createListCollection({
  items: [
    {
      label: 'Apple',
      value: 'apple',
    },
    {
      label: 'Banana',
      value: 'banana',
    },
    {
      label: 'Blueberry',
      value: 'blueberry',
    },
  ],
});

export default function ListCollectionDemo() {
  return (
    <Select collection={fruits}>
      <SelectLabel>Choose fruit</SelectLabel>
      <SelectField placeholder="Select an option" clearLabel="Clear selection" />
      <SelectPositioner>
        <SelectContent>
          <SelectItemGroup>
            <SelectItemGroupLabel>Fruits</SelectItemGroupLabel>
            {fruits.items.map((item) => (
              <SelectOption key={item.value} item={item}>
                {item.label}
              </SelectOption>
            ))}
          </SelectItemGroup>
        </SelectContent>
      </SelectPositioner>
      <SelectHiddenSelect />
    </Select>
  );
}