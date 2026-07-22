import { Button, Tooltip } from '@moduix/react';
import { useState } from 'react';
import styles from '@/components/examples/tooltip.module.css';

const tooltipPlacements = ['top', 'right', 'bottom', 'left'] as const;

type TooltipPlacement = (typeof tooltipPlacements)[number];

export default function PositioningTooltipDemo() {
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
        <Tooltip.Body>Placement: {placement}</Tooltip.Body>
      </Tooltip>
    </div>
  );
}