import { Button } from '@moduix/solid/button';
import { Card } from '@moduix/solid/card';
import { Drawer } from '@moduix/solid/drawer';
import { createSignal } from 'solid-js';
import styles from '@/components/examples/drawer/drawer-controlled.module.css';

const initialOpen = false;
const snapPoints = [0.18, 1];

export default function ControlledDrawerDemo() {
  const [open, setOpen] = createSignal(initialOpen);

  return (
    <>
      <Button type="button" onClick={() => setOpen((value) => !value)}>
        {open() ? 'Close' : 'Open'} drawer
      </Button>
      <Drawer
        open={open()}
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
              <Drawer.Description>Open: {String(open())}</Drawer.Description>
            </Drawer.Header>
            <Drawer.Body class={styles.body}>
              <Card size="sm" class={styles.card}>
                <Card.Body>The trigger and close controls both update the same state.</Card.Body>
              </Card>
            </Drawer.Body>
          </Drawer.Content>
        </Drawer.Positioner>
      </Drawer>
    </>
  );
}