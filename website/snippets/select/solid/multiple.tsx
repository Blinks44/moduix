import { createListCollection } from '@ark-ui/solid/collection';
import { Select } from '@moduix/solid/select';
import { For } from 'solid-js';

const languages = createListCollection({
  items: [
    { label: 'C#', value: 'csharp' },
    { label: 'Go', value: 'go' },
    { label: 'JavaScript', value: 'javascript' },
    { label: 'Python', value: 'python' },
    { label: 'Rust', value: 'rust' },
    { label: 'TypeScript', value: 'typescript' },
  ],
});

export default function SelectMultipleDemo() {
  return (
    <Select collection={languages} multiple defaultValue={['javascript', 'typescript']}>
      <Select.Label>Languages</Select.Label>
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder="Select languages" />
        </Select.Trigger>
        <Select.Indicator />
        <Select.ClearTrigger aria-label="Clear selection" />
      </Select.Control>
      <Select.Positioner>
        <Select.Content>
          <For each={languages.items}>
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