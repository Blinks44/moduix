import { createListCollection } from '@ark-ui/react/collection';
import {
  Select,
  SelectLabel,
  SelectField,
  SelectPositioner,
  SelectContent,
  SelectItem,
  SelectItemText,
  SelectItemTextContent,
  SelectItemTextIcon,
  SelectItemTextLabel,
  SelectItemIndicator,
} from '@moduix/react/select';
import { Apple as AppleIcon, Banana as BananaIcon, Cherry as CherryIcon } from 'lucide-react';

const fruits = createListCollection({
  items: [
    { label: 'Apple', value: 'apple', icon: AppleIcon },
    { label: 'Banana', value: 'banana', icon: BananaIcon },
    { label: 'Blueberry', value: 'blueberry', icon: CherryIcon },
  ],
});

export default function SelectCustomItemLayoutDemo() {
  return (
    <Select collection={fruits}>
      <SelectLabel>Choose fruit</SelectLabel>
      <SelectField placeholder="Select an option" clearLabel="Clear selection" />
      <SelectPositioner>
        <SelectContent>
          {fruits.items.map((item) => {
            const FruitIcon = item.icon;

            return (
              <SelectItem key={item.value} item={item}>
                <SelectItemText>
                  <SelectItemTextContent>
                    <SelectItemTextIcon>
                      <FruitIcon aria-hidden />
                    </SelectItemTextIcon>
                    <SelectItemTextLabel>{item.label}</SelectItemTextLabel>
                  </SelectItemTextContent>
                </SelectItemText>
                <SelectItemIndicator />
              </SelectItem>
            );
          })}
        </SelectContent>
      </SelectPositioner>
    </Select>
  );
}