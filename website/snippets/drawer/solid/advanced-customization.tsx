import { Button } from '@moduix/solid/button';
import { Card, CardBody } from '@moduix/solid/card';
import {
  Checkbox,
  CheckboxControl,
  CheckboxHiddenInput,
  CheckboxLabel,
} from '@moduix/solid/checkbox';
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
import styles from '@/components/examples/drawer/drawer-advanced-customization.module.css';

export default function AdvancedCustomizationDrawerDemo() {
  return (
    <Drawer swipeDirection="end">
      <DrawerTrigger asChild={(props) => <Button {...props()}>Open preferences</Button>} />
      <DrawerBackdrop />
      <DrawerPositioner>
        <DrawerContent class={styles.content}>
          <DrawerGrabber>
            <DrawerGrabberIndicator />
          </DrawerGrabber>
          <DrawerTitle>Preferences</DrawerTitle>
          <DrawerDescription>Choose how you want notifications delivered.</DrawerDescription>
          <Card size="sm" class={styles.card}>
            <CardBody>
              <Checkbox defaultChecked>
                <CheckboxControl />
                <CheckboxLabel>Email notifications</CheckboxLabel>
                <CheckboxHiddenInput />
              </Checkbox>
            </CardBody>
          </Card>
          <DrawerCloseTrigger
            asChild={(props) => (
              <Button {...props()} variant="outline">
                Done
              </Button>
            )}
          />
        </DrawerContent>
      </DrawerPositioner>
    </Drawer>
  );
}