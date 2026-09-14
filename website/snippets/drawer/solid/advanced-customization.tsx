import { Button } from '@moduix/solid/button';
import { Card } from '@moduix/solid/card';
import { Checkbox } from '@moduix/solid/checkbox';
import { Drawer } from '@moduix/solid/drawer';
import styles from '@/components/examples/drawer/drawer-advanced-customization.module.css';

export default function AdvancedCustomizationDrawerDemo() {
  return (
    <Drawer swipeDirection="end">
      <Drawer.Trigger asChild={(props) => <Button {...props()}>Open preferences</Button>} />
      <Drawer.Backdrop />
      <Drawer.Positioner>
        <Drawer.Content class={styles.content}>
          <Drawer.Grabber>
            <Drawer.GrabberIndicator />
          </Drawer.Grabber>
          <Drawer.Title>Preferences</Drawer.Title>
          <Drawer.Description>Choose how you want notifications delivered.</Drawer.Description>
          <Card size="sm" class={styles.card}>
            <Card.Body>
              <Checkbox defaultChecked>
                <Checkbox.Control />
                <Checkbox.Label>Email notifications</Checkbox.Label>
                <Checkbox.HiddenInput />
              </Checkbox>
            </Card.Body>
          </Card>
          <Drawer.CloseTrigger
            asChild={(props) => (
              <Button {...props()} variant="outline">
                Done
              </Button>
            )}
          />
        </Drawer.Content>
      </Drawer.Positioner>
    </Drawer>
  );
}