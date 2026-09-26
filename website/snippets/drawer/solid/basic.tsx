import { Button } from '@moduix/solid/button';
import { Card, CardBody } from '@moduix/solid/card';
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
} from '@moduix/solid/drawer';
import { For } from 'solid-js';
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
      <DrawerTrigger asChild={(props) => <Button {...props()}>Open drawer</Button>} />
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
          <DrawerBody class={styles.body}>
            <Card size="sm" class={styles.card}>
              <CardBody>
                <ul>
                  <For each={notifications}>{(notification) => <li>{notification}</li>}</For>
                </ul>
              </CardBody>
            </Card>
          </DrawerBody>
          <DrawerFooter>
            <Button>View inbox</Button>
            <DrawerCloseTrigger
              asChild={(props) => (
                <Button {...props()} variant="outline">
                  Close
                </Button>
              )}
            />
          </DrawerFooter>
        </DrawerContent>
      </DrawerPositioner>
    </Drawer>
  );
}