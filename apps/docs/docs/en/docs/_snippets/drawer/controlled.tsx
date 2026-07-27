import { Button, Card, Drawer } from '@moduix/react';
import { useState } from 'react';

const initialOpen = false;
const snapPoints = [0.18, 1];
export default function ControlledDrawerDemo() {
  const [open, setOpen] = useState(initialOpen);
  return (
    <>
      <Button type="button" onClick={() => setOpen((value) => !value)}>
        {open ? 'Close' : 'Open'} drawer
      </Button>
      <Drawer
        open={open}
        snapPoints={snapPoints}
        defaultSnapPoint={snapPoints[0]}
        onOpenChange={(details) => setOpen(details.open)}
      >
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Header>
              <Drawer.Title>Controlled drawer</Drawer.Title>
              <Drawer.CloseIcon />
              <Drawer.Description>Open: {String(open)}</Drawer.Description>
            </Drawer.Header>
            <Drawer.Body style={{ display: 'flex', flex: 1 }}>
              <Card size="sm" style={{ flex: 1, backgroundColor: 'var(--moduix-color-muted)' }}>
                <Card.Body>The trigger and close controls both update the same state.</Card.Body>
              </Card>
            </Drawer.Body>
          </Drawer.Content>
        </Drawer.Positioner>
      </Drawer>
    </>
  );
}