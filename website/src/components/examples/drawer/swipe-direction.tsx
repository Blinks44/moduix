import { Button } from '@moduix/react/button';
import { Card, CardBody } from '@moduix/react/card';
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
} from '@moduix/react/drawer';
import styles from '@/components/examples/drawer/drawer-swipe-direction.module.css';

const direction = 'end' as const;
export default function SwipeDirectionDrawerDemo() {
  return (
    <div className={styles.root}>
      <Drawer swipeDirection={direction}>
        <DrawerTrigger asChild>
          <Button>Open right drawer</Button>
        </DrawerTrigger>
        <DrawerBackdrop />
        <DrawerPositioner>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Details</DrawerTitle>
              <DrawerCloseIcon />
              <DrawerDescription>Logical end resolves to the right in LTR.</DrawerDescription>
            </DrawerHeader>
            <DrawerBody className={styles.body}>
              <Card size="sm" className={styles.card}>
                <CardBody>The same logical direction resolves correctly in RTL.</CardBody>
              </Card>
            </DrawerBody>
          </DrawerContent>
        </DrawerPositioner>
      </Drawer>

      <Drawer swipeDirection="up">
        <DrawerTrigger asChild>
          <Button>Open top drawer</Button>
        </DrawerTrigger>
        <DrawerBackdrop />
        <DrawerPositioner>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Top drawer</DrawerTitle>
              <DrawerCloseIcon />
              <DrawerDescription>Swipe up to dismiss this drawer.</DrawerDescription>
            </DrawerHeader>
            <DrawerBody className={styles.body}>
              <Card size="sm" className={styles.card}>
                <CardBody>Check this direction on a mobile viewport.</CardBody>
              </Card>
            </DrawerBody>
          </DrawerContent>
        </DrawerPositioner>
      </Drawer>
    </div>
  );
}