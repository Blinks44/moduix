import { ToggleGroup, useToggleGroupContext } from '@moduix/solid/toggle-group';
import { Check as CheckIcon } from 'lucide-solid';
import type { JSX } from 'solid-js';

function AlignmentItem(props: { children: JSX.Element; value: string }) {
  const toggleGroup = useToggleGroupContext();
  const selected = () => toggleGroup().value.includes(props.value);

  return (
    <ToggleGroup.Item value={props.value}>
      {props.children}
      {selected() ? <CheckIcon aria-hidden="true" /> : null}
    </ToggleGroup.Item>
  );
}

export default function ToggleGroupContextDemo() {
  return (
    <ToggleGroup defaultValue={['left']} aria-label="Text alignment">
      <AlignmentItem value="left">Left</AlignmentItem>
      <AlignmentItem value="center">Center</AlignmentItem>
      <AlignmentItem value="right">Right</AlignmentItem>
    </ToggleGroup>
  );
}