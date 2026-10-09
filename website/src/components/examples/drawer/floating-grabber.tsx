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
import styles from '@/components/examples/drawer/drawer-floating-grabber.module.css';

export default function FloatingGrabberDrawerDemo() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>Open drawer</Button>
      </DrawerTrigger>
      <DrawerBackdrop />
      <DrawerPositioner>
        <DrawerContent>
          <DrawerGrabber className={styles.grabber}>
            <DrawerGrabberIndicator />
          </DrawerGrabber>
          <DrawerHeader>
            <DrawerTitle>Floating grabber</DrawerTitle>
            <DrawerCloseIcon />
            <DrawerDescription>The handle sits 10px above the drawer edge.</DrawerDescription>
          </DrawerHeader>
          <DrawerBody className={styles.body}>
            <Card size="sm" className={styles.card}>
              <CardBody>
                Use this treatment when the handle should read as a separate control.
              </CardBody>
            </Card>
          </DrawerBody>
        </DrawerContent>
      </DrawerPositioner>
    </Drawer>
  );
}