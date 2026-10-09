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
  DrawerHeader,
  DrawerPositioner,
  DrawerTitle,
  DrawerTrigger,
} from '@moduix/solid/drawer';
import styles from '@/components/examples/drawer/drawer-island.module.css';

export default function IslandDrawerDemo() {
  return (
    <Drawer swipeDirection="end">
      <DrawerTrigger asChild={(props) => <Button {...props()}>Open island drawer</Button>} />
      <DrawerBackdrop />
      <DrawerPositioner>
        <DrawerContent variant="island">
          <DrawerHeader>
            <DrawerTitle>Quick actions</DrawerTitle>
            <DrawerCloseIcon />
            <DrawerDescription>This drawer floats inside the viewport edge.</DrawerDescription>
          </DrawerHeader>
          <DrawerBody class={styles.body}>
            <Card size="sm" class={styles.card}>
              <CardBody>Choose an action without leaving your current context.</CardBody>
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
    </Drawer>
  );
}