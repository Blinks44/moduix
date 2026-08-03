import { createListCollection } from '@ark-ui/react/collection';
import { Select } from '@moduix/react/select';
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
      <Select.Label>Choose fruit</Select.Label>
      <Select.Field placeholder="Select an option" clearLabel="Clear selection" />
      <Select.Positioner>
        <Select.Content>
          {fruits.items.map((item) => {
            const FruitIcon = item.icon;

            return (
              <Select.Item key={item.value} item={item}>
                <Select.ItemText>
                  <Select.ItemTextContent>
                    <Select.ItemTextIcon>
                      <FruitIcon aria-hidden />
                    </Select.ItemTextIcon>
                    <Select.ItemTextLabel>{item.label}</Select.ItemTextLabel>
                  </Select.ItemTextContent>
                </Select.ItemText>
                <Select.ItemIndicator />
              </Select.Item>
            );
          })}
        </Select.Content>
      </Select.Positioner>
    </Select>
  );
}