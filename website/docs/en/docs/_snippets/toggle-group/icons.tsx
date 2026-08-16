import { ToggleGroup } from '@moduix/react/toggle-group';
import { AlignCenterIcon, AlignLeftIcon, AlignRightIcon } from 'lucide-react';

export default function IconToggleGroupDemo() {
  return (
    <ToggleGroup defaultValue={['left']} aria-label="Text alignment" size="icon-md">
      <ToggleGroup.Item value="left" aria-label="Align left">
        <AlignLeftIcon />
      </ToggleGroup.Item>
      <ToggleGroup.Item value="center" aria-label="Align center">
        <AlignCenterIcon />
      </ToggleGroup.Item>
      <ToggleGroup.Item value="right" aria-label="Align right">
        <AlignRightIcon />
      </ToggleGroup.Item>
    </ToggleGroup>
  );
}