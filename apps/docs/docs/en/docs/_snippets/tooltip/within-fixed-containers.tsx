import { Tooltip } from '@moduix/react';
import styles from '@/components/examples/tooltip.module.css';

export default function WithinFixedTooltipDemo() {
  return (
    <div className={styles.fixedContainer}>
      <Tooltip
        positioning={{
          strategy: 'fixed',
        }}
      >
        <Tooltip.Trigger>Fixed strategy</Tooltip.Trigger>
        <Tooltip.Body>Positioned from a fixed container.</Tooltip.Body>
      </Tooltip>
    </div>
  );
}