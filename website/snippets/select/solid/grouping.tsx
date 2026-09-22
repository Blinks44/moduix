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
} from '@moduix/solid/select';
import { For } from 'solid-js';

const produce = createListCollection({
  items: [
    { label: 'Apple', value: 'apple', type: 'Fruits' },
    { label: 'Mango', value: 'mango', type: 'Fruits' },
    { label: 'Orange', value: 'orange', type: 'Fruits' },
    { label: 'Broccoli', value: 'broccoli', type: 'Vegetables' },
    { label: 'Carrot', value: 'carrot', type: 'Vegetables' },
    { label: 'Spinach', value: 'spinach', type: 'Vegetables' },
  ],
  groupBy: (item) => item.type,
});

export default function SelectGroupingDemo() {
  return (
    <Select collection={produce}>
      <SelectLabel>Choose produce</SelectLabel>
      <SelectField placeholder="Select item" clearLabel="Clear selection" />
      <SelectPositioner>
        <SelectContent>
          <For each={produce.group()}>
            {([type, group]) => (
              <SelectItemGroup>
                <SelectItemGroupLabel>{type}</SelectItemGroupLabel>
                <For each={group}>
                  {(item) => (
                    <SelectItem item={item}>
                      <SelectItemText>{item.label}</SelectItemText>
                      <SelectItemIndicator />
                    </SelectItem>
                  )}
                </For>
              </SelectItemGroup>
            )}
          </For>
        </SelectContent>
      </SelectPositioner>
    </Select>
  );
}
