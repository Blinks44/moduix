import { Button } from '@moduix/solid/button';
import { Card, CardBody } from '@moduix/solid/card';
import {
  Drawer,
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseIcon,
  DrawerContent,
  DrawerGrabber,
  DrawerGrabberIndicator,
  DrawerHeader,
  DrawerIndent,
  DrawerIndentBackground,
  DrawerPositioner,
  DrawerStack,
  DrawerTitle,
  DrawerTrigger,
} from '@moduix/solid/drawer';
import styles from '@/components/examples/drawer/drawer-indent-background.module.css';

const copy = {
  trigger: 'Open indented drawer',
  title: 'Indent effect',
};
const snapPoints = [0.18, 1];

export default function IndentDrawerDemo() {
  return (
    <DrawerStack>
      <div class={styles.stage}>
        <DrawerIndentBackground />
        <Drawer
          modal={false}
          portalled={false}
          snapPoints={snapPoints}
          defaultSnapPoint={snapPoints[0]}
        >
          <DrawerIndent class={styles.indent}>
            <DrawerTrigger asChild={(props) => <Button {...props()}>{copy.trigger}</Button>} />
          </DrawerIndent>
          <DrawerBackdrop class={styles.backdrop} />
          <DrawerPositioner class={styles.positioner}>
            <DrawerContent>
              <DrawerGrabber>
                <DrawerGrabberIndicator />
              </DrawerGrabber>
              <DrawerHeader>
                <DrawerTitle>{copy.title}</DrawerTitle>
                <DrawerCloseIcon />
              </DrawerHeader>
              <DrawerBody class={styles.body}>
                <Card size="sm" class={styles.card}>
                  <CardBody>The background and surface move together.</CardBody>
                </Card>
              </DrawerBody>
            </DrawerContent>
          </DrawerPositioner>
        </Drawer>
      </div>
    </DrawerStack>
  );
}