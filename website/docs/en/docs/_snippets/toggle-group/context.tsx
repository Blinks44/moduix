import { ToggleGroup, useToggleGroupContext } from '@moduix/react/toggle-group';
import { CheckIcon } from 'lucide-react';
import type { ReactNode } from 'react';

function AlignmentItem({ children, value }: { children: ReactNode; value: string }) {
  const toggleGroup = useToggleGroupContext();
  const selected = toggleGroup.value.includes(value);

  return (
    <ToggleGroup.Item value={value}>
      {children}
      {selected ? <CheckIcon aria-hidden="true" /> : null}
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