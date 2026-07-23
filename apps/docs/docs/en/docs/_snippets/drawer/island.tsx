import { Button, Drawer } from '@moduix/react';

export default function IslandDrawerDemo() {
  return (
    <Drawer swipeDirection="end">
      <Drawer.Trigger asChild>
        <Button>Open island drawer</Button>
      </Drawer.Trigger>
      <Drawer.Backdrop />
      <Drawer.Positioner>
        <Drawer.Content variant="island">
          <Drawer.Header>
            <Drawer.Title>Quick actions</Drawer.Title>
            <Drawer.CloseIcon />
            <Drawer.Description>This drawer floats inside the viewport edge.</Drawer.Description>
          </Drawer.Header>
          <Drawer.Body>Choose an action without leaving your current context.</Drawer.Body>
          <Drawer.Footer>
            <Drawer.CloseTrigger asChild>
              <Button variant="outline">Done</Button>
            </Drawer.CloseTrigger>
          </Drawer.Footer>
        </Drawer.Content>
      </Drawer.Positioner>
    </Drawer>
  );
}