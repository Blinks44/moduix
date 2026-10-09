import { Button } from '@moduix/react/button';
import {
  Menu,
  MenuTrigger,
  MenuIndicator,
  MenuPositioner,
  MenuContent,
  MenuViewport,
  MenuCheckboxItem,
  MenuItemIndicator,
  MenuItemText,
} from '@moduix/react/menu';
import { useState } from 'react';
import styles from '@/components/examples/menu/menu-checkbox-items.module.css';

export default function CheckboxItemsMenuDemo() {
  const [showToolbar, setShowToolbar] = useState(true);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showStatusBar, setShowStatusBar] = useState(true);
  const [showLineNumbers, setShowLineNumbers] = useState(true);
  return (
    <Menu closeOnSelect={false}>
      <MenuTrigger asChild>
        <Button>
          View
          <MenuIndicator />
        </Button>
      </MenuTrigger>
      <MenuPositioner>
        <MenuContent className={styles.content}>
          <MenuViewport>
            <MenuCheckboxItem
              checked={showToolbar}
              value="toolbar"
              onCheckedChange={setShowToolbar}
            >
              <MenuItemIndicator />
              <MenuItemText>Show Toolbar</MenuItemText>
            </MenuCheckboxItem>
            <MenuCheckboxItem
              checked={showSidebar}
              value="sidebar"
              onCheckedChange={setShowSidebar}
            >
              <MenuItemIndicator />
              <MenuItemText>Show Sidebar</MenuItemText>
            </MenuCheckboxItem>
            <MenuCheckboxItem
              checked={showStatusBar}
              value="status-bar"
              onCheckedChange={setShowStatusBar}
            >
              <MenuItemIndicator />
              <MenuItemText>Show Status Bar</MenuItemText>
            </MenuCheckboxItem>
            <MenuCheckboxItem
              checked={showLineNumbers}
              value="line-numbers"
              onCheckedChange={setShowLineNumbers}
            >
              <MenuItemIndicator />
              <MenuItemText>Show Line Numbers</MenuItemText>
            </MenuCheckboxItem>
          </MenuViewport>
        </MenuContent>
      </MenuPositioner>
    </Menu>
  );
}