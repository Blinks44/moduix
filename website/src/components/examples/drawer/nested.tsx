import { Button } from '@moduix/react/button';
import { Card, CardBody } from '@moduix/react/card';
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
} from '@moduix/react/drawer';
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
      <Button onClick={() => accountDrawer.setOpen(true)}>Open account drawer</Button>
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
            <DrawerBody className={styles.body}>
              <Card size="sm" className={styles.card}>
                <CardBody>
                  <Button variant="outline" onClick={() => securityDrawer.setOpen(true)}>
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
            <DrawerBody className={styles.body}>
              <Card size="sm" className={styles.card}>
                <CardBody>
                  <ul>
                    {items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </CardBody>
              </Card>
            </DrawerBody>
            <DrawerFooter>
              <DrawerCloseTrigger asChild>
                <Button variant="outline">Done</Button>
              </DrawerCloseTrigger>
            </DrawerFooter>
          </DrawerContent>
        </DrawerPositioner>
      </DrawerRootProvider>
    </div>
  );
}