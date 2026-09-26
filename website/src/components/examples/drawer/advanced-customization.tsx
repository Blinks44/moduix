import { Button } from '@moduix/react/button';
import { Card, CardBody } from '@moduix/react/card';
import {
  Checkbox,
  CheckboxControl,
  CheckboxHiddenInput,
  CheckboxLabel,
} from '@moduix/react/checkbox';
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
} from '@moduix/react/drawer';
import styles from '@/components/examples/drawer/drawer-advanced-customization.module.css';

export default function AdvancedCustomizationDrawerDemo() {
  return (
    <Drawer swipeDirection="end">
      <DrawerTrigger asChild>
        <Button>Open preferences</Button>
      </DrawerTrigger>
      <DrawerBackdrop />
      <DrawerPositioner>
        <DrawerContent className={styles.content}>
          <DrawerGrabber>
            <DrawerGrabberIndicator />
          </DrawerGrabber>
          <DrawerTitle>Preferences</DrawerTitle>
          <DrawerDescription>Choose how you want notifications delivered.</DrawerDescription>
          <Card size="sm" className={styles.card}>
            <CardBody>
              <Checkbox defaultChecked>
                <CheckboxControl />
                <CheckboxLabel>Email notifications</CheckboxLabel>
                <CheckboxHiddenInput />
              </Checkbox>
            </CardBody>
          </Card>
          <DrawerCloseTrigger asChild>
            <Button variant="outline">Done</Button>
          </DrawerCloseTrigger>
        </DrawerContent>
      </DrawerPositioner>
    </Drawer>
  );
}