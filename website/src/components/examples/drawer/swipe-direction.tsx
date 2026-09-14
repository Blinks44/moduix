import { Button } from '@moduix/react/button';
import { Card } from '@moduix/react/card';
import { Drawer } from '@moduix/react/drawer';
import styles from '@/components/examples/drawer/drawer-swipe-direction.module.css';

const direction = 'end' as const;
export default function SwipeDirectionDrawerDemo() {
  return (
    <div className={styles.root}>
      <Drawer swipeDirection={direction}>
        <Drawer.Trigger asChild>
          <Button>Open right drawer</Button>
        </Drawer.Trigger>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Header>
              <Drawer.Title>Details</Drawer.Title>
              <Drawer.CloseIcon />
              <Drawer.Description>Logical end resolves to the right in LTR.</Drawer.Description>
            </Drawer.Header>
            <Drawer.Body className={styles.body}>
              <Card size="sm" className={styles.card}>
                <Card.Body>The same logical direction resolves correctly in RTL.</Card.Body>
              </Card>
            </Drawer.Body>
          </Drawer.Content>
        </Drawer.Positioner>
      </Drawer>

      <Drawer swipeDirection="up">
        <Drawer.Trigger asChild>
          <Button>Open top drawer</Button>
        </Drawer.Trigger>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Header>
              <Drawer.Title>Top drawer</Drawer.Title>
              <Drawer.CloseIcon />
              <Drawer.Description>Swipe up to dismiss this drawer.</Drawer.Description>
            </Drawer.Header>
            <Drawer.Body className={styles.body}>
              <Card size="sm" className={styles.card}>
                <Card.Body>Check this direction on a mobile viewport.</Card.Body>
              </Card>
            </Drawer.Body>
          </Drawer.Content>
        </Drawer.Positioner>
      </Drawer>
    </div>
  );
}