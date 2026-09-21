import { Button } from '@moduix/react/button';
import { Menu, MenuTrigger, MenuIndicator, MenuPositioner, MenuContent, MenuViewport, MenuItem } from '@moduix/react/menu';
import { useState } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';
import styles from '@/components/examples/menu/menu-select-event.module.css';

export default function SelectEventMenuDemo() {
  const [selected, setSelected] = useState('Nothing selected');
  return (
    <div>
      <div className={styles.triggerRow}>
        <Menu onSelect={(details) => setSelected(details.value)}>
          <MenuTrigger asChild>
            <Button>
              Actions
              <MenuIndicator />
            </Button>
          </MenuTrigger>
          <MenuPositioner>
            <MenuContent className={styles.content}>
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
      <PreviewMeta>
        <output>Selected: {selected}</output>
      </PreviewMeta>
    </div>
  );
}
