import { Tooltip, TooltipBody, TooltipTrigger } from '@moduix/solid/tooltip';
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
            <TooltipTrigger>Focus, then scroll</TooltipTrigger>
            <TooltipBody>Stays anchored while this panel scrolls.</TooltipBody>
          </Tooltip>
        </div>
        <p class={styles.end}>End of scroll area</p>
      </div>
    </div>
  );
}