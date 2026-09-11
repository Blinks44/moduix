import { Button } from '@moduix/solid/button';
import { Tooltip } from '@moduix/solid/tooltip';
import { createSignal } from 'solid-js';

export default function ControlledTooltipDemo() {
  const [open, setOpen] = createSignal(false);

  return (
    <div>
      <Tooltip open={open()} onOpenChange={(details) => setOpen(details.open)}>
        <Tooltip.Trigger>Controlled tooltip</Tooltip.Trigger>
        <Tooltip.Body>Open: {String(open())}</Tooltip.Body>
      </Tooltip>
      <output>Open: {String(open())}</output>
      <Button size="sm" variant="outline" onClick={() => setOpen((value) => !value)}>
        Toggle
      </Button>
    </div>
  );
}