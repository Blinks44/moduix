/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Button, FloatingPanel } from '@moduix/react';
import { useState } from 'react';

const lazyMount = true;
const unmountOnExit = true;
const defaultSize = {
  width: 360,
  height: 260,
};
export function LazyMountFloatingPanelDemo() {
  const [exits, setExits] = useState(0);
  return (
    <FloatingPanel
      lazyMount
      unmountOnExit
      defaultSize={{
        width: 360,
        height: 260,
      }}
      onExitComplete={() => setExits((count) => count + 1)}
    >
      <FloatingPanel.Trigger asChild>
        <Button>Open lazy panel</Button>
      </FloatingPanel.Trigger>
      <FloatingPanel.Positioner>
        <FloatingPanel.Content>
          <FloatingPanel.DragTrigger>
            <FloatingPanel.Header>
              <FloatingPanel.Title>
                <FloatingPanel.DragIndicator />
                Lazy mounted
              </FloatingPanel.Title>
              <FloatingPanel.Control>
                <FloatingPanel.StageTrigger stage="minimized" />
                <FloatingPanel.StageTrigger stage="maximized" />
                <FloatingPanel.CloseIcon />
              </FloatingPanel.Control>
            </FloatingPanel.Header>
          </FloatingPanel.DragTrigger>
          <FloatingPanel.Body>
            The panel content mounts on first open and unmounts after exit.
          </FloatingPanel.Body>
          <FloatingPanel.ResizeTriggerGroup />
        </FloatingPanel.Content>
      </FloatingPanel.Positioner>
    </FloatingPanel>
  );
}

//#endregion