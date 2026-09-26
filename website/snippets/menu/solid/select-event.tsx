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
import styles from '@/components/examples/menu/menu-select-event.module.css';

export default function SelectEventMenuDemo() {
  const [selected, setSelected] = createSignal('Nothing selected');

  return (
    <div>
      <div class={styles.triggerRow}>
        <Menu onSelect={(details) => setSelected(details.value)}>
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
      </div>
      <output>Selected: {selected()}</output>
    </div>
  );
}