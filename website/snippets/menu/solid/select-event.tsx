import { Button } from '@moduix/solid/button';
import { Menu } from '@moduix/solid/menu';
import { createSignal } from 'solid-js';
import styles from '@/components/examples/menu/menu-select-event.module.css';

export default function SelectEventMenuDemo() {
  const [selected, setSelected] = createSignal('Nothing selected');

  return (
    <div>
      <div class={styles.triggerRow}>
        <Menu onSelect={(details) => setSelected(details.value)}>
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
      </div>
      <output>Selected: {selected()}</output>
    </div>
  );
}