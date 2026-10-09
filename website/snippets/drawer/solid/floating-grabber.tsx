import { Button } from '@moduix/solid/button';
import { Card, CardBody } from '@moduix/solid/card';
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
} from '@moduix/solid/drawer';
import styles from '@/components/examples/drawer/drawer-floating-grabber.module.css';

export default function FloatingGrabberDrawerDemo() {
  return (
    <Drawer>
      <DrawerTrigger asChild={(props) => <Button {...props()}>Open drawer</Button>} />
      <DrawerBackdrop />
      <DrawerPositioner>
        <DrawerContent>
          <DrawerGrabber class={styles.grabber}>
            <DrawerGrabberIndicator />
          </DrawerGrabber>
          <DrawerHeader>
            <DrawerTitle>Floating grabber</DrawerTitle>
            <DrawerCloseIcon />
            <DrawerDescription>The handle sits 10px above the drawer edge.</DrawerDescription>
          </DrawerHeader>
          <DrawerBody class={styles.body}>
            <Card size="sm" class={styles.card}>
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