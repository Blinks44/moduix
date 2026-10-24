import { Badge, BadgeDot, BadgeLabel } from '@moduix/solid/badge';
import styles from '@/components/examples/badge/badge-custom-styling.module.css';

export default function BadgeCustomStylingDemo() {
  return (
    <div class={styles.root}>
      <Badge class={styles.square}>Square</Badge>
      <Badge class={styles.priority}>
        <BadgeDot />
        <BadgeLabel>Priority</BadgeLabel>
      </Badge>
    </div>
  );
}