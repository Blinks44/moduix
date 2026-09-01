import { Badge } from '@moduix/react/badge';
import styles from '@/components/examples/badge-long-labels.module.css';

const label = 'Ready for stakeholder review after legal approval for production release';

export default function BadgeTruncatedDemo() {
  return (
    <Badge className={styles.root} title={label}>
      <Badge.Label className={styles.label}>{label}</Badge.Label>
    </Badge>
  );
}