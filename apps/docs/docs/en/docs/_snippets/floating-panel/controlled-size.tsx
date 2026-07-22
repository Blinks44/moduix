import { Button, FloatingPanel } from '@moduix/react';
import { useState } from 'react';

export default function ControlledSizeDemo() {
  const [size, setSize] = useState({
    width: 360,
    height: 260,
  });
  return (
    <FloatingPanel size={size} onSizeChange={(details) => setSize(details.size)}>
      <FloatingPanel.Trigger asChild>
        <Button>Open resizable panel</Button>
      </FloatingPanel.Trigger>
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
  );
}