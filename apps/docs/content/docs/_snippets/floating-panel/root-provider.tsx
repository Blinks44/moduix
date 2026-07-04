/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { useFloatingPanel } from '@ark-ui/react/floating-panel';
import { Button, FloatingPanel } from '@moduix/react';

const defaultSize = {
  width: 360,
  height: 260,
};
export function RootProviderFloatingPanelDemo() {
  const panel = useFloatingPanel({
    defaultSize: {
      width: 360,
      height: 260,
    },
    persistRect: true,
  });
  return (
    <>
      <Button onClick={() => panel.setOpen(true)}>Open via API</Button>
      <Button variant="outline" onClick={() => panel.maximize()}>
        Maximize
      </Button>
      <Button variant="outline" onClick={() => panel.minimize()}>
        Minimize
      </Button>
      <FloatingPanel.RootProvider value={panel}>
        <FloatingPanel.Positioner>
          <FloatingPanel.Content>
            <FloatingPanel.DragTrigger>
              <FloatingPanel.Header>
                <FloatingPanel.Title>
                  <FloatingPanel.DragIndicator />
                  Root provider
                </FloatingPanel.Title>
                <FloatingPanel.Control>
                  <FloatingPanel.StageTrigger stage="minimized" />
                  <FloatingPanel.StageTrigger stage="maximized" />
                  <FloatingPanel.CloseIcon />
                </FloatingPanel.Control>
              </FloatingPanel.Header>
            </FloatingPanel.DragTrigger>
            <FloatingPanel.Body>
              Ark useFloatingPanel owns the panel state outside the rendered part tree.
            </FloatingPanel.Body>
            <FloatingPanel.ResizeTriggerGroup />
          </FloatingPanel.Content>
        </FloatingPanel.Positioner>
      </FloatingPanel.RootProvider>
    </>
  );
}

//#endregion