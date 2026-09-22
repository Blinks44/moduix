import { ToggleGroup, ToggleGroupItem, useToggleGroupContext } from '@moduix/react/toggle-group';
import { CheckIcon } from 'lucide-react';
import type { ReactNode } from 'react';

function AlignmentItem({ children, value }: { children: ReactNode; value: string }) {
  const toggleGroup = useToggleGroupContext();
  const selected = toggleGroup.value.includes(value);

  return (
    <ToggleGroupItem value={value}>
      {children}
      {selected ? <CheckIcon aria-hidden="true" /> : null}
    </ToggleGroupItem>
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