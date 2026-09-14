import { Button } from '@moduix/solid/button';
import { Card } from '@moduix/solid/card';
import { Drawer } from '@moduix/solid/drawer';
import { For } from 'solid-js';
import styles from '@/components/examples/drawer/drawer-basic.module.css';

const snapPoints = [0.45, 1];
const notifications = [
  'Your weekly report is ready to review.',
  'Maya mentioned you in the project update.',
  'Two tasks are due tomorrow.',
];

export default function DrawerDemo() {
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
            <Drawer.Title>Notifications</Drawer.Title>
            <Drawer.CloseIcon />
            <Drawer.Description>Three updates need your attention.</Drawer.Description>
          </Drawer.Header>
          <Drawer.Body class={styles.body}>
            <Card size="sm" class={styles.card}>
              <Card.Body>
                <ul>
                  <For each={notifications}>{(notification) => <li>{notification}</li>}</For>
                </ul>
              </Card.Body>
            </Card>
          </Drawer.Body>
          <Drawer.Footer>
            <Button>View inbox</Button>
            <Drawer.CloseTrigger
              asChild={(props) => (
                <Button {...props()} variant="outline">
                  Close
                </Button>
              )}
            />
          </Drawer.Footer>
        </Drawer.Content>
      </Drawer.Positioner>
    </Drawer>
  );
}