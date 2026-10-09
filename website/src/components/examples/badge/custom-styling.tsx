import { Badge, BadgeDot, BadgeLabel } from '@moduix/react/badge';
import styles from '@/components/examples/badge/badge-custom-styling.module.css';

export default function BadgeCustomStylingDemo() {
  return (
    <div className={styles.root}>
      <Badge className={styles.small}>Small</Badge>
      <Badge>Default</Badge>
      <Badge className={styles.large}>Large</Badge>
      <Badge className={styles.priority}>
        <BadgeDot />
        <BadgeLabel>Priority</BadgeLabel>
      </Badge>
    </div>
  );
}