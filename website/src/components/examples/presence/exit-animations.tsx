import { Presence } from '@ark-ui/react/presence';
import { Card } from '@moduix/react/card';
import styles from '@/components/examples/presence/presence-exit-animations.module.css';

export function ActivityPanel({ open }: { open: boolean }) {
  return (
    <Presence className={styles.panel} present={open} unmountOnExit>
      <Card>Saved filters will apply to the next refresh.</Card>
    </Presence>
  );
}