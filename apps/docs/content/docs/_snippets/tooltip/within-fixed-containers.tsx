/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Tooltip } from '@moduix/react';
import styles from './tooltip-demo.module.css';

const positioning = {
  strategy: 'fixed',
};

export function WithinFixedTooltipDemo() {
  return (
    <div className={styles.fixedContainer}>
      <Tooltip
        positioning={{
          strategy: 'fixed',
        }}
      >
        <Tooltip.Trigger>Fixed strategy</Tooltip.Trigger>
        <Tooltip.Positioner>
          <Tooltip.Content>Positioned from a fixed container.</Tooltip.Content>
        </Tooltip.Positioner>
      </Tooltip>
    </div>
  );
}

//#endregion