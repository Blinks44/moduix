import { Button } from '@moduix/react/button';
import { Card } from '@moduix/react/card';
import { Drawer, useDrawer } from '@moduix/react/drawer';
import { PreviewMeta } from '@/components/mdx/Components';

const snapPoints = [0.25, 0.5, 1];
export default function RootProviderDrawerDemo() {
  const drawer = useDrawer({
    defaultSnapPoint: snapPoints[1],
    snapPoints,
  });
  return (
    <>
      <Button onClick={() => drawer.setOpen(true)}>Open via API</Button>
      <Drawer.RootProvider value={drawer}>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Header>
              <Drawer.Title>Root provider</Drawer.Title>
              <Drawer.CloseIcon />
              <Drawer.Description>Control the drawer from outside its tree.</Drawer.Description>
            </Drawer.Header>
            <Drawer.Body style={{ display: 'flex', flex: 1 }}>
              <Card size="sm" style={{ flex: 1, backgroundColor: 'var(--moduix-color-muted)' }}>
                <Card.Body>State lives outside the drawer tree.</Card.Body>
              </Card>
            </Drawer.Body>
          </Drawer.Content>
        </Drawer.Positioner>
      </Drawer.RootProvider>
      <PreviewMeta>
        <output>Active snap point: {String(drawer.snapPoint)}</output>
        <Button size="sm" variant="outline" onClick={() => drawer.setSnapPoint(1)}>
          Set 100%
        </Button>
      </PreviewMeta>
    </>
  );
}