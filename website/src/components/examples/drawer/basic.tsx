import { Button } from '@moduix/react/button';
import { Card, CardBody } from '@moduix/react/card';
import {
  Drawer,
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseIcon,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerGrabber,
  DrawerGrabberIndicator,
  DrawerHeader,
  DrawerPositioner,
  DrawerTitle,
  DrawerTrigger,
} from '@moduix/react/drawer';
import styles from '@/components/examples/drawer/drawer-basic.module.css';

const snapPoints = [0.45, 1];
const notifications = [
  'Your weekly report is ready to review.',
  'Maya mentioned you in the project update.',
  'Two tasks are due tomorrow.',
];

export default function DrawerDemo() {
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
            <DrawerTitle>Notifications</DrawerTitle>
            <DrawerCloseIcon />
            <DrawerDescription>Three updates need your attention.</DrawerDescription>
          </DrawerHeader>
          <DrawerBody className={styles.body}>
            <Card size="sm" className={styles.card}>
              <CardBody>
                <ul>
                  {notifications.map((notification) => (
                    <li key={notification}>{notification}</li>
                  ))}
                </ul>
              </CardBody>
            </Card>
          </DrawerBody>
          <DrawerFooter>
            <Button>View inbox</Button>
            <DrawerCloseTrigger asChild>
              <Button variant="outline">Close</Button>
            </DrawerCloseTrigger>
          </DrawerFooter>
        </DrawerContent>
      </DrawerPositioner>
    </Drawer>
  );
}