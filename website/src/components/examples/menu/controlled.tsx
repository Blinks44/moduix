import { Button } from '@moduix/react/button';
import {
  Menu,
  MenuTrigger,
  MenuIndicator,
  MenuPositioner,
  MenuContent,
  MenuViewport,
  MenuItem,
} from '@moduix/react/menu';
import { useState } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';
import styles from '@/components/examples/menu/menu-controlled.module.css';

export default function ControlledMenuDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Menu open={open} onOpenChange={(details) => setOpen(details.open)}>
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
      <PreviewMeta>
        <output>Open: {open ? 'Yes' : 'No'}</output>
        <Button size="sm" onClick={() => setOpen((value) => !value)}>
          Toggle
        </Button>
      </PreviewMeta>
    </div>
  );
}