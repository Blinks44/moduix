import { Button } from '@moduix/solid/button';
import { Card } from '@moduix/solid/card';
import { Drawer } from '@moduix/solid/drawer';
import styles from '@/components/examples/drawer/drawer-floating-grabber.module.css';

export default function FloatingGrabberDrawerDemo() {
  return (
    <Drawer>
      <Drawer.Trigger asChild={(props) => <Button {...props()}>Open drawer</Button>} />
      <Drawer.Backdrop />
      <Drawer.Positioner>
        <Drawer.Content>
          <Drawer.Grabber class={styles.grabber}>
            <Drawer.GrabberIndicator />
          </Drawer.Grabber>
          <Drawer.Header>
            <Drawer.Title>Floating grabber</Drawer.Title>
            <Drawer.CloseIcon />
            <Drawer.Description>The handle sits 10px above the drawer edge.</Drawer.Description>
          </Drawer.Header>
          <Drawer.Body class={styles.body}>
            <Card size="sm" class={styles.card}>
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