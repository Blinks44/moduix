import { Stack } from '@moduix/react/stack';
import { ToggleGroup, ToggleGroupItem } from '@moduix/react/toggle-group';

const items = [
  {
    value: 'one',
    label: 'One',
  },
  {
    value: 'two',
    label: 'Two',
  },
  {
    value: 'three',
    label: 'Three',
  },
];

export default function ToggleGroupVariantsDemo() {
  return (
    <Stack align="center" gap="3">
      <ToggleGroup defaultValue={['one']} aria-label="Default variant">
        {items.map((item) => (
          <ToggleGroupItem key={item.value} value={item.value}>
            {item.label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
      <ToggleGroup defaultValue={['one']} aria-label="Outline variant" variant="outline">
        {items.map((item) => (
          <ToggleGroupItem key={item.value} value={item.value}>
            {item.label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
      <ToggleGroup defaultValue={['one']} aria-label="Ghost variant" variant="ghost">
        {items.map((item) => (
          <ToggleGroupItem key={item.value} value={item.value}>
            {item.label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </Stack>
  );
}