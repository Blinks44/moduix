import { Button } from '@moduix/solid/button';
import { Card } from '@moduix/solid/card';
import { Drawer } from '@moduix/solid/drawer';
import styles from '@/components/examples/drawer/drawer-indent-background.module.css';

const copy = {
  trigger: 'Open indented drawer',
  title: 'Indent effect',
};
const snapPoints = [0.18, 1];

export default function IndentDrawerDemo() {
  return (
    <Drawer.Stack>
      <div class={styles.stage}>
        <Drawer.IndentBackground />
        <Drawer
          modal={false}
          portalled={false}
          snapPoints={snapPoints}
          defaultSnapPoint={snapPoints[0]}
        >
          <Drawer.Indent class={styles.indent}>
            <Drawer.Trigger asChild={(props) => <Button {...props()}>{copy.trigger}</Button>} />
          </Drawer.Indent>
          <Drawer.Backdrop class={styles.backdrop} />
          <Drawer.Positioner class={styles.positioner}>
            <Drawer.Content>
              <Drawer.Grabber>
                <Drawer.GrabberIndicator />
              </Drawer.Grabber>
              <Drawer.Header>
                <Drawer.Title>{copy.title}</Drawer.Title>
                <Drawer.CloseIcon />
              </Drawer.Header>
              <Drawer.Body class={styles.body}>
                <Card size="sm" class={styles.card}>
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