import { Button, Drawer } from '@moduix/react';

export default function AdvancedCustomizationDrawerDemo() {
  return (
    <Drawer swipeDirection="end">
      <Drawer.Trigger asChild>
        <Button>Open preferences</Button>
      </Drawer.Trigger>
      <Drawer.Backdrop />
      <Drawer.Positioner>
        <Drawer.Content>
          <Drawer.Grabber>
            <Drawer.GrabberIndicator />
          </Drawer.Grabber>
          <Drawer.Title>Preferences</Drawer.Title>
          <Drawer.Description>Choose how you want notifications delivered.</Drawer.Description>
          <div>
            <label>
              <input type="checkbox" defaultChecked /> Email notifications
            </label>
          </div>
          <Drawer.CloseTrigger asChild>
            <Button variant="outline">Done</Button>
          </Drawer.CloseTrigger>
        </Drawer.Content>
      </Drawer.Positioner>
    </Drawer>
  );
}