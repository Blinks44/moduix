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
  DrawerHeader,
  DrawerPositioner,
  DrawerTitle,
  DrawerTrigger,
} from '@moduix/react/drawer';
import styles from '@/components/examples/drawer/drawer-island.module.css';

export default function IslandDrawerDemo() {
  return (
    <Drawer swipeDirection="end">
      <DrawerTrigger asChild>
        <Button>Open island drawer</Button>
      </DrawerTrigger>
      <DrawerBackdrop />
      <DrawerPositioner>
        <DrawerContent variant="island">
          <DrawerHeader>
            <DrawerTitle>Quick actions</DrawerTitle>
            <DrawerCloseIcon />
            <DrawerDescription>This drawer floats inside the viewport edge.</DrawerDescription>
          </DrawerHeader>
          <DrawerBody className={styles.body}>
            <Card size="sm" className={styles.card}>
              <CardBody>Choose an action without leaving your current context.</CardBody>
            </Card>
          </DrawerBody>
          <DrawerFooter>
            <DrawerCloseTrigger asChild>
              <Button variant="outline">Done</Button>
            </DrawerCloseTrigger>
          </DrawerFooter>
        </DrawerContent>
      </DrawerPositioner>
    </Drawer>
  );
}