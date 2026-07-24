import { Button, Drawer } from '@moduix/react';
import styles from '@/components/examples/drawer-preview.module.css';

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
          <Drawer.Indent className={styles.surface}>
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
            </Drawer.Content>
          </Drawer.Positioner>
        </Drawer>
      </div>
    </Drawer.Stack>
  );
}