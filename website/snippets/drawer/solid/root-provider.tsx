import { Button } from '@moduix/solid/button';
import { Card, CardBody } from '@moduix/solid/card';
import {
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseIcon,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerPositioner,
  DrawerRootProvider,
  DrawerTitle,
  useDrawer,
} from '@moduix/solid/drawer';
import styles from '@/components/examples/drawer/drawer-root-provider.module.css';

const snapPoints = [0.25, 0.5, 1];

export default function RootProviderDrawerDemo() {
  const drawer = useDrawer({
    defaultSnapPoint: snapPoints[1],
    snapPoints,
  });

  return (
    <>
      <Button onClick={() => drawer().setOpen(true)}>Open via API</Button>
      <DrawerRootProvider value={drawer}>
        <DrawerBackdrop />
        <DrawerPositioner>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Root provider</DrawerTitle>
              <DrawerCloseIcon />
              <DrawerDescription>Control the drawer from outside its tree.</DrawerDescription>
            </DrawerHeader>
            <DrawerBody class={styles.body}>
              <Card size="sm" class={styles.card}>
                <CardBody>State lives outside the drawer tree.</CardBody>
              </Card>
            </DrawerBody>
          </DrawerContent>
        </DrawerPositioner>
      </DrawerRootProvider>
      <output>Active snap point: {String(drawer().snapPoint)}</output>
      <Button size="sm" variant="outline" onClick={() => drawer().setSnapPoint(1)}>
        Set 100%
      </Button>
    </>
  );
}