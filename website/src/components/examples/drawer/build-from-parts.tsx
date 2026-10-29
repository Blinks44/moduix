import { Button } from '@moduix/react/button';
import { Card, CardBody } from '@moduix/react/card';
import { CloseButton } from '@moduix/react/close-button';
import {
  Drawer,
  DrawerBackdrop,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerDescription,
  DrawerGrabber,
  DrawerGrabberIndicator,
  DrawerPositioner,
  DrawerTitle,
  DrawerTrigger,
} from '@moduix/react/drawer';
import { X as XIcon } from 'lucide-react';
import styles from '@/components/examples/drawer/drawer-build-from-parts.module.css';

const snapPoints = [0.45, 1];
const notifications = [
  'Your weekly report is ready to review.',
  'Maya mentioned you in the project update.',
  'Two tasks are due tomorrow.',
];

export default function BuildFromPartsDrawerDemo() {
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
          <div className={styles.header}>
            <DrawerTitle>Notifications</DrawerTitle>
            <DrawerCloseTrigger asChild>
              <CloseButton aria-label="Close drawer" className={styles.closeButton}>
                <XIcon strokeWidth={3} />
              </CloseButton>
            </DrawerCloseTrigger>
            <DrawerDescription className={styles.description}>
              Three updates need your attention.
            </DrawerDescription>
          </div>
          <div className={styles.body}>
            <Card size="sm" className={styles.card}>
              <CardBody>
                <ul>
                  {notifications.map((notification) => (
                    <li key={notification}>{notification}</li>
                  ))}
                </ul>
              </CardBody>
            </Card>
          </div>
          <div className={styles.footer}>
            <Button>View inbox</Button>
            <DrawerCloseTrigger asChild>
              <Button variant="outline">Close</Button>
            </DrawerCloseTrigger>
          </div>
        </DrawerContent>
      </DrawerPositioner>
    </Drawer>
  );
}