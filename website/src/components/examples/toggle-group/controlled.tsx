import { Stack } from '@moduix/react/stack';
import { ToggleGroup, ToggleGroupItem } from '@moduix/react/toggle-group';
import { useState } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';

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
      <PreviewMeta>
        <output>Selected: {value.join(', ') || 'empty'}</output>
      </PreviewMeta>
    </Stack>
  );
}