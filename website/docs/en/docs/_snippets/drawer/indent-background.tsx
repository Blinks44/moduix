import { Button } from '@moduix/react/button';
import { Card } from '@moduix/react/card';
import { Drawer } from '@moduix/react/drawer';
import styles from '@/components/examples/drawer/drawer-indent-background.module.css';

const copy = {
  trigger: 'Open indented drawer',
  title: 'Indent effect',
};
const snapPoints = [0.18, 1];

export default function IndentDrawerDemo() {
  return (
    <Drawer.Stack>
      <div className={styles.stage}>
        <Drawer.IndentBackground />
        <Drawer
          modal={false}
          portalled={false}
          snapPoints={snapPoints}
          defaultSnapPoint={snapPoints[0]}
        >
          <Drawer.Indent className={styles.indent}>
            <Drawer.Trigger asChild>
              <Button>{copy.trigger}</Button>
            </Drawer.Trigger>
          </Drawer.Indent>
          <Drawer.Backdrop className={styles.backdrop} />
          <Drawer.Positioner className={styles.positioner}>
            <Drawer.Content>
              <Drawer.Grabber>
                <Drawer.GrabberIndicator />
              </Drawer.Grabber>
              <Drawer.Header>
                <Drawer.Title>{copy.title}</Drawer.Title>
                <Drawer.CloseIcon />
              </Drawer.Header>
              <Drawer.Body className={styles.body}>
                <Card size="sm" className={styles.card}>
                  <Card.Body>The background and surface move together.</Card.Body>
                </Card>
              </Drawer.Body>
            </Drawer.Content>
          </Drawer.Positioner>
        </Drawer>
      </div>
    </Drawer.Stack>
  );
}