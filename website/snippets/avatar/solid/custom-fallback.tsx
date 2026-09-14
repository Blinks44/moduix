import { Avatar } from '@moduix/solid/avatar';
import { Computer as ComputerIcon } from 'lucide-solid';
import styles from '@/components/examples/avatar/avatar-custom-fallback.module.css';

const fallbackLabel = 'Workstation account';

export default function AvatarIconFallbackDemo() {
  return (
    <Avatar size="lg" class={styles.root}>
      <Avatar.Fallback role="img" aria-label={fallbackLabel}>
        <ComputerIcon class={styles.glyph} />
      </Avatar.Fallback>
    </Avatar>
  );
}