import { createListCollection } from '@ark-ui/solid/collection';
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
} from '@moduix/solid/select';
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
      <SelectLabel>Choose fruit</SelectLabel>
      <SelectField placeholder="Select an option" clearLabel="Clear selection" />
      <SelectPositioner>
        <SelectContent>
          <For each={fruits.items}>
            {(item) => (
              <SelectItem item={item}>
                <SelectItemText>
                  <SelectItemTextContent>
                    <SelectItemTextIcon>
                      <Dynamic component={item.icon} aria-hidden />
                    </SelectItemTextIcon>
                    <SelectItemTextLabel>{item.label}</SelectItemTextLabel>
                  </SelectItemTextContent>
                </SelectItemText>
                <SelectItemIndicator />
              </SelectItem>
            )}
          </For>
        </SelectContent>
      </SelectPositioner>
    </Select>
  );
}
