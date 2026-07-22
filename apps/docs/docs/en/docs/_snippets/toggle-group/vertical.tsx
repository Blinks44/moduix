import { ToggleGroup } from '@moduix/react';

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
        <ToggleGroup.Item key={item.value} value={item.value}>
          {item.label}
        </ToggleGroup.Item>
      ))}
    </ToggleGroup>
  );
}