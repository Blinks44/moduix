import { Collapsible } from '@moduix/react/collapsible';
import styles from '@/components/examples/collapsible/collapsible-partial-collapse-width.module.css';

export default function PartialWidthCollapsibleDemo() {
  return (
    <Collapsible className={styles.root} collapsedWidth="8rem">
      <Collapsible.Trigger>
        Read details
        <Collapsible.Indicator />
      </Collapsible.Trigger>
      <Collapsible.Content>
        <Collapsible.Body>
          Additional account-recovery details stay partly visible while this disclosure is closed.
        </Collapsible.Body>
      </Collapsible.Content>
    </Collapsible>
  );
}