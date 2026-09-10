import { createListCollection } from '@ark-ui/solid/collection';
import { Select } from '@moduix/solid/select';
import { createMemo, createSignal, For } from 'solid-js';

const languages = [
  { label: 'C#', value: 'csharp' },
  { label: 'Go', value: 'go' },
  { label: 'JavaScript', value: 'javascript' },
  { label: 'Python', value: 'python' },
  { label: 'Rust', value: 'rust' },
  { label: 'TypeScript', value: 'typescript' },
];

export default function SelectMaxSelectionDemo() {
  const [value, setValue] = createSignal<string[]>(['javascript']);
  const collection = createMemo(() =>
    createListCollection({
      items: languages.map((item) => ({
        ...item,
        disabled: value().length >= 3 && !value().includes(item.value),
      })),
    }),
  );

  return (
    <Select
      collection={collection()}
      multiple
      value={value()}
      onValueChange={(details) => {
        if (details.value.length <= 3) setValue(details.value);
      }}
    >
      <Select.Label>Languages</Select.Label>
      <Select.Field placeholder="Select up to 3" clearLabel="Clear selection" />
      <Select.Positioner>
        <Select.Content>
          <For each={collection().items}>
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