import { ToggleGroup, ToggleGroupItem } from '@moduix/react/toggle-group';

export default function MultipleToggleGroupDemo() {
  return (
    <ToggleGroup multiple defaultValue={['bold', 'italic']} aria-label="Text formatting" size="md">
      <ToggleGroupItem value="bold" aria-label="Bold">
        <strong>B</strong>
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Italic">
        <em>I</em>
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="Underline">
        <u>U</u>
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
