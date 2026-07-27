import { Button, Card, Drawer } from '@moduix/react';
import { type CSSProperties } from 'react';

const copy = {
  trigger: 'Open indented drawer',
  title: 'Indent effect',
};
const snapPoints = [0.18, 1];
const stageStyle = {
  '--moduix-drawer-max-height': '100%',
  position: 'relative',
  isolation: 'isolate',
  minHeight: '22rem',
  overflow: 'hidden',
  background: 'var(--moduix-color-foreground)',
} as CSSProperties;

export default function IndentDrawerDemo() {
  return (
    <Drawer.Stack>
      <div style={stageStyle}>
        <Drawer.IndentBackground />
        <Drawer
          modal={false}
          portalled={false}
          snapPoints={snapPoints}
          defaultSnapPoint={snapPoints[0]}
        >
          <Drawer.Indent
            style={{
              display: 'grid',
              minHeight: '22rem',
              placeItems: 'center',
              padding: 'var(--moduix-spacing-6)',
              background: 'var(--moduix-color-background)',
            }}
          >
            <Drawer.Trigger asChild>
              <Button>{copy.trigger}</Button>
            </Drawer.Trigger>
          </Drawer.Indent>
          <Drawer.Backdrop style={{ position: 'absolute' }} />
          <Drawer.Positioner style={{ position: 'absolute' }}>
            <Drawer.Content>
              <Drawer.Grabber>
                <Drawer.GrabberIndicator />
              </Drawer.Grabber>
              <Drawer.Header>
                <Drawer.Title>{copy.title}</Drawer.Title>
                <Drawer.CloseIcon />
              </Drawer.Header>
              <Drawer.Body style={{ display: 'flex', flex: 1 }}>
                <Card size="sm" style={{ flex: 1, backgroundColor: 'var(--moduix-color-muted)' }}>
                  <Card.Body>The background and surface move together.</Card.Body>
                </Card>
              </Drawer.Body>
            </Drawer.Content>
          </Drawer.Positioner>
        </Drawer>
      </div>
    </Drawer.Stack>
  );
}