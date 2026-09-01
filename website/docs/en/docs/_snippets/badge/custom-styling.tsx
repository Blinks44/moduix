import { Badge } from '@moduix/react/badge';
import styles from '@/components/examples/badge-custom-styling.module.css';

export default function BadgeCustomStylingDemo() {
  return (
    <div className={styles.root}>
      <Badge className={styles.small}>Small</Badge>
      <Badge>Default</Badge>
      <Badge className={styles.large}>Large</Badge>
      <Badge className={styles.priority}>
        <Badge.Dot />
        <Badge.Label>Priority</Badge.Label>
      </Badge>
    </div>
  );
}