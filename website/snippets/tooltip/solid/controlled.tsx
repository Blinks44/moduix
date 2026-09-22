import { Button } from '@moduix/solid/button';
import { Tooltip, TooltipBody, TooltipTrigger } from '@moduix/solid/tooltip';
import { createSignal } from 'solid-js';

export default function ControlledTooltipDemo() {
  const [open, setOpen] = createSignal(false);

  return (
    <div>
      <Tooltip open={open()} onOpenChange={(details) => setOpen(details.open)}>
        <TooltipTrigger>Controlled tooltip</TooltipTrigger>
        <TooltipBody>Open: {String(open())}</TooltipBody>
      </Tooltip>
      <output>Open: {String(open())}</output>
      <Button size="sm" variant="outline" onClick={() => setOpen((value) => !value)}>
        Toggle
      </Button>
    </div>
  );
}
