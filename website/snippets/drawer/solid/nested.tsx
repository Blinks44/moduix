import { Button } from '@moduix/solid/button';
import { Card, CardBody } from '@moduix/solid/card';
import {
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
  DrawerRootProvider,
  DrawerTitle,
  useDrawer,
} from '@moduix/solid/drawer';
import { For } from 'solid-js';
import styles from '@/components/examples/drawer/drawer-nested.module.css';

const items = ['Passkeys enabled', 'Two-factor authentication on', '3 signed-in devices'];
const snapPoints = [0.42, 1];

export default function NestedDrawerDemo() {
  const accountDrawer = useDrawer({
    snapPoints,
    defaultSnapPoint: snapPoints[0],
  });
  const securityDrawer = useDrawer({
    snapPoints,
    defaultSnapPoint: snapPoints[0],
  });

  return (
    <div>
      <Button onClick={() => accountDrawer().setOpen(true)}>Open account drawer</Button>
      <DrawerRootProvider value={accountDrawer}>
        <DrawerBackdrop />
        <DrawerPositioner>
          <DrawerContent>
            <DrawerGrabber>
              <DrawerGrabberIndicator />
            </DrawerGrabber>
            <DrawerHeader>
              <DrawerTitle>Account</DrawerTitle>
              <DrawerCloseIcon />
              <DrawerDescription>Review account preferences.</DrawerDescription>
            </DrawerHeader>
            <DrawerBody class={styles.body}>
              <Card size="sm" class={styles.card}>
                <CardBody>
                  <Button variant="outline" onClick={() => securityDrawer().setOpen(true)}>
                    Security settings
                  </Button>
                </CardBody>
              </Card>
            </DrawerBody>
          </DrawerContent>
        </DrawerPositioner>
      </DrawerRootProvider>
      <DrawerRootProvider value={securityDrawer}>
        <DrawerPositioner>
          <DrawerContent>
            <DrawerGrabber>
              <DrawerGrabberIndicator />
            </DrawerGrabber>
            <DrawerHeader>
              <DrawerTitle>Security</DrawerTitle>
              <DrawerCloseIcon />
              <DrawerDescription>Nested drawers keep their own focus state.</DrawerDescription>
            </DrawerHeader>
            <DrawerBody class={styles.body}>
              <Card size="sm" class={styles.card}>
                <CardBody>
                  <ul>
                    <For each={items}>{(item) => <li>{item}</li>}</For>
                  </ul>
                </CardBody>
              </Card>
            </DrawerBody>
            <DrawerFooter>
              <DrawerCloseTrigger
                asChild={(props) => (
                  <Button {...props()} variant="outline">
                    Done
                  </Button>
                )}
              />
            </DrawerFooter>
          </DrawerContent>
        </DrawerPositioner>
      </DrawerRootProvider>
    </div>
  );
}