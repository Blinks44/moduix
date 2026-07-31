import { Button } from '@moduix/react/button';
import { Card } from '@moduix/react/card';
import { Drawer } from '@moduix/react/drawer';

const snapPoints = [0.45, 1];
const notifications = [
  'Your weekly report is ready to review.',
  'Maya mentioned you in the project update.',
  'Two tasks are due tomorrow.',
];

export default function DrawerDemo() {
  return (
    <Drawer snapPoints={snapPoints} defaultSnapPoint={snapPoints[0]}>
      <Drawer.Trigger asChild>
        <Button>Open drawer</Button>
      </Drawer.Trigger>
      <Drawer.Backdrop />
      <Drawer.Positioner>
        <Drawer.Content>
          <Drawer.Grabber>
            <Drawer.GrabberIndicator />
          </Drawer.Grabber>
          <Drawer.Header>
            <Drawer.Title>Notifications</Drawer.Title>
            <Drawer.CloseIcon />
            <Drawer.Description>Three updates need your attention.</Drawer.Description>
          </Drawer.Header>
          <Drawer.Body style={{ display: 'flex', flex: 1 }}>
            <Card size="sm" style={{ flex: 1, backgroundColor: 'var(--moduix-color-muted)' }}>
              <Card.Body>
                <ul>
                  {notifications.map((notification) => (
                    <li key={notification}>{notification}</li>
                  ))}
                </ul>
              </Card.Body>
            </Card>
          </Drawer.Body>
          <Drawer.Footer>
            <Button>View inbox</Button>
            <Drawer.CloseTrigger asChild>
              <Button variant="outline">Close</Button>
            </Drawer.CloseTrigger>
          </Drawer.Footer>
        </Drawer.Content>
      </Drawer.Positioner>
    </Drawer>
  );
}