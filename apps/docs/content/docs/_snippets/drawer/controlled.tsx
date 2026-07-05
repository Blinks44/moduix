/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Button, Drawer } from '@moduix/react';
import { useState } from 'react';

const initialOpen = false;
const snapPoints = [0.18, 1];
export function ControlledDrawerDemo() {
  const [open, setOpen] = useState(initialOpen);
  return (
    <>
      <Button type="button" onClick={() => setOpen((value) => !value)}>
        {open ? 'Close' : 'Open'} drawer
      </Button>
      <Drawer
        open={open}
        snapPoints={snapPoints}
        defaultSnapPoint={snapPoints[0]}
        onOpenChange={(details) => setOpen(details.open)}
      >
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content className="controlled-drawer">
            <Drawer.Header>
              <Drawer.Title>Controlled drawer</Drawer.Title>
              <Drawer.CloseIcon />
              <Drawer.Description>Open: {String(open)}</Drawer.Description>
            </Drawer.Header>
          </Drawer.Content>
        </Drawer.Positioner>
      </Drawer>
    </>
  );
}

//#endregion