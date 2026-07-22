import { ToggleGroup } from '@moduix/react';
import { AlignCenterIcon, AlignLeftIcon, AlignRightIcon } from 'lucide-react';
import styles from '@/components/examples/toggle-group.module.css';

export default function IconToggleGroupDemo() {
  return (
    <ToggleGroup
      defaultValue={['left']}
      aria-label="Text alignment"
      size="md"
      className={styles.iconGroup}
    >
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