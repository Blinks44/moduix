import { Button, Drawer } from '@moduix/react';

const snapPoints = [0.25, 0.5, 1];
export default function SnapPointsDrawerDemo() {
  return (
    <Drawer snapPoints={snapPoints} defaultSnapPoint={snapPoints[1]}>
      <Drawer.Trigger asChild>
        <Button>Open with snap points</Button>
      </Drawer.Trigger>
      <Drawer.Backdrop />
      <Drawer.Positioner>
        <Drawer.Content className="snap-drawer">
          <Drawer.Grabber>
            <Drawer.GrabberIndicator />
          </Drawer.Grabber>
          <Drawer.Header>
            <Drawer.Title>Snap points</Drawer.Title>
            <Drawer.CloseIcon />
            <Drawer.Description>
              Drag between 25%, 50%, and 100% of the viewport.
            </Drawer.Description>
          </Drawer.Header>
        </Drawer.Content>
      </Drawer.Positioner>
    </Drawer>
  );
}