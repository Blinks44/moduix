/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Button, FloatingPanel } from '@moduix/react';
import { useState } from 'react';

export function ControlledPositionDemo() {
  const [position, setPosition] = useState({
    x: 160,
    y: 140,
  });
  return (
    <FloatingPanel
      defaultSize={{
        width: 360,
        height: 260,
      }}
      position={position}
      onPositionChange={(details) => setPosition(details.position)}
    >
      <FloatingPanel.Trigger asChild>
        <Button>Open positioned panel</Button>
      </FloatingPanel.Trigger>
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
                <FloatingPanel.CloseIcon />
              </FloatingPanel.Control>
            </FloatingPanel.Header>
          </FloatingPanel.DragTrigger>
          <FloatingPanel.Body>Dragging updates the controlled position object.</FloatingPanel.Body>
          <FloatingPanel.ResizeTriggerGroup />
        </FloatingPanel.Content>
      </FloatingPanel.Positioner>
    </FloatingPanel>
  );
}

//#endregion