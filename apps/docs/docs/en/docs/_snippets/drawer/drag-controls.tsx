import { Button } from '@moduix/react/button';
import { Card } from '@moduix/react/card';
import { Drawer } from '@moduix/react/drawer';

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
          <Drawer.Body style={{ display: 'flex', flex: 1 }}>
            <Card size="sm" style={{ flex: 1, backgroundColor: 'var(--moduix-color-muted)' }}>
              <Card.Body>
                <Button data-no-drag variant="outline">
                  Interactive no-drag region
                </Button>
              </Card.Body>
            </Card>
          </Drawer.Body>
        </Drawer.Content>
      </Drawer.Positioner>
    </Drawer>
  );
}