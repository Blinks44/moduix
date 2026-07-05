/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { useDrawer } from '@ark-ui/react/drawer';
import { Button, Drawer } from '@moduix/react';

const snapPoints = [0.25, 0.5, 1];
export function RootProviderDrawerDemo() {
  const drawer = useDrawer({
    defaultSnapPoint: snapPoints[1],
    snapPoints,
  });
  return (
    <div className="provider-demo">
      <div className="provider-actions">
        <Button onClick={() => drawer.setOpen(true)}>Open via API</Button>
        <Button variant="outline" onClick={() => drawer.setSnapPoint(1)}>
          Set 100%
        </Button>
      </div>
      <Drawer.RootProvider value={drawer}>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Header>
              <Drawer.Title>Root provider</Drawer.Title>
              <Drawer.CloseIcon />
              <Drawer.Description>Active snap point: {String(drawer.snapPoint)}</Drawer.Description>
            </Drawer.Header>
          </Drawer.Content>
        </Drawer.Positioner>
      </Drawer.RootProvider>
    </div>
  );
}

//#endregion