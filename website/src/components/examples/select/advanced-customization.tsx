import { createListCollection } from '@ark-ui/react/collection';
import {
  Select,
  SelectLabel,
  SelectControl,
  SelectTrigger,
  SelectValueText,
  SelectClearTrigger,
  SelectIndicator,
  SelectPositioner,
  SelectContent,
  SelectItemGroup,
  SelectItemGroupLabel,
  SelectItem,
  SelectItemText,
  SelectItemIndicator,
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

export default function AdvancedCustomizationSelectDemo() {
  return (
    <Select collection={fruits}>
      <SelectLabel>Choose fruit</SelectLabel>
      <SelectControl>
        <SelectTrigger>
          <SelectValueText placeholder="Select an option" />
        </SelectTrigger>
        <SelectClearTrigger aria-label="Clear selection" />
        <SelectIndicator />
      </SelectControl>
      <SelectPositioner>
        <SelectContent>
          <SelectItemGroup>
            <SelectItemGroupLabel>Fruits</SelectItemGroupLabel>
            {fruits.items.map((item) => (
              <SelectItem key={item.value} item={item}>
                <SelectItemText>{item.label}</SelectItemText>
                <SelectItemIndicator />
              </SelectItem>
            ))}
          </SelectItemGroup>
        </SelectContent>
      </SelectPositioner>
    </Select>
  );
}
