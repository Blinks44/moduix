import { Stack } from '@moduix/solid/stack';
import {
  ToggleGroupItem,
  ToggleGroupRootProvider,
  useToggleGroup,
} from '@moduix/solid/toggle-group';

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

export default function RootProviderToggleGroupDemo() {
  const toggleGroup = useToggleGroup({
    defaultValue: ['left'],
  });

  return (
    <Stack align="center" gap="3">
      <ToggleGroupRootProvider value={toggleGroup} aria-label="Text alignment">
        {alignmentItems.map((item) => (
          <ToggleGroupItem value={item.value}>{item.label}</ToggleGroupItem>
        ))}
      </ToggleGroupRootProvider>
      <div data-preview-meta>
        <output>Selected: {toggleGroup().value.join(', ') || 'empty'}</output>
      </div>
    </Stack>
  );
}