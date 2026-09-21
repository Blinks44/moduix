import { Button } from '@moduix/react/button';
import { Card, CardBody } from '@moduix/react/card';
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
} from '@moduix/react/drawer';
import styles from '@/components/examples/drawer/drawer-indent-background.module.css';

const copy = {
  trigger: 'Open indented drawer',
  title: 'Indent effect',
};
const snapPoints = [0.18, 1];

export default function IndentDrawerDemo() {
  return (
    <DrawerStack>
      <div className={styles.stage}>
        <DrawerIndentBackground />
        <Drawer
          modal={false}
          portalled={false}
          snapPoints={snapPoints}
          defaultSnapPoint={snapPoints[0]}
        >
          <DrawerIndent className={styles.indent}>
            <DrawerTrigger asChild>
              <Button>{copy.trigger}</Button>
            </DrawerTrigger>
          </DrawerIndent>
          <DrawerBackdrop className={styles.backdrop} />
          <DrawerPositioner className={styles.positioner}>
            <DrawerContent>
              <DrawerGrabber>
                <DrawerGrabberIndicator />
              </DrawerGrabber>
              <DrawerHeader>
                <DrawerTitle>{copy.title}</DrawerTitle>
                <DrawerCloseIcon />
              </DrawerHeader>
              <DrawerBody className={styles.body}>
                <Card size="sm" className={styles.card}>
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