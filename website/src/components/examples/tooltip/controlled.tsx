import { Button } from '@moduix/react/button';
import { Tooltip } from '@moduix/react/tooltip';
import { useState } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';

export default function ControlledTooltipDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Tooltip open={open} onOpenChange={(details) => setOpen(details.open)}>
        <Tooltip.Trigger>Controlled tooltip</Tooltip.Trigger>
        <Tooltip.Body>Open: {String(open)}</Tooltip.Body>
      </Tooltip>
      <PreviewMeta>
        <output>Open: {String(open)}</output>
        <Button size="sm" variant="outline" onClick={() => setOpen((value) => !value)}>
          Toggle
        </Button>
      </PreviewMeta>
    </>
  );
}