import { Button } from '@moduix/solid/button';
import { Tooltip, TooltipPanel, TooltipTrigger } from '@moduix/solid/tooltip';
import { createSignal } from 'solid-js';

export default function ControlledTooltipDemo() {
  const [open, setOpen] = createSignal(false);

  return (
    <div data-preview-meta>
      <Tooltip open={open()} onOpenChange={(details) => setOpen(details.open)}>
        <TooltipTrigger>Controlled tooltip</TooltipTrigger>
        <TooltipPanel>Open: {String(open())}</TooltipPanel>
      </Tooltip>
      <output>Open: {String(open())}</output>
      <Button size="sm" variant="outline" onClick={() => setOpen((value) => !value)}>
        Toggle
      </Button>
    </div>
  );
}