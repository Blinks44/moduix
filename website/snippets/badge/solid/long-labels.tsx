import { Badge } from '@moduix/solid/badge';
import styles from '@/components/examples/badge/badge-long-labels.module.css';

const label = 'Ready for stakeholder review after legal approval for production release';

export default function BadgeTruncatedDemo() {
  return (
    <Badge class={styles.root} title={label}>
      <Badge.Label class={styles.label}>{label}</Badge.Label>
    </Badge>
  );
}