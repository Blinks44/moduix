import { Button, Drawer } from '@moduix/react';

const dragConfig = {
  content: false,
};
const snapPoints = [0.18, 1];
export default function DragControlsDrawerDemo() {
  return (
    <Drawer snapPoints={snapPoints} defaultSnapPoint={snapPoints[0]}>
      <Drawer.Trigger asChild>
        <Button>Open drawer</Button>
      </Drawer.Trigger>
      <Drawer.Backdrop />
      <Drawer.Positioner>
        <Drawer.Content draggable={dragConfig.content}>
          <Drawer.Grabber>
            <Drawer.GrabberIndicator />
          </Drawer.Grabber>
          <Drawer.Header>
            <Drawer.Title>Drag controls</Drawer.Title>
            <Drawer.CloseIcon />
            <Drawer.Description>
              Content dragging is disabled; the grabber remains draggable.
            </Drawer.Description>
          </Drawer.Header>
          <Drawer.Body>
            <div data-no-drag className="no-drag-area">
              Interactive content
            </div>
          </Drawer.Body>
        </Drawer.Content>
      </Drawer.Positioner>
    </Drawer>
  );
}