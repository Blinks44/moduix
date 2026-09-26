import { ToggleGroup, ToggleGroupItem } from '@moduix/react/toggle-group';

export default function ToggleGroupAsChildDemo() {
  return (
    <ToggleGroup defaultValue={['left']} aria-label="Text alignment">
      <ToggleGroupItem asChild value="left">
        <button type="button">Left</button>
      </ToggleGroupItem>
      <ToggleGroupItem asChild value="center">
        <button type="button">Center</button>
      </ToggleGroupItem>
      <ToggleGroupItem asChild value="right">
        <button type="button">Right</button>
      </ToggleGroupItem>
    </ToggleGroup>
  );
}