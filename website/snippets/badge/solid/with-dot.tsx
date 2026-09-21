import { Badge, BadgeDot, BadgeLabel } from '@moduix/solid/badge';
import styles from '@/components/examples/badge/badge-with-dot.module.css';

const statuses = [
  { label: 'Online', variant: 'default' },
  { label: 'Draft', variant: 'secondary' },
  { label: 'Failed', variant: 'destructive' },
] as const;

export default function BadgeWithDotDemo() {
  return (
    <div class={styles.root}>
      {statuses.map((status) => (
        <Badge variant={status.variant}>
          <BadgeDot />
          <BadgeLabel>{status.label}</BadgeLabel>
        </Badge>
      ))}
    </div>
  );
}