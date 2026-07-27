import { Button, Card, Drawer } from '@moduix/react';

export default function FloatingGrabberDrawerDemo() {
  return (
    <Drawer>
      <Drawer.Trigger asChild>
        <Button>Open drawer</Button>
      </Drawer.Trigger>
      <Drawer.Backdrop />
      <Drawer.Positioner>
        <Drawer.Content>
          <Drawer.Grabber
            style={{
              position: 'absolute',
              zIndex: 1,
              insetBlockStart: 0,
              insetInline: 0,
              transform: 'translateY(calc(-100% - 10px))',
            }}
          >
            <Drawer.GrabberIndicator />
          </Drawer.Grabber>
          <Drawer.Header>
            <Drawer.Title>Floating grabber</Drawer.Title>
            <Drawer.CloseIcon />
            <Drawer.Description>The handle sits 10px above the drawer edge.</Drawer.Description>
          </Drawer.Header>
          <Drawer.Body style={{ display: 'flex', flex: 1 }}>
            <Card size="sm" style={{ flex: 1, backgroundColor: 'var(--moduix-color-muted)' }}>
              <Card.Body>
                Use this treatment when the handle should read as a separate control.
              </Card.Body>
            </Card>
          </Drawer.Body>
        </Drawer.Content>
      </Drawer.Positioner>
    </Drawer>
  );
}