import { Button } from '@moduix/react/button';
import { Card } from '@moduix/react/card';
import { Drawer } from '@moduix/react/drawer';

const snapPoints = [0.25, 0.5, 1];
export default function SnapPointsDrawerDemo() {
  return (
    <Drawer snapPoints={snapPoints} defaultSnapPoint={snapPoints[1]}>
      <Drawer.Trigger asChild>
        <Button>Open with snap points</Button>
      </Drawer.Trigger>
      <Drawer.Backdrop />
      <Drawer.Positioner>
        <Drawer.Content>
          <Drawer.Grabber>
            <Drawer.GrabberIndicator />
          </Drawer.Grabber>
          <Drawer.Header>
            <Drawer.Title>Snap points</Drawer.Title>
            <Drawer.CloseIcon />
            <Drawer.Description>Drag between the configured snap points.</Drawer.Description>
          </Drawer.Header>
          <Drawer.Body style={{ display: 'flex', flex: 1 }}>
            <Card size="sm" style={{ flex: 1, backgroundColor: 'var(--moduix-color-muted)' }}>
              <Card.Body>25% · 50% · 100%</Card.Body>
            </Card>
          </Drawer.Body>
        </Drawer.Content>
      </Drawer.Positioner>
    </Drawer>
  );
}