import { Avatar, AvatarFallback } from '@moduix/react/avatar';
import { Computer as ComputerIcon } from 'lucide-react';
import styles from '@/components/examples/avatar/avatar-custom-fallback.module.css';

const fallbackLabel = 'Workstation account';

export default function AvatarIconFallbackDemo() {
  return (
    <Avatar size="lg" className={styles.root}>
      <AvatarFallback role="img" aria-label={fallbackLabel}>
        <ComputerIcon className={styles.glyph} />
      </AvatarFallback>
    </Avatar>
  );
}