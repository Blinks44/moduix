import { Button } from '@moduix/solid/button';
import { Card } from '@moduix/solid/card';
import { Drawer, useDrawer } from '@moduix/solid/drawer';
import styles from '@/components/examples/drawer/drawer-root-provider.module.css';

const snapPoints = [0.25, 0.5, 1];

export default function RootProviderDrawerDemo() {
  const drawer = useDrawer({
    defaultSnapPoint: snapPoints[1],
    snapPoints,
  });

  return (
    <>
      <Button onClick={() => drawer().setOpen(true)}>Open via API</Button>
      <Drawer.RootProvider value={drawer}>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Header>
              <Drawer.Title>Root provider</Drawer.Title>
              <Drawer.CloseIcon />
              <Drawer.Description>Control the drawer from outside its tree.</Drawer.Description>
            </Drawer.Header>
            <Drawer.Body class={styles.body}>
              <Card size="sm" class={styles.card}>
                <Card.Body>State lives outside the drawer tree.</Card.Body>
              </Card>
            </Drawer.Body>
          </Drawer.Content>
        </Drawer.Positioner>
      </Drawer.RootProvider>
      <output>Active snap point: {String(drawer().snapPoint)}</output>
      <Button size="sm" variant="outline" onClick={() => drawer().setSnapPoint(1)}>
        Set 100%
      </Button>
    </>
  );
}