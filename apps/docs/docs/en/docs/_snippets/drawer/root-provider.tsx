import { Button, Drawer, useDrawer } from '@moduix/react';
import { PreviewMeta } from '@/components/mdx/Components';

const snapPoints = [0.25, 0.5, 1];
export default function RootProviderDrawerDemo() {
  const drawer = useDrawer({
    defaultSnapPoint: snapPoints[1],
    snapPoints,
  });
  return (
    <div className="provider-demo">
      <Drawer.RootProvider value={drawer}>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Header>
              <Drawer.Title>Root provider</Drawer.Title>
              <Drawer.CloseIcon />
              <Drawer.Description>Active snap point: {String(drawer.snapPoint)}</Drawer.Description>
            </Drawer.Header>
          </Drawer.Content>
        </Drawer.Positioner>
      </Drawer.RootProvider>
      <PreviewMeta>
        <Button size="sm" onClick={() => drawer.setOpen(true)}>
          Open via API
        </Button>
        <Button size="sm" variant="outline" onClick={() => drawer.setSnapPoint(1)}>
          Set 100%
        </Button>
      </PreviewMeta>
    </div>
  );
}