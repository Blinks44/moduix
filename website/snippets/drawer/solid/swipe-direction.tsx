import { Button } from '@moduix/solid/button';
import { Card } from '@moduix/solid/card';
import { Drawer } from '@moduix/solid/drawer';
import styles from '@/components/examples/drawer/drawer-swipe-direction.module.css';

const direction = 'end' as const;

export default function SwipeDirectionDrawerDemo() {
  return (
    <div class={styles.root}>
      <Drawer swipeDirection={direction}>
        <Drawer.Trigger asChild={(props) => <Button {...props()}>Open right drawer</Button>} />
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Header>
              <Drawer.Title>Details</Drawer.Title>
              <Drawer.CloseIcon />
              <Drawer.Description>Logical end resolves to the right in LTR.</Drawer.Description>
            </Drawer.Header>
            <Drawer.Body class={styles.body}>
              <Card size="sm" class={styles.card}>
                <Card.Body>The same logical direction resolves correctly in RTL.</Card.Body>
              </Card>
            </Drawer.Body>
          </Drawer.Content>
        </Drawer.Positioner>
      </Drawer>

      <Drawer swipeDirection="up">
        <Drawer.Trigger asChild={(props) => <Button {...props()}>Open top drawer</Button>} />
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Header>
              <Drawer.Title>Top drawer</Drawer.Title>
              <Drawer.CloseIcon />
              <Drawer.Description>Swipe up to dismiss this drawer.</Drawer.Description>
            </Drawer.Header>
            <Drawer.Body class={styles.body}>
              <Card size="sm" class={styles.card}>
                <Card.Body>Check this direction on a mobile viewport.</Card.Body>
              </Card>
            </Drawer.Body>
          </Drawer.Content>
        </Drawer.Positioner>
      </Drawer>
    </div>
  );
}