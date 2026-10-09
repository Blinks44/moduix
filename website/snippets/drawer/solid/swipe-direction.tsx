import { Button } from '@moduix/solid/button';
import { Card, CardBody } from '@moduix/solid/card';
import {
  Drawer,
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseIcon,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerPositioner,
  DrawerTitle,
  DrawerTrigger,
} from '@moduix/solid/drawer';
import styles from '@/components/examples/drawer/drawer-swipe-direction.module.css';

const direction = 'end' as const;

export default function SwipeDirectionDrawerDemo() {
  return (
    <div class={styles.root}>
      <Drawer swipeDirection={direction}>
        <DrawerTrigger asChild={(props) => <Button {...props()}>Open right drawer</Button>} />
        <DrawerBackdrop />
        <DrawerPositioner>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Details</DrawerTitle>
              <DrawerCloseIcon />
              <DrawerDescription>Logical end resolves to the right in LTR.</DrawerDescription>
            </DrawerHeader>
            <DrawerBody class={styles.body}>
              <Card size="sm" class={styles.card}>
                <CardBody>The same logical direction resolves correctly in RTL.</CardBody>
              </Card>
            </DrawerBody>
          </DrawerContent>
        </DrawerPositioner>
      </Drawer>

      <Drawer swipeDirection="up">
        <DrawerTrigger asChild={(props) => <Button {...props()}>Open top drawer</Button>} />
        <DrawerBackdrop />
        <DrawerPositioner>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Top drawer</DrawerTitle>
              <DrawerCloseIcon />
              <DrawerDescription>Swipe up to dismiss this drawer.</DrawerDescription>
            </DrawerHeader>
            <DrawerBody class={styles.body}>
              <Card size="sm" class={styles.card}>
                <CardBody>Check this direction on a mobile viewport.</CardBody>
              </Card>
            </DrawerBody>
          </DrawerContent>
        </DrawerPositioner>
      </Drawer>
    </div>
  );
}