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
import styles from '@/components/examples/drawer/drawer-snap-points.module.css';

const snapPoints = [0.25, 0.5, 1];
export default function SnapPointsDrawerDemo() {
  return (
    <Drawer snapPoints={snapPoints} defaultSnapPoint={snapPoints[1]}>
      <DrawerTrigger asChild>
        <Button>Open with snap points</Button>
      </DrawerTrigger>
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
          <DrawerBody className={styles.body}>
            <Card size="sm" className={styles.card}>
              <CardBody>25% · 50% · 100%</CardBody>
            </Card>
          </DrawerBody>
        </DrawerContent>
      </DrawerPositioner>
    </Drawer>
  );
}