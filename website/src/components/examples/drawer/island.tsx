import { Button } from '@moduix/react/button';
import { Card } from '@moduix/react/card';
import { Drawer } from '@moduix/react/drawer';
import styles from '@/components/examples/drawer/drawer-island.module.css';

export default function IslandDrawerDemo() {
  return (
    <Drawer swipeDirection="end">
      <Drawer.Trigger asChild>
        <Button>Open island drawer</Button>
      </Drawer.Trigger>
      <Drawer.Backdrop />
      <Drawer.Positioner>
        <Drawer.Content variant="island">
          <Drawer.Header>
            <Drawer.Title>Quick actions</Drawer.Title>
            <Drawer.CloseIcon />
            <Drawer.Description>This drawer floats inside the viewport edge.</Drawer.Description>
          </Drawer.Header>
          <Drawer.Body className={styles.body}>
            <Card size="sm" className={styles.card}>
              <Card.Body>Choose an action without leaving your current context.</Card.Body>
            </Card>
          </Drawer.Body>
          <Drawer.Footer>
            <Drawer.CloseTrigger asChild>
              <Button variant="outline">Done</Button>
            </Drawer.CloseTrigger>
          </Drawer.Footer>
        </Drawer.Content>
      </Drawer.Positioner>
    </Drawer>
  );
}