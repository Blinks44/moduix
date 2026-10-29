import { Button } from '@moduix/solid/button';
import { Card, CardBody } from '@moduix/solid/card';
import { CloseButton } from '@moduix/solid/close-button';
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
} from '@moduix/solid/drawer';
import { X as XIcon } from 'lucide-solid';
import { For } from 'solid-js';
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
      <DrawerTrigger asChild={(props) => <Button {...props()}>Open drawer</Button>} />
      <DrawerBackdrop />
      <DrawerPositioner>
        <DrawerContent>
          <DrawerGrabber>
            <DrawerGrabberIndicator />
          </DrawerGrabber>
          <div class={styles.header}>
            <DrawerTitle>Notifications</DrawerTitle>
            <DrawerCloseTrigger
              asChild={(props) => (
                <CloseButton {...props()} aria-label="Close drawer" class={styles.closeButton}>
                  <XIcon strokeWidth={3} />
                </CloseButton>
              )}
            />
            <DrawerDescription class={styles.description}>
              Three updates need your attention.
            </DrawerDescription>
          </div>
          <div class={styles.body}>
            <Card size="sm" class={styles.card}>
              <CardBody>
                <ul>
                  <For each={notifications}>{(notification) => <li>{notification}</li>}</For>
                </ul>
              </CardBody>
            </Card>
          </div>
          <div class={styles.footer}>
            <Button>View inbox</Button>
            <DrawerCloseTrigger
              asChild={(props) => (
                <Button {...props()} variant="outline">
                  Close
                </Button>
              )}
            />
          </div>
        </DrawerContent>
      </DrawerPositioner>
    </Drawer>
  );
}