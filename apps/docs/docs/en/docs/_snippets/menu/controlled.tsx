import { Button, Menu } from '@moduix/react';
import { useState } from 'react';

export default function ControlledMenuDemo() {
  const [open, setOpen] = useState(false);
  return (
    <Menu open={open} onOpenChange={(details) => setOpen(details.open)}>
      <Button onClick={() => setOpen((value) => !value)}>Toggle</Button>
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
        </Menu.Content>
      </Menu.Positioner>
    </Menu>
  );
}