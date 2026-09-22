import { createListCollection } from '@ark-ui/react/collection';
import {
  useSelect,
  SelectRootProvider,
  SelectLabel,
  SelectControl,
  SelectTrigger,
  SelectValueText,
  SelectIndicator,
  SelectClearTrigger,
  SelectPositioner,
  SelectContent,
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
    {
      label: 'Grape',
      value: 'grape',
    },
    {
      label: 'Kiwi',
      value: 'kiwi',
    },
    {
      label: 'Mango',
      value: 'mango',
    },
    {
      label: 'Orange',
      value: 'orange',
    },
    {
      label: 'Pineapple',
      value: 'pineapple',
    },
    {
      label: 'Strawberry',
      value: 'strawberry',
    },
    {
      label: 'Watermelon',
      value: 'watermelon',
    },
  ],
});

export default function SelectSelectOnHighlightDemo() {
  const select = useSelect({
    collection: fruits,
    onHighlightChange({ highlightedValue }) {
      if (highlightedValue) select.selectValue(highlightedValue);
    },
  });

  return (
    <SelectRootProvider value={select}>
      <SelectLabel>Choose fruit</SelectLabel>
      <SelectControl>
        <SelectTrigger>
          <SelectValueText placeholder="Select an option" />
        </SelectTrigger>
        <SelectIndicator />
        <SelectClearTrigger aria-label="Clear selection" />
      </SelectControl>
      <SelectPositioner>
        <SelectContent>
          {fruits.items.map((item) => (
            <SelectItem key={item.value} item={item}>
              <SelectItemText>{item.label}</SelectItemText>
              <SelectItemIndicator />
            </SelectItem>
          ))}
        </SelectContent>
      </SelectPositioner>
    </SelectRootProvider>
  );
}