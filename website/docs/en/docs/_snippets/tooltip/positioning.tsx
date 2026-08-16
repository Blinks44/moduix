import { Button } from '@moduix/react/button';
import { Tooltip } from '@moduix/react/tooltip';
import { useState } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';

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
        <Tooltip.Trigger asChild aria-label={`Tooltip placement: ${placement}`}>
          <Button>Hover or focus</Button>
        </Tooltip.Trigger>
        <Tooltip.Body>Placement: {placement}</Tooltip.Body>
      </Tooltip>
      <PreviewMeta>
        <output>Placement: {placement}</output>
        {tooltipPlacements.map((item) => (
          <Button
            key={item}
            type="button"
            size="sm"
            variant="outline"
            onClick={() => setPlacement(item)}
          >
            {item}
          </Button>
        ))}
      </PreviewMeta>
    </>
  );
}