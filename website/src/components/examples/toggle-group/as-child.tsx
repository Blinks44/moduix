import { ToggleGroup } from '@moduix/react/toggle-group';

export default function ToggleGroupAsChildDemo() {
  return (
    <ToggleGroup defaultValue={['left']} aria-label="Text alignment">
      <ToggleGroup.Item asChild value="left">
        <button type="button">Left</button>
      </ToggleGroup.Item>
      <ToggleGroup.Item asChild value="center">
        <button type="button">Center</button>
      </ToggleGroup.Item>
      <ToggleGroup.Item asChild value="right">
        <button type="button">Right</button>
      </ToggleGroup.Item>
    </ToggleGroup>
  );
}