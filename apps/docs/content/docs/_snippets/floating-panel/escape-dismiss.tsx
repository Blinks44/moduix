/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Button, FloatingPanel } from '@moduix/react';

export function EscapeDismissFloatingPanelDemo() {
  return (
    <FloatingPanel
      defaultSize={{
        width: 360,
        height: 260,
      }}
    >
      <FloatingPanel.Trigger asChild>
        <Button>Open panel</Button>
      </FloatingPanel.Trigger>
      <FloatingPanel.Positioner>
        <FloatingPanel.Content autoFocus>
          <FloatingPanel.DragTrigger>
            <FloatingPanel.Header>
              <FloatingPanel.Title>
                <FloatingPanel.DragIndicator />
                Escape dismiss
              </FloatingPanel.Title>
              <FloatingPanel.Control>
                <FloatingPanel.CloseIcon />
              </FloatingPanel.Control>
            </FloatingPanel.Header>
          </FloatingPanel.DragTrigger>
          <FloatingPanel.Body>
            The content receives focus on open, so Escape dismisses this topmost panel immediately.
          </FloatingPanel.Body>
          <FloatingPanel.ResizeTriggerGroup />
        </FloatingPanel.Content>
      </FloatingPanel.Positioner>
    </FloatingPanel>
  );
}

//#endregion