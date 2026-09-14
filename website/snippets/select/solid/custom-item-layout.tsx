import { createListCollection } from '@ark-ui/solid/collection';
import { Select } from '@moduix/solid/select';
import { Apple as AppleIcon, Banana as BananaIcon, Cherry as CherryIcon } from 'lucide-solid';
import { For } from 'solid-js';
import { Dynamic } from 'solid-js/web';

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
          <For each={fruits.items}>
            {(item) => (
              <Select.Item item={item}>
                <Select.ItemText>
                  <Select.ItemTextContent>
                    <Select.ItemTextIcon>
                      <Dynamic component={item.icon} aria-hidden />
                    </Select.ItemTextIcon>
                    <Select.ItemTextLabel>{item.label}</Select.ItemTextLabel>
                  </Select.ItemTextContent>
                </Select.ItemText>
                <Select.ItemIndicator />
              </Select.Item>
            )}
          </For>
        </Select.Content>
      </Select.Positioner>
    </Select>
  );
}