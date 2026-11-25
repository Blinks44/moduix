import { Button } from '@moduix/react/button';
import { Tooltip, TooltipPanel, TooltipTrigger } from '@moduix/react/tooltip';
import { useState } from 'react';

export default function ControlledTooltipDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Tooltip open={open} onOpenChange={(details) => setOpen(details.open)}>
        <TooltipTrigger>Controlled tooltip</TooltipTrigger>
        <TooltipPanel>Open: {String(open)}</TooltipPanel>
      </Tooltip>
      <div data-preview-meta>
        <output>Open: {String(open)}</output>
        <Button size="sm" variant="outline" onClick={() => setOpen((value) => !value)}>
          Toggle
        </Button>
      </div>
    </>
  );
}