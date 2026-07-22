import { Button, Drawer } from '@moduix/react';

const modal = false;
const snapPoints = [0.18, 1];
export default function NonModalDrawerDemo() {
  return (
    <Drawer modal={modal} snapPoints={snapPoints} defaultSnapPoint={snapPoints[0]}>
      <Drawer.Trigger asChild>
        <Button>Open non-modal drawer</Button>
      </Drawer.Trigger>
      <Drawer.Positioner>
        <Drawer.Content className="non-modal-drawer">
          <Drawer.Header>
            <Drawer.Title>Non-modal drawer</Drawer.Title>
            <Drawer.CloseIcon />
            <Drawer.Description>
              The page remains interactive while this drawer is open.
            </Drawer.Description>
          </Drawer.Header>
        </Drawer.Content>
      </Drawer.Positioner>
    </Drawer>
  );
}