import { Badge, BadgeLabel } from '@moduix/solid/badge';
import styles from '@/components/examples/badge/badge-long-labels.module.css';

const label = 'Ready for stakeholder review after legal approval for production release';

export default function BadgeTruncatedDemo() {
  return (
    <Badge class={styles.root} title={label}>
      <BadgeLabel class={styles.label}>{label}</BadgeLabel>
    </Badge>
  );
}