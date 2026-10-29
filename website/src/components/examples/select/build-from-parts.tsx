import { createListCollection } from '@ark-ui/react/collection';
import { CloseButton } from '@moduix/react/close-button';
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
  SelectHiddenSelect,
} from '@moduix/react/select';
import { Check as CheckIcon, ChevronsUpDown as ChevronsUpDownIcon, X as XIcon } from 'lucide-react';

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

export default function BuildFromPartsSelectDemo() {
  return (
    <Select collection={fruits}>
      <SelectLabel>Choose fruit</SelectLabel>
      <SelectControl>
        <SelectTrigger>
          <SelectValueText placeholder="Select an option" />
        </SelectTrigger>
        <SelectClearTrigger asChild aria-label="Clear selection">
          <CloseButton>
            <XIcon strokeWidth={3} />
          </CloseButton>
        </SelectClearTrigger>
        <SelectIndicator>
          <ChevronsUpDownIcon strokeWidth={3} />
        </SelectIndicator>
      </SelectControl>
      <SelectPositioner>
        <SelectContent>
          <SelectItemGroup>
            <SelectItemGroupLabel>Fruits</SelectItemGroupLabel>
            {fruits.items.map((item) => (
              <SelectItem key={item.value} item={item}>
                <SelectItemText>{item.label}</SelectItemText>
                <SelectItemIndicator>
                  <CheckIcon strokeWidth={3} />
                </SelectItemIndicator>
              </SelectItem>
            ))}
          </SelectItemGroup>
        </SelectContent>
      </SelectPositioner>
      <SelectHiddenSelect />
    </Select>
  );
}