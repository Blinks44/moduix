import { ToggleGroup, ToggleGroupItem } from '@moduix/react/toggle-group';

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

export default function ToggleGroupDemo() {
  return (
    <ToggleGroup defaultValue={['left']} aria-label="Text alignment">
      {alignmentItems.map((item) => (
        <ToggleGroupItem key={item.value} value={item.value}>
          {item.label}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}
