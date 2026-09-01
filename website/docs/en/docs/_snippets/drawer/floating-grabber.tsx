import { Button } from '@moduix/react/button';
import { Card } from '@moduix/react/card';
import { Drawer } from '@moduix/react/drawer';
import styles from '@/components/examples/drawer/drawer-floating-grabber.module.css';

export default function FloatingGrabberDrawerDemo() {
  return (
    <Drawer>
      <Drawer.Trigger asChild>
        <Button>Open drawer</Button>
      </Drawer.Trigger>
      <Drawer.Backdrop />
      <Drawer.Positioner>
        <Drawer.Content>
          <Drawer.Grabber className={styles.grabber}>
            <Drawer.GrabberIndicator />
          </Drawer.Grabber>
          <Drawer.Header>
            <Drawer.Title>Floating grabber</Drawer.Title>
            <Drawer.CloseIcon />
            <Drawer.Description>The handle sits 10px above the drawer edge.</Drawer.Description>
          </Drawer.Header>
          <Drawer.Body className={styles.body}>
            <Card size="sm" className={styles.card}>
              <Card.Body>
                Use this treatment when the handle should read as a separate control.
              </Card.Body>
            </Card>
          </Drawer.Body>
        </Drawer.Content>
      </Drawer.Positioner>
    </Drawer>
  );
}