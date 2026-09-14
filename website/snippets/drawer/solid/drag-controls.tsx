import { Button } from '@moduix/solid/button';
import { Card } from '@moduix/solid/card';
import { Drawer } from '@moduix/solid/drawer';
import styles from '@/components/examples/drawer/drawer-drag-controls.module.css';

const snapPoints = [0.18, 1];

export default function DragControlsDrawerDemo() {
  return (
    <Drawer snapPoints={snapPoints} defaultSnapPoint={snapPoints[0]}>
      <Drawer.Trigger asChild={(props) => <Button {...props()}>Open drawer</Button>} />
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
              Content dragging is enabled; the interactive region does not start a drag.
            </Drawer.Description>
          </Drawer.Header>
          <Drawer.Body class={styles.body}>
            <Card size="sm" class={styles.card}>
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