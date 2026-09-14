import { Button } from '@moduix/solid/button';
import { FloatingPanel } from '@moduix/solid/floating-panel';
import { createSignal } from 'solid-js';

export default function ControlledPositionDemo() {
  const [position, setPosition] = createSignal({ x: 160, y: 140 });

  return (
    <>
      <FloatingPanel
        defaultSize={{
          width: 360,
          height: 260,
        }}
        position={position()}
        onPositionChange={(details) => setPosition(details.position)}
      >
        <FloatingPanel.Trigger
          asChild={(props) => <Button {...props()}>Open positioned panel</Button>}
        />
        <FloatingPanel.Positioner>
          <FloatingPanel.Content>
            <FloatingPanel.DragTrigger>
              <FloatingPanel.Header>
                <FloatingPanel.Title>
                  <FloatingPanel.DragIndicator />
                  Controlled position
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
              Dragging updates the controlled position object.
            </FloatingPanel.Body>
            <FloatingPanel.ResizeTriggerGroup />
          </FloatingPanel.Content>
        </FloatingPanel.Positioner>
      </FloatingPanel>
      <div data-preview-meta>
        <output>
          Position: {Math.round(position().x)}, {Math.round(position().y)}
        </output>
      </div>
    </>
  );
}