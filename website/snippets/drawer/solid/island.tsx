import { Button } from '@moduix/solid/button';
import { Card } from '@moduix/solid/card';
import { Drawer } from '@moduix/solid/drawer';
import styles from '@/components/examples/drawer/drawer-island.module.css';

export default function IslandDrawerDemo() {
  return (
    <Drawer swipeDirection="end">
      <Drawer.Trigger asChild={(props) => <Button {...props()}>Open island drawer</Button>} />
      <Drawer.Backdrop />
      <Drawer.Positioner>
        <Drawer.Content variant="island">
          <Drawer.Header>
            <Drawer.Title>Quick actions</Drawer.Title>
            <Drawer.CloseIcon />
            <Drawer.Description>This drawer floats inside the viewport edge.</Drawer.Description>
          </Drawer.Header>
          <Drawer.Body class={styles.body}>
            <Card size="sm" class={styles.card}>
              <Card.Body>Choose an action without leaving your current context.</Card.Body>
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
    </Drawer>
  );
}