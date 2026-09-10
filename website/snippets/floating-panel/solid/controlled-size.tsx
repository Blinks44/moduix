import { Button } from '@moduix/solid/button';
import { FloatingPanel } from '@moduix/solid/floating-panel';
import { createSignal } from 'solid-js';

export default function ControlledSizeDemo() {
  const [size, setSize] = createSignal({ width: 360, height: 260 });

  return (
    <>
      <FloatingPanel size={size()} onSizeChange={(details) => setSize(details.size)}>
        <FloatingPanel.Trigger
          asChild={(props) => <Button {...props()}>Open resizable panel</Button>}
        />
        <FloatingPanel.Positioner>
          <FloatingPanel.Content>
            <FloatingPanel.DragTrigger>
              <FloatingPanel.Header>
                <FloatingPanel.Title>
                  <FloatingPanel.DragIndicator />
                  Controlled size
                </FloatingPanel.Title>
                <FloatingPanel.Control>
                  <FloatingPanel.StageTrigger stage="minimized" />
                  <FloatingPanel.StageTrigger stage="maximized" />
                  <FloatingPanel.StageTrigger stage="default" />
                  <FloatingPanel.CloseIcon />
                </FloatingPanel.Control>
              </FloatingPanel.Header>
            </FloatingPanel.DragTrigger>
            <FloatingPanel.Body>
              Resize handles update controlled width and height.
            </FloatingPanel.Body>
            <FloatingPanel.ResizeTriggerGroup />
          </FloatingPanel.Content>
        </FloatingPanel.Positioner>
      </FloatingPanel>
      <div data-preview-meta>
        <output>
          Size: {Math.round(size().width)} × {Math.round(size().height)}
        </output>
      </div>
    </>
  );
}