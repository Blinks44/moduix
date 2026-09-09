import { Button } from '@moduix/solid/button';
import { Card } from '@moduix/solid/card';
import { Drawer, useDrawer } from '@moduix/solid/drawer';
import { For } from 'solid-js';
import styles from '@/components/examples/drawer/drawer-nested.module.css';

const items = ['Passkeys enabled', 'Two-factor authentication on', '3 signed-in devices'];
const snapPoints = [0.42, 1];

export default function NestedDrawerDemo() {
  const accountDrawer = useDrawer({
    snapPoints,
    defaultSnapPoint: snapPoints[0],
  });
  const securityDrawer = useDrawer({
    snapPoints,
    defaultSnapPoint: snapPoints[0],
  });

  return (
    <div>
      <Button onClick={() => accountDrawer().setOpen(true)}>Open account drawer</Button>
      <Drawer.RootProvider value={accountDrawer}>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Grabber>
              <Drawer.GrabberIndicator />
            </Drawer.Grabber>
            <Drawer.Header>
              <Drawer.Title>Account</Drawer.Title>
              <Drawer.CloseIcon />
              <Drawer.Description>Review account preferences.</Drawer.Description>
            </Drawer.Header>
            <Drawer.Body class={styles.body}>
              <Card size="sm" class={styles.card}>
                <Card.Body>
                  <Button variant="outline" onClick={() => securityDrawer().setOpen(true)}>
                    Security settings
                  </Button>
                </Card.Body>
              </Card>
            </Drawer.Body>
          </Drawer.Content>
        </Drawer.Positioner>
      </Drawer.RootProvider>
      <Drawer.RootProvider value={securityDrawer}>
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Grabber>
              <Drawer.GrabberIndicator />
            </Drawer.Grabber>
            <Drawer.Header>
              <Drawer.Title>Security</Drawer.Title>
              <Drawer.CloseIcon />
              <Drawer.Description>Nested drawers keep their own focus state.</Drawer.Description>
            </Drawer.Header>
            <Drawer.Body class={styles.body}>
              <Card size="sm" class={styles.card}>
                <Card.Body>
                  <ul>
                    <For each={items}>{(item) => <li>{item}</li>}</For>
                  </ul>
                </Card.Body>
              </Card>
            </Drawer.Body>
            <Drawer.Footer>
              <Drawer.CloseTrigger
                asChild={(props) => (
                  <Button {...props()} variant="outline">
                    Done
                  </Button>
                )}
              />
            </Drawer.Footer>
          </Drawer.Content>
        </Drawer.Positioner>
      </Drawer.RootProvider>
    </div>
  );
}