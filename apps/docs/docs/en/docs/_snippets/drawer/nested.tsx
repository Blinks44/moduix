import { Button, Drawer, useDrawer } from '@moduix/react';

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
    <div className="nested-demo">
      <Button onClick={() => accountDrawer.setOpen(true)}>Open account drawer</Button>
      <Drawer.RootProvider value={accountDrawer}>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Grabber>
              <Drawer.GrabberIndicator />
            </Drawer.Grabber>
            <Drawer.Header>
              <Drawer.Title>Account</Drawer.Title>
              <Drawer.CloseIcon />
              <Drawer.Description>Review account preferences.</Drawer.Description>
            </Drawer.Header>
            <Drawer.Body>
              <Button variant="outline" onClick={() => securityDrawer.setOpen(true)}>
                Security settings
              </Button>
            </Drawer.Body>
          </Drawer.Content>
        </Drawer.Positioner>
      </Drawer.RootProvider>
      <Drawer.RootProvider value={securityDrawer}>
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Grabber>
              <Drawer.GrabberIndicator />
            </Drawer.Grabber>
            <Drawer.Header>
              <Drawer.Title>Security</Drawer.Title>
              <Drawer.CloseIcon />
              <Drawer.Description>Nested drawers keep their own focus state.</Drawer.Description>
            </Drawer.Header>
            <Drawer.Body>
              <ul className="nested-list">
                {items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Drawer.Body>
            <Drawer.Footer>
              <Drawer.CloseTrigger asChild>
                <Button variant="outline">Done</Button>
              </Drawer.CloseTrigger>
            </Drawer.Footer>
          </Drawer.Content>
        </Drawer.Positioner>
      </Drawer.RootProvider>
    </div>
  );
}