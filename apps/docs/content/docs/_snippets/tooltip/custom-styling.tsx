/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Tooltip } from '@moduix/react';
import styles from './tooltip-demo.module.css';

export function CustomStylingTooltipDemo() {
  return (
    <Tooltip>
      <Tooltip.Trigger aria-label="Custom styled tooltip" className={styles.customTrigger}>
        Custom style
      </Tooltip.Trigger>
      <Tooltip.Positioner className={styles.customPositioner}>
        <Tooltip.Content className={styles.customContent}>
          <Tooltip.Arrow className={styles.customArrow} />
          Styled through explicit Ark parts
        </Tooltip.Content>
      </Tooltip.Positioner>
    </Tooltip>
  );
}

//#endregion