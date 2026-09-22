import { ToggleGroup, ToggleGroupItem } from '@moduix/solid/toggle-group';
import {
  AlignCenter as AlignCenterIcon,
  AlignLeft as AlignLeftIcon,
  AlignRight as AlignRightIcon,
} from 'lucide-solid';

export default function IconToggleGroupDemo() {
  return (
    <ToggleGroup defaultValue={['left']} aria-label="Text alignment" size="icon-md">
      <ToggleGroupItem value="left" aria-label="Align left">
        <AlignLeftIcon />
      </ToggleGroupItem>
      <ToggleGroupItem value="center" aria-label="Align center">
        <AlignCenterIcon />
      </ToggleGroupItem>
      <ToggleGroupItem value="right" aria-label="Align right">
        <AlignRightIcon />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
