import { ToggleGroup, ToggleGroupItem } from '@moduix/react/toggle-group';

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
        <ToggleGroupItem key={item.value} value={item.value}>
          {item.label}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}
