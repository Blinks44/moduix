import { createListCollection } from '@ark-ui/solid/collection';
import {
  Select,
  SelectLabel,
  SelectControl,
  SelectTrigger,
  SelectValueText,
  SelectIndicator,
  SelectClearTrigger,
  SelectPositioner,
  SelectContent,
  SelectOption,
} from '@moduix/solid/select';
import { createSignal, For } from 'solid-js';

const themes = createListCollection({
  items: [
    { label: 'System', value: 'system' },
    { label: 'Light', value: 'light' },
    { label: 'Dark', value: 'dark' },
  ],
});

export default function SelectControlledDemo() {
  const [value, setValue] = createSignal<string[]>(['light']);

  return (
    <Select
      collection={themes}
      value={value()}
      onValueChange={(details) => setValue(details.value)}
    >
      <SelectLabel>Theme</SelectLabel>
      <SelectControl>
        <SelectTrigger>
          <SelectValueText placeholder="Select theme" />
        </SelectTrigger>
        <SelectIndicator />
        <SelectClearTrigger aria-label="Clear selection" />
      </SelectControl>
      <SelectPositioner>
        <SelectContent>
          <For each={themes.items}>
            {(item) => <SelectOption item={item}>{item.label}</SelectOption>}
          </For>
        </SelectContent>
      </SelectPositioner>
    </Select>
  );
}