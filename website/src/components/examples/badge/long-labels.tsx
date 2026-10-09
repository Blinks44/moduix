import { Badge, BadgeLabel } from '@moduix/react/badge';
import styles from '@/components/examples/badge/badge-long-labels.module.css';

const label = 'Ready for stakeholder review after legal approval for production release';

export default function BadgeTruncatedDemo() {
  return (
    <Badge className={styles.root} title={label}>
      <BadgeLabel className={styles.label}>{label}</BadgeLabel>
    </Badge>
  );
}