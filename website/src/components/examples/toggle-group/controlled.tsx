import { Stack } from '@moduix/react/stack';
import { ToggleGroup, ToggleGroupItem } from '@moduix/react/toggle-group';
import { useState } from 'react';

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
  const [value, setValue] = useState(['left'] as string[]);
  return (
    <Stack align="center" gap="3">
      <ToggleGroup
        value={value}
        onValueChange={(details) => setValue(details.value)}
        aria-label="Text alignment"
      >
        {alignmentItems.map((item) => (
          <ToggleGroupItem key={item.value} value={item.value}>
            {item.label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
      <div data-preview-meta>
        <output>Selected: {value.join(', ') || 'empty'}</output>
      </div>
    </Stack>
  );
}