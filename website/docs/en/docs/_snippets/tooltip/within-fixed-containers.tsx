import { Tooltip } from '@moduix/react/tooltip';
import styles from '@/components/examples/tooltip/component-within-fixed-containers.module.css';

export default function WithinFixedTooltipDemo() {
  return (
    <div className={styles.root}>
      <div className={styles.content}>
        <div className={styles.sticky}>
          <Tooltip
            closeOnScroll={false}
            positioning={{
              strategy: 'fixed',
            }}
          >
            <Tooltip.Trigger>Focus, then scroll</Tooltip.Trigger>
            <Tooltip.Body>Stays anchored while this panel scrolls.</Tooltip.Body>
          </Tooltip>
        </div>
        <p className={styles.end}>End of scroll area</p>
      </div>
    </div>
  );
}