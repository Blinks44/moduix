import { Tooltip, TooltipBody, TooltipTrigger } from '@moduix/react/tooltip';
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
            <TooltipTrigger>Focus, then scroll</TooltipTrigger>
            <TooltipBody>Stays anchored while this panel scrolls.</TooltipBody>
          </Tooltip>
        </div>
        <p className={styles.end}>End of scroll area</p>
      </div>
    </div>
  );
}
