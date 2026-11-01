import { Stack } from '@moduix/solid/stack';
import { ToggleGroup, ToggleGroupItem } from '@moduix/solid/toggle-group';

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
          <ToggleGroupItem value={item.value}>{item.label}</ToggleGroupItem>
        ))}
      </ToggleGroup>
      <ToggleGroup defaultValue={['one']} aria-label="Outline variant" variant="outline">
        {items.map((item) => (
          <ToggleGroupItem value={item.value}>{item.label}</ToggleGroupItem>
        ))}
      </ToggleGroup>
      <ToggleGroup defaultValue={['one']} aria-label="Ghost variant" variant="ghost">
        {items.map((item) => (
          <ToggleGroupItem value={item.value}>{item.label}</ToggleGroupItem>
        ))}
      </ToggleGroup>
    </Stack>
  );
}