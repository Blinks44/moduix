import { Button } from '@moduix/react/button';
import { Menu } from '@moduix/react/menu';
import { useState } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';

export default function ControlledMenuDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Menu open={open} onOpenChange={(details) => setOpen(details.open)}>
        <Menu.Trigger asChild>
          <Button>
            Actions
            <Menu.Indicator />
          </Button>
        </Menu.Trigger>
        <Menu.Positioner>
          <Menu.Content className="menu-content">
            <Menu.Item value="edit">Edit</Menu.Item>
            <Menu.Item value="duplicate">Duplicate</Menu.Item>
            <Menu.Item value="archive">Archive</Menu.Item>
            <Menu.Item value="delete" tone="destructive">
              Delete
            </Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
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