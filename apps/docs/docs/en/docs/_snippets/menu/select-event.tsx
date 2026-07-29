import { Button, Menu } from '@moduix/react';
import { useState } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';

export default function SelectEventMenuDemo() {
  const [selected, setSelected] = useState('Nothing selected');
  return (
    <div>
      <div className="menu-trigger-row">
        <Menu onSelect={(details) => setSelected(details.value)}>
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
      </div>
      <PreviewMeta>
        <output>Selected: {selected}</output>
      </PreviewMeta>
    </div>
  );
}