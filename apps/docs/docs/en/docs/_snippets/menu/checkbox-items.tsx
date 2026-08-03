import { Button } from '@moduix/react/button';
import { Menu } from '@moduix/react/menu';
import { useState } from 'react';

export default function CheckboxItemsMenuDemo() {
  const [showToolbar, setShowToolbar] = useState(true);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showStatusBar, setShowStatusBar] = useState(true);
  const [showLineNumbers, setShowLineNumbers] = useState(true);
  return (
    <Menu closeOnSelect={false}>
      <Menu.Trigger asChild>
        <Button>
          View
          <Menu.Indicator />
        </Button>
      </Menu.Trigger>
      <Menu.Positioner>
        <Menu.Content className="menu-content">
          <Menu.CheckboxItem checked={showToolbar} value="toolbar" onCheckedChange={setShowToolbar}>
            <Menu.ItemIndicator />
            <Menu.ItemText>Show Toolbar</Menu.ItemText>
          </Menu.CheckboxItem>
          <Menu.CheckboxItem checked={showSidebar} value="sidebar" onCheckedChange={setShowSidebar}>
            <Menu.ItemIndicator />
            <Menu.ItemText>Show Sidebar</Menu.ItemText>
          </Menu.CheckboxItem>
          <Menu.CheckboxItem
            checked={showStatusBar}
            value="status-bar"
            onCheckedChange={setShowStatusBar}
          >
            <Menu.ItemIndicator />
            <Menu.ItemText>Show Status Bar</Menu.ItemText>
          </Menu.CheckboxItem>
          <Menu.CheckboxItem
            checked={showLineNumbers}
            value="line-numbers"
            onCheckedChange={setShowLineNumbers}
          >
            <Menu.ItemIndicator />
            <Menu.ItemText>Show Line Numbers</Menu.ItemText>
          </Menu.CheckboxItem>
        </Menu.Content>
      </Menu.Positioner>
    </Menu>
  );
}