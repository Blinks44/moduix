/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Button, FloatingPanel } from '@moduix/react';

export function AnchorPositionDemo() {
  return (
    <FloatingPanel
      defaultSize={{
        width: 360,
        height: 260,
      }}
      getAnchorPosition={({ triggerRect }) => {
        if (!triggerRect)
          return {
            x: 0,
            y: 0,
          };
        return {
          x: triggerRect.x + triggerRect.width / 2,
          y: triggerRect.y + triggerRect.height + 12,
        };
      }}
    >
      <FloatingPanel.Trigger asChild>
        <Button>Open from trigger</Button>
      </FloatingPanel.Trigger>
      <FloatingPanel.Positioner>
        <FloatingPanel.Content>
          <FloatingPanel.DragTrigger>
            <FloatingPanel.Header>
              <FloatingPanel.Title>
                <FloatingPanel.DragIndicator />
                Anchored start
              </FloatingPanel.Title>
              <FloatingPanel.Control>
                <FloatingPanel.StageTrigger stage="minimized" />
                <FloatingPanel.StageTrigger stage="maximized" />
                <FloatingPanel.CloseIcon />
              </FloatingPanel.Control>
            </FloatingPanel.Header>
          </FloatingPanel.DragTrigger>
          <FloatingPanel.Body>
            The initial panel position is derived from the trigger rect.
          </FloatingPanel.Body>
          <FloatingPanel.ResizeTriggerGroup />
        </FloatingPanel.Content>
      </FloatingPanel.Positioner>
    </FloatingPanel>
  );
}

//#endregion