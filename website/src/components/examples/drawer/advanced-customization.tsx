import { Button } from '@moduix/react/button';
import { Card } from '@moduix/react/card';
import { Checkbox } from '@moduix/react/checkbox';
import { Drawer } from '@moduix/react/drawer';
import styles from '@/components/examples/drawer/drawer-advanced-customization.module.css';

export default function AdvancedCustomizationDrawerDemo() {
  return (
    <Drawer swipeDirection="end">
      <Drawer.Trigger asChild>
        <Button>Open preferences</Button>
      </Drawer.Trigger>
      <Drawer.Backdrop />
      <Drawer.Positioner>
        <Drawer.Content className={styles.content}>
          <Drawer.Grabber>
            <Drawer.GrabberIndicator />
          </Drawer.Grabber>
          <Drawer.Title>Preferences</Drawer.Title>
          <Drawer.Description>Choose how you want notifications delivered.</Drawer.Description>
          <Card size="sm" className={styles.card}>
            <Card.Body>
              <Checkbox defaultChecked>
                <Checkbox.Control />
                <Checkbox.Label>Email notifications</Checkbox.Label>
                <Checkbox.HiddenInput />
              </Checkbox>
            </Card.Body>
          </Card>
          <Drawer.CloseTrigger asChild>
            <Button variant="outline">Done</Button>
          </Drawer.CloseTrigger>
        </Drawer.Content>
      </Drawer.Positioner>
    </Drawer>
  );
}