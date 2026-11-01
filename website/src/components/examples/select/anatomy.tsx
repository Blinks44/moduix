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

// Anatomy scene: the basic example kept open and inline so every part can be outlined.
export default function SelectAnatomy() {
  return (
    <div
      style={{
        minHeight: 220,
        width: '100%',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
      }}
    >
      <Select open portalled={false} collection={fruits}>
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
    </div>
  );
}