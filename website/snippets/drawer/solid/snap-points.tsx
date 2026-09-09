import { Button } from '@moduix/solid/button';
import { Card } from '@moduix/solid/card';
import { Drawer } from '@moduix/solid/drawer';
import styles from '@/components/examples/drawer/drawer-snap-points.module.css';

const snapPoints = [0.25, 0.5, 1];

export default function SnapPointsDrawerDemo() {
  return (
    <Drawer snapPoints={snapPoints} defaultSnapPoint={snapPoints[1]}>
      <Drawer.Trigger asChild={(props) => <Button {...props()}>Open with snap points</Button>} />
      <Drawer.Backdrop />
      <Drawer.Positioner>
        <Drawer.Content>
          <Drawer.Grabber>
            <Drawer.GrabberIndicator />
          </Drawer.Grabber>
          <Drawer.Header>
            <Drawer.Title>Snap points</Drawer.Title>
            <Drawer.CloseIcon />
            <Drawer.Description>Drag between the configured snap points.</Drawer.Description>
          </Drawer.Header>
          <Drawer.Body class={styles.body}>
            <Card size="sm" class={styles.card}>
              <Card.Body>25% · 50% · 100%</Card.Body>
            </Card>
          </Drawer.Body>
        </Drawer.Content>
      </Drawer.Positioner>
    </Drawer>
  );
}