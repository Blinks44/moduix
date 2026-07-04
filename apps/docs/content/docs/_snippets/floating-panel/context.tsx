/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { FloatingPanel as ArkFloatingPanel } from '@ark-ui/react/floating-panel';
import { Button, FloatingPanel } from '@moduix/react';

const defaultSize = {
  width: 360,
  height: 260,
};
export function ContextFloatingPanelDemo() {
  return (
    <FloatingPanel
      defaultSize={{
        width: 360,
        height: 260,
      }}
    >
      <FloatingPanel.Trigger asChild>
        <Button>Open context panel</Button>
      </FloatingPanel.Trigger>
      <ArkFloatingPanel.Context>
        {(panel) => (
          <span>
            open: {String(panel.open)}, dragging: {String(panel.dragging)}
          </span>
        )}
      </ArkFloatingPanel.Context>
      <FloatingPanel.Positioner>
        <FloatingPanel.Content>
          <FloatingPanel.DragTrigger>
            <FloatingPanel.Header>
              <FloatingPanel.Title>
                <FloatingPanel.DragIndicator />
                Context state
              </FloatingPanel.Title>
              <FloatingPanel.Control>
                <FloatingPanel.StageTrigger stage="minimized" />
                <FloatingPanel.StageTrigger stage="maximized" />
                <FloatingPanel.CloseIcon />
              </FloatingPanel.Control>
            </FloatingPanel.Header>
          </FloatingPanel.DragTrigger>
          <FloatingPanel.Body>
            Ark FloatingPanel.Context exposes the panel API to descendants.
          </FloatingPanel.Body>
          <FloatingPanel.ResizeTriggerGroup />
        </FloatingPanel.Content>
      </FloatingPanel.Positioner>
    </FloatingPanel>
  );
}

//#endregion