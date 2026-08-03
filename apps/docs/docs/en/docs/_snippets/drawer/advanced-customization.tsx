import { Button } from '@moduix/react/button';
import { Card } from '@moduix/react/card';
import { Checkbox } from '@moduix/react/checkbox';
import { Drawer } from '@moduix/react/drawer';

export default function AdvancedCustomizationDrawerDemo() {
  return (
    <Drawer swipeDirection="end">
      <Drawer.Trigger asChild>
        <Button>Open preferences</Button>
      </Drawer.Trigger>
      <Drawer.Backdrop />
      <Drawer.Positioner>
        <Drawer.Content style={{ gap: 'var(--moduix-spacing-4)' }}>
          <Drawer.Grabber>
            <Drawer.GrabberIndicator />
          </Drawer.Grabber>
          <Drawer.Title>Preferences</Drawer.Title>
          <Drawer.Description>Choose how you want notifications delivered.</Drawer.Description>
          <Card size="sm" style={{ flex: 1, backgroundColor: 'var(--moduix-color-muted)' }}>
            <Card.Body>
              <Checkbox defaultChecked>
                <Checkbox.Control />
                <Checkbox.Label>Email notifications</Checkbox.Label>
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