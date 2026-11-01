import { Stack } from '@moduix/solid/stack';
import { ToggleGroup, ToggleGroupItem } from '@moduix/solid/toggle-group';
import { createSignal } from 'solid-js';

const alignmentItems = [
  {
    value: 'left',
    label: 'Left',
  },
  {
    value: 'center',
    label: 'Center',
  },
  {
    value: 'right',
    label: 'Right',
  },
];

export default function ControlledToggleGroupDemo() {
  const [value, setValue] = createSignal<string[]>(['left']);

  return (
    <Stack align="center" gap="3">
      <ToggleGroup
        value={value()}
        onValueChange={(details) => setValue(details.value)}
        aria-label="Text alignment"
      >
        {alignmentItems.map((item) => (
          <ToggleGroupItem value={item.value}>{item.label}</ToggleGroupItem>
        ))}
      </ToggleGroup>
      <div data-preview-meta>
        <output>Selected: {value().join(', ') || 'empty'}</output>
      </div>
    </Stack>
  );
}