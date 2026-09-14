import { Tooltip } from '@moduix/solid/tooltip';
import styles from '@/components/examples/tooltip/component-within-fixed-containers.module.css';

export default function WithinFixedTooltipDemo() {
  return (
    <div class={styles.root}>
      <div class={styles.content}>
        <div class={styles.sticky}>
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
        <p class={styles.end}>End of scroll area</p>
      </div>
    </div>
  );
}