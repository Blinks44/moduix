import { Button, Drawer } from '@moduix/react';

const snapPoints = [0.18, 1];
export default function DragControlsDrawerDemo() {
  return (
    <Drawer snapPoints={snapPoints} defaultSnapPoint={snapPoints[0]}>
      <Drawer.Trigger asChild>
        <Button>Open drawer</Button>
      </Drawer.Trigger>
      <Drawer.Backdrop />
      <Drawer.Positioner>
        <Drawer.Content>
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
            <div className="no-drag-area">
              <Button data-no-drag variant="outline">
                Interactive no-drag region
              </Button>
            </div>
          </Drawer.Body>
        </Drawer.Content>
      </Drawer.Positioner>
    </Drawer>
  );
}