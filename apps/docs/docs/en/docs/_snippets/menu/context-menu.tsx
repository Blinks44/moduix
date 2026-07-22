import { Menu } from '@moduix/react';

export default function ContextMenuDemo() {
  return (
    <Menu>
      <Menu.ContextTrigger className="menu-context-trigger">Right click here</Menu.ContextTrigger>
      <Menu.Positioner>
        <Menu.Content className="menu-content">
          <Menu.Item value="cut">Cut</Menu.Item>
          <Menu.Item value="copy">Copy</Menu.Item>
          <Menu.Item value="paste">Paste</Menu.Item>
        </Menu.Content>
      </Menu.Positioner>
    </Menu>
  );
}