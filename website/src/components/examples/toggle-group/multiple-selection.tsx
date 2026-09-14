import { ToggleGroup } from '@moduix/react/toggle-group';

export default function MultipleToggleGroupDemo() {
  return (
    <ToggleGroup multiple defaultValue={['bold', 'italic']} aria-label="Text formatting" size="md">
      <ToggleGroup.Item value="bold" aria-label="Bold">
        <strong>B</strong>
      </ToggleGroup.Item>
      <ToggleGroup.Item value="italic" aria-label="Italic">
        <em>I</em>
      </ToggleGroup.Item>
      <ToggleGroup.Item value="underline" aria-label="Underline">
        <u>U</u>
      </ToggleGroup.Item>
    </ToggleGroup>
  );
}