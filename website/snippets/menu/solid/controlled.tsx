import { Button } from '@moduix/solid/button';
import {
  Menu,
  MenuTrigger,
  MenuIndicator,
  MenuPositioner,
  MenuContent,
  MenuViewport,
  MenuItem,
} from '@moduix/solid/menu';
import { createSignal } from 'solid-js';
import styles from '@/components/examples/menu/menu-controlled.module.css';

export default function ControlledMenuDemo() {
  const [open, setOpen] = createSignal(false);

  return (
    <div>
      <Menu open={open()} onOpenChange={(details) => setOpen(details.open)}>
        <MenuTrigger asChild={(props) => <Button {...props()} />}>
          Actions
          <MenuIndicator />
        </MenuTrigger>
        <MenuPositioner>
          <MenuContent class={styles.content}>
            <MenuViewport>
              <MenuItem value="edit">Edit</MenuItem>
              <MenuItem value="duplicate">Duplicate</MenuItem>
              <MenuItem value="archive">Archive</MenuItem>
              <MenuItem value="delete" tone="destructive">
                Delete
              </MenuItem>
            </MenuViewport>
          </MenuContent>
        </MenuPositioner>
      </Menu>
      <output>Open: {open() ? 'Yes' : 'No'}</output>
      <Button size="sm" onClick={() => setOpen(!open())}>
        Toggle
      </Button>
    </div>
  );
}