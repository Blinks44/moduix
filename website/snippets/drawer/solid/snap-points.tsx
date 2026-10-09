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
import styles from '@/components/examples/drawer/drawer-snap-points.module.css';

const snapPoints = [0.25, 0.5, 1];

export default function SnapPointsDrawerDemo() {
  return (
    <Drawer snapPoints={snapPoints} defaultSnapPoint={snapPoints[1]}>
      <DrawerTrigger asChild={(props) => <Button {...props()}>Open with snap points</Button>} />
      <DrawerBackdrop />
      <DrawerPositioner>
        <DrawerContent>
          <DrawerGrabber>
            <DrawerGrabberIndicator />
          </DrawerGrabber>
          <DrawerHeader>
            <DrawerTitle>Snap points</DrawerTitle>
            <DrawerCloseIcon />
            <DrawerDescription>Drag between the configured snap points.</DrawerDescription>
          </DrawerHeader>
          <DrawerBody class={styles.body}>
            <Card size="sm" class={styles.card}>
              <CardBody>25% · 50% · 100%</CardBody>
            </Card>
          </DrawerBody>
        </DrawerContent>
      </DrawerPositioner>
    </Drawer>
  );
}