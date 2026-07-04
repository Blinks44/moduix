/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Button, Drawer } from '@moduix/react';

const copy = {
  trigger: 'Open indented drawer',
  title: 'Indent effect',
};
const snapPoints = [0.18, 1];
export function IndentDrawerDemo() {
  return (
    <Drawer.Stack>
      <div className="indent-stage">
        <Drawer.IndentBackground />
        <Drawer modal={false} snapPoints={snapPoints} defaultSnapPoint={snapPoints[0]}>
          <Drawer.Indent className="indent-surface">
            <Drawer.Trigger asChild>
              <Button>{copy.trigger}</Button>
            </Drawer.Trigger>
          </Drawer.Indent>
          <Drawer.Backdrop />
          <Drawer.Positioner>
            <Drawer.Content>
              <Drawer.Grabber>
                <Drawer.GrabberIndicator />
              </Drawer.Grabber>
              <Drawer.Header>
                <Drawer.Title>{copy.title}</Drawer.Title>
                <Drawer.CloseIcon />
              </Drawer.Header>
            </Drawer.Content>
          </Drawer.Positioner>
        </Drawer>
      </div>
    </Drawer.Stack>
  );
}

//#endregion