import { createListCollection } from '@ark-ui/solid/collection';
import { CloseButton } from '@moduix/solid/close-button';
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
} from '@moduix/solid/select';
import { Check as CheckIcon, ChevronsUpDown as ChevronsUpDownIcon, X as XIcon } from 'lucide-solid';
import { For } from 'solid-js';

const fruits = createListCollection({
  items: [
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    { label: 'Blueberry', value: 'blueberry' },
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
        <SelectClearTrigger
          aria-label="Clear selection"
          asChild={(props) => (
            <CloseButton {...props()}>
              <XIcon strokeWidth={3} />
            </CloseButton>
          )}
        />
        <SelectIndicator>
          <ChevronsUpDownIcon strokeWidth={3} />
        </SelectIndicator>
      </SelectControl>
      <SelectPositioner>
        <SelectContent>
          <SelectItemGroup>
            <SelectItemGroupLabel>Fruits</SelectItemGroupLabel>
            <For each={fruits.items}>
              {(item) => (
                <SelectItem item={item}>
                  <SelectItemText>{item.label}</SelectItemText>
                  <SelectItemIndicator>
                    <CheckIcon strokeWidth={3} />
                  </SelectItemIndicator>
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