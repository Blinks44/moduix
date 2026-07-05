/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { useTooltip } from '@ark-ui/react/tooltip';
import { Tooltip } from '@moduix/react';
import styles from './tooltip-demo.module.css';

export function RootProviderTooltipDemo() {
  const tooltip = useTooltip();
  return (
    <div className={styles.stack}>
      <output className={styles.output}>Open: {String(tooltip.open)}</output>
      <Tooltip.RootProvider value={tooltip}>
        <Tooltip.Trigger>RootProvider tooltip</Tooltip.Trigger>
        <Tooltip.Positioner>
          <Tooltip.Content>State is owned outside the tree.</Tooltip.Content>
        </Tooltip.Positioner>
      </Tooltip.RootProvider>
    </div>
  );
}

//#endregion