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
} from '@moduix/react/drawer';
import { useState } from 'react';
import styles from '@/components/examples/drawer/drawer-controlled.module.css';

const initialOpen = false;
const snapPoints = [0.18, 1];
export default function ControlledDrawerDemo() {
  const [open, setOpen] = useState(initialOpen);
  return (
    <>
      <Button type="button" onClick={() => setOpen((value) => !value)}>
        {open ? 'Close' : 'Open'} drawer
      </Button>
      <Drawer
        open={open}
        snapPoints={snapPoints}
        defaultSnapPoint={snapPoints[0]}
        onOpenChange={(details) => setOpen(details.open)}
      >
        <DrawerBackdrop />
        <DrawerPositioner>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Controlled drawer</DrawerTitle>
              <DrawerCloseIcon />
              <DrawerDescription>Open: {String(open)}</DrawerDescription>
            </DrawerHeader>
            <DrawerBody className={styles.body}>
              <Card size="sm" className={styles.card}>
                <CardBody>The trigger and close controls both update the same state.</CardBody>
              </Card>
            </DrawerBody>
          </DrawerContent>
        </DrawerPositioner>
      </Drawer>
    </>
  );
}