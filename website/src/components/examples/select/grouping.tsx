import { createListCollection } from '@ark-ui/react/collection';
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
} from '@moduix/react/select';

const produce = createListCollection({
  items: [
    {
      label: 'Apple',
      value: 'apple',
      type: 'Fruits',
    },
    {
      label: 'Mango',
      value: 'mango',
      type: 'Fruits',
    },
    {
      label: 'Orange',
      value: 'orange',
      type: 'Fruits',
    },
    {
      label: 'Broccoli',
      value: 'broccoli',
      type: 'Vegetables',
    },
    {
      label: 'Carrot',
      value: 'carrot',
      type: 'Vegetables',
    },
    {
      label: 'Spinach',
      value: 'spinach',
      type: 'Vegetables',
    },
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
          {produce.group().map(([type, group]) => (
            <SelectItemGroup key={type}>
              <SelectItemGroupLabel>{type}</SelectItemGroupLabel>
              {group.map((item) => (
                <SelectItem key={item.value} item={item}>
                  <SelectItemText>{item.label}</SelectItemText>
                  <SelectItemIndicator />
                </SelectItem>
              ))}
            </SelectItemGroup>
          ))}
        </SelectContent>
      </SelectPositioner>
    </Select>
  );
}
