import { Button } from '@moduix/react/button';
import { Tooltip, TooltipBody, TooltipTrigger } from '@moduix/react/tooltip';
import { useState } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';
import styles from '@/components/examples/tooltip/component-positioning.module.css';

const tooltipPlacements = ['top', 'right', 'bottom', 'left'] as const;

type TooltipPlacement = (typeof tooltipPlacements)[number];

export default function PositioningTooltipDemo() {
  const [placement, setPlacement] = useState('top' as TooltipPlacement);
  return (
    <>
      <Tooltip
        positioning={{
          placement,
          offset: {
            mainAxis: 12,
          },
        }}
      >
        <TooltipTrigger asChild aria-label={`Tooltip placement: ${placement}`}>
          <Button>Hover or focus</Button>
        </TooltipTrigger>
        <TooltipBody>Placement: {placement}</TooltipBody>
      </Tooltip>
      <PreviewMeta className={styles.meta}>
        <output>Placement: {placement}</output>
        {tooltipPlacements.map((item) => (
          <Button
            key={item}
            type="button"
            size="sm"
            variant={item === placement ? 'default' : 'outline'}
            aria-pressed={item === placement}
            onClick={() => setPlacement(item)}
          >
            {item}
          </Button>
        ))}
      </PreviewMeta>
    </>
  );
}
