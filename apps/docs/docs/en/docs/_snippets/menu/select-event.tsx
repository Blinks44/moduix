import { Button, Menu } from '@moduix/react';
import { useState } from 'react';
import { PreviewLayout } from '@/components/examples/preview-layout';

export default function SelectEventMenuDemo() {
  const [selected, setSelected] = useState('Nothing selected');
  return (
    <PreviewLayout gap="var(--moduix-spacing-2)">
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
            <Menu.Item value="archive">Archive</Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Menu>
      <span>{selected}</span>
    </PreviewLayout>
  );
}