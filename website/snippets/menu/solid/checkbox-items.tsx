import { Button } from '@moduix/solid/button';
import { Menu, MenuTrigger, MenuIndicator, MenuPositioner, MenuContent, MenuViewport, MenuCheckboxItem, MenuItemIndicator, MenuItemText } from '@moduix/solid/menu';
import { createSignal } from 'solid-js';
import styles from '@/components/examples/menu/menu-checkbox-items.module.css';

export default function CheckboxItemsMenuDemo() {
  const [showToolbar, setShowToolbar] = createSignal(true);
  const [showSidebar, setShowSidebar] = createSignal(false);
  const [showStatusBar, setShowStatusBar] = createSignal(true);
  const [showLineNumbers, setShowLineNumbers] = createSignal(true);

  return (
    <Menu closeOnSelect={false}>
      <MenuTrigger asChild={(props) => <Button {...props()} />}>
        View
        <MenuIndicator />
      </MenuTrigger>
      <MenuPositioner>
        <MenuContent class={styles.content}>
          <MenuViewport>
            <MenuCheckboxItem
              checked={showToolbar()}
              value="toolbar"
              onCheckedChange={setShowToolbar}
            >
              <MenuItemIndicator />
              <MenuItemText>Show Toolbar</MenuItemText>
            </MenuCheckboxItem>
            <MenuCheckboxItem
              checked={showSidebar()}
              value="sidebar"
              onCheckedChange={setShowSidebar}
            >
              <MenuItemIndicator />
              <MenuItemText>Show Sidebar</MenuItemText>
            </MenuCheckboxItem>
            <MenuCheckboxItem
              checked={showStatusBar()}
              value="status-bar"
              onCheckedChange={setShowStatusBar}
            >
              <MenuItemIndicator />
              <MenuItemText>Show Status Bar</MenuItemText>
            </MenuCheckboxItem>
            <MenuCheckboxItem
              checked={showLineNumbers()}
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
