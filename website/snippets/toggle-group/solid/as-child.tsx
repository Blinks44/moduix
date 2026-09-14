import { ToggleGroup } from '@moduix/solid/toggle-group';

export default function ToggleGroupAsChildDemo() {
  return (
    <ToggleGroup defaultValue={['left']} aria-label="Text alignment">
      <ToggleGroup.Item value="left" asChild={(props) => <button {...props()} type="button" />}>
        Left
      </ToggleGroup.Item>
      <ToggleGroup.Item value="center" asChild={(props) => <button {...props()} type="button" />}>
        Center
      </ToggleGroup.Item>
      <ToggleGroup.Item value="right" asChild={(props) => <button {...props()} type="button" />}>
        Right
      </ToggleGroup.Item>
    </ToggleGroup>
  );
}