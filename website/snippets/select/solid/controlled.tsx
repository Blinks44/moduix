import { createListCollection } from '@ark-ui/solid/collection';
import { Select } from '@moduix/solid/select';
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
      <Select.Label>Theme</Select.Label>
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder="Select theme" />
        </Select.Trigger>
        <Select.Indicator />
        <Select.ClearTrigger aria-label="Clear selection" />
      </Select.Control>
      <Select.Positioner>
        <Select.Content>
          <For each={themes.items}>
            {(item) => (
              <Select.Item item={item}>
                <Select.ItemText>{item.label}</Select.ItemText>
                <Select.ItemIndicator />
              </Select.Item>
            )}
          </For>
        </Select.Content>
      </Select.Positioner>
    </Select>
  );
}