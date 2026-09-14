import { Badge } from '@moduix/solid/badge';
import styles from '@/components/examples/badge/badge-custom-styling.module.css';

export default function BadgeCustomStylingDemo() {
  return (
    <div class={styles.root}>
      <Badge class={styles.small}>Small</Badge>
      <Badge>Default</Badge>
      <Badge class={styles.large}>Large</Badge>
      <Badge class={styles.priority}>
        <Badge.Dot />
        <Badge.Label>Priority</Badge.Label>
      </Badge>
    </div>
  );
}