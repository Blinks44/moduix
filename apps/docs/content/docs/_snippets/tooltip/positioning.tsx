/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Button, Tooltip } from '@moduix/react';
import { useState } from 'react';
import styles from './tooltip-demo.module.css';

const tooltipPlacements = ['top', 'right', 'bottom', 'left'] as const;

const offset = {
  mainAxis: 12,
};

type TooltipPlacement = (typeof tooltipPlacements)[number];

export function PositioningTooltipDemo() {
  const [placement, setPlacement] = useState('top' as TooltipPlacement);
  return (
    <div className={styles.stack}>
      <div className={styles.sideButtons}>
        {tooltipPlacements.map((item) => (
          <button
            key={item}
            type="button"
            className={styles.sideButton}
            data-active={item === placement || undefined}
            onClick={() => setPlacement(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <Tooltip
        positioning={{
          placement,
          offset: {
            mainAxis: 12,
          },
        }}
      >
        <Tooltip.Trigger asChild aria-label={`Tooltip placement: ${placement}`}>
          <Button>Hover or focus</Button>
        </Tooltip.Trigger>
        <Tooltip.Positioner>
          <Tooltip.Content>Placement: {placement}</Tooltip.Content>
        </Tooltip.Positioner>
      </Tooltip>
    </div>
  );
}

//#endregion