import { Button } from '@moduix/solid/button';
import { Menu } from '@moduix/solid/menu';
import { createSignal } from 'solid-js';
import styles from '@/components/examples/menu/menu-controlled.module.css';

export default function ControlledMenuDemo() {
  const [open, setOpen] = createSignal(false);

  return (
    <div>
      <Menu open={open()} onOpenChange={(details) => setOpen(details.open)}>
        <Menu.Trigger asChild={(props) => <Button {...props()} />}>
          Actions
          <Menu.Indicator />
        </Menu.Trigger>
        <Menu.Positioner>
          <Menu.Content class={styles.content}>
            <Menu.Viewport>
              <Menu.Item value="edit">Edit</Menu.Item>
              <Menu.Item value="duplicate">Duplicate</Menu.Item>
              <Menu.Item value="archive">Archive</Menu.Item>
              <Menu.Item value="delete" tone="destructive">
                Delete
              </Menu.Item>
            </Menu.Viewport>
          </Menu.Content>
        </Menu.Positioner>
      </Menu>
      <output>Open: {open() ? 'Yes' : 'No'}</output>
      <Button size="sm" onClick={() => setOpen(!open())}>
        Toggle
      </Button>
    </div>
  );
}