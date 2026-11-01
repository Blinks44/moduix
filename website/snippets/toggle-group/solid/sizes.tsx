import { Stack } from '@moduix/solid/stack';
import { ToggleGroup, ToggleGroupItem } from '@moduix/solid/toggle-group';
import { For } from 'solid-js';

const sizes = ['xs', 'sm', 'md', 'lg'] as const;
const alignmentItems = [
  { value: 'left', label: 'Left' },
  { value: 'center', label: 'Center' },
  { value: 'right', label: 'Right' },
];

export default function SizesToggleGroupDemo() {
  return (
    <Stack align="center" gap="3">
      <For each={sizes}>
        {(size) => (
          <ToggleGroup size={size} defaultValue={['left']} aria-label={`Text alignment, ${size}`}>
            <For each={alignmentItems}>
              {(item) => <ToggleGroupItem value={item.value}>{item.label}</ToggleGroupItem>}
            </For>
          </ToggleGroup>
        )}
      </For>
    </Stack>
  );
}