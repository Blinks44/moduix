/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Button, Drawer } from '@moduix/react';

const direction = 'end' as const;
export function SwipeDirectionDrawerDemo() {
  return (
    <Drawer swipeDirection={direction}>
      <Drawer.Trigger asChild>
        <Button>Open right drawer</Button>
      </Drawer.Trigger>
      <Drawer.Backdrop />
      <Drawer.Positioner>
        <Drawer.Content className="side-drawer">
          <Drawer.Header>
            <Drawer.Title>Details</Drawer.Title>
            <Drawer.CloseIcon />
            <Drawer.Description>Logical end resolves to the right in LTR.</Drawer.Description>
          </Drawer.Header>
        </Drawer.Content>
      </Drawer.Positioner>
    </Drawer>
  );
}

//#endregion