import { ToggleGroup } from '@moduix/solid/toggle-group';

const viewItems = [
  {
    value: 'list',
    label: 'List',
  },
  {
    value: 'grid',
    label: 'Grid',
  },
  {
    value: 'map',
    label: 'Map',
  },
];

export default function VerticalToggleGroupDemo() {
  return (
    <ToggleGroup
      defaultValue={['list']}
      orientation="vertical"
      aria-label="View mode"
      variant="outline"
    >
      {viewItems.map((item) => (
        <ToggleGroup.Item value={item.value}>{item.label}</ToggleGroup.Item>
      ))}
    </ToggleGroup>
  );
}