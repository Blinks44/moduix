import { Button } from '@moduix/solid/button';
import { FloatingPanel } from '@moduix/solid/floating-panel';
import { createSignal } from 'solid-js';

export default function ControlledFloatingPanelDemo() {
  const [open, setOpen] = createSignal(false);

  return (
    <FloatingPanel
      open={open()}
      defaultSize={{
        width: 360,
        height: 260,
      }}
      onOpenChange={(details) => setOpen(details.open)}
    >
      <FloatingPanel.Trigger
        asChild={(props) => (
          <Button {...props()}>{open() ? 'Focus panel' : 'Open controlled panel'}</Button>
        )}
      />
      <FloatingPanel.Positioner>
        <FloatingPanel.Content>
          <FloatingPanel.DragTrigger>
            <FloatingPanel.Header>
              <FloatingPanel.Title>
                <FloatingPanel.DragIndicator />
                Controlled open
              </FloatingPanel.Title>
              <FloatingPanel.Control>
                <FloatingPanel.StageTrigger stage="minimized" />
                <FloatingPanel.StageTrigger stage="maximized" />
                <FloatingPanel.StageTrigger stage="default" />
                <FloatingPanel.CloseIcon />
              </FloatingPanel.Control>
            </FloatingPanel.Header>
          </FloatingPanel.DragTrigger>
          <FloatingPanel.Body>Open state is synchronized with Solid state.</FloatingPanel.Body>
          <FloatingPanel.ResizeTriggerGroup />
        </FloatingPanel.Content>
      </FloatingPanel.Positioner>
    </FloatingPanel>
  );
}