import { Button } from '@moduix/react/button';
import { Card, CardBody } from '@moduix/react/card';
import {
  Drawer,
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseIcon,
  DrawerContent,
  DrawerDescription,
  DrawerGrabber,
  DrawerGrabberIndicator,
  DrawerHeader,
  DrawerPositioner,
  DrawerTitle,
  DrawerTrigger,
} from '@moduix/react/drawer';
import styles from '@/components/examples/drawer/drawer-drag-controls.module.css';

const snapPoints = [0.18, 1];
export default function DragControlsDrawerDemo() {
  return (
    <Drawer snapPoints={snapPoints} defaultSnapPoint={snapPoints[0]}>
      <DrawerTrigger asChild>
        <Button>Open drawer</Button>
      </DrawerTrigger>
      <DrawerBackdrop />
      <DrawerPositioner>
        <DrawerContent>
          <DrawerGrabber>
            <DrawerGrabberIndicator />
          </DrawerGrabber>
          <DrawerHeader>
            <DrawerTitle>Drag controls</DrawerTitle>
            <DrawerCloseIcon />
            <DrawerDescription>
              Content dragging is enabled; the interactive region does not start a drag.
            </DrawerDescription>
          </DrawerHeader>
          <DrawerBody className={styles.body}>
            <Card size="sm" className={styles.card}>
              <CardBody>
                <Button data-no-drag variant="outline">
                  Interactive no-drag region
                </Button>
              </CardBody>
            </Card>
          </DrawerBody>
        </DrawerContent>
      </DrawerPositioner>
    </Drawer>
  );
}