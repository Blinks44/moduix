import { Button } from '@moduix/react/button';
import { Menu } from '@moduix/react/menu';
import { useState } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';
import styles from '@/components/examples/menu/menu-select-event.module.css';

export default function SelectEventMenuDemo() {
  const [selected, setSelected] = useState('Nothing selected');
  return (
    <div>
      <div className={styles.triggerRow}>
        <Menu onSelect={(details) => setSelected(details.value)}>
          <Menu.Trigger asChild>
            <Button>
              Actions
              <Menu.Indicator />
            </Button>
          </Menu.Trigger>
          <Menu.Positioner>
            <Menu.Content className={styles.content}>
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
      <PreviewMeta>
        <output>Selected: {selected}</output>
      </PreviewMeta>
    </div>
  );
}