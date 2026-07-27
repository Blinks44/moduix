import { Button, Card, Drawer } from '@moduix/react';

const direction = 'end' as const;
export default function SwipeDirectionDrawerDemo() {
  return (
    <Drawer swipeDirection={direction}>
      <Drawer.Trigger asChild>
        <Button>Open right drawer</Button>
      </Drawer.Trigger>
      <Drawer.Backdrop />
      <Drawer.Positioner>
        <Drawer.Content>
          <Drawer.Header>
            <Drawer.Title>Details</Drawer.Title>
            <Drawer.CloseIcon />
            <Drawer.Description>Logical end resolves to the right in LTR.</Drawer.Description>
          </Drawer.Header>
          <Drawer.Body style={{ display: 'flex', flex: 1 }}>
            <Card size="sm" style={{ flex: 1, backgroundColor: 'var(--moduix-color-muted)' }}>
              <Card.Body>The same logical direction resolves correctly in RTL.</Card.Body>
            </Card>
          </Drawer.Body>
        </Drawer.Content>
      </Drawer.Positioner>
    </Drawer>
  );
}