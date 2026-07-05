/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Button, Drawer } from '@moduix/react';

const copy = {
  trigger: 'Open drawer',
  title: 'Notifications',
  description: 'You are all caught up. Good job!',
  body: 'Bottom drawers are draggable by default.',
};
const snapPoints = [0.18, 1];
export function DrawerDemo() {
  return (
    <Drawer snapPoints={snapPoints} defaultSnapPoint={snapPoints[0]}>
      <Drawer.Trigger asChild>
        <Button>{copy.trigger}</Button>
      </Drawer.Trigger>
      <Drawer.Backdrop />
      <Drawer.Positioner>
        <Drawer.Content className="drawer-content">
          <Drawer.Grabber>
            <Drawer.GrabberIndicator />
          </Drawer.Grabber>
          <Drawer.Header>
            <Drawer.Title>{copy.title}</Drawer.Title>
            <Drawer.CloseIcon />
            <Drawer.Description>{copy.description}</Drawer.Description>
          </Drawer.Header>
          <Drawer.Body>{copy.body}</Drawer.Body>
          <Drawer.Footer>
            <Drawer.CloseTrigger asChild>
              <Button variant="outline">Close</Button>
            </Drawer.CloseTrigger>
          </Drawer.Footer>
        </Drawer.Content>
      </Drawer.Positioner>
    </Drawer>
  );
}

//#endregion