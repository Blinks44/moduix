import { Button } from '@moduix/solid/button';
import { Menu } from '@moduix/solid/menu';
import { createSignal } from 'solid-js';
import styles from '@/components/examples/menu/menu-checkbox-items.module.css';

export default function CheckboxItemsMenuDemo() {
  const [showToolbar, setShowToolbar] = createSignal(true);
  const [showSidebar, setShowSidebar] = createSignal(false);
  const [showStatusBar, setShowStatusBar] = createSignal(true);
  const [showLineNumbers, setShowLineNumbers] = createSignal(true);

  return (
    <Menu closeOnSelect={false}>
      <Menu.Trigger asChild={(props) => <Button {...props()} />}>
        View
        <Menu.Indicator />
      </Menu.Trigger>
      <Menu.Positioner>
        <Menu.Content class={styles.content}>
          <Menu.CheckboxItem
            checked={showToolbar()}
            value="toolbar"
            onCheckedChange={setShowToolbar}
          >
            <Menu.ItemIndicator />
            <Menu.ItemText>Show Toolbar</Menu.ItemText>
          </Menu.CheckboxItem>
          <Menu.CheckboxItem
            checked={showSidebar()}
            value="sidebar"
            onCheckedChange={setShowSidebar}
          >
            <Menu.ItemIndicator />
            <Menu.ItemText>Show Sidebar</Menu.ItemText>
          </Menu.CheckboxItem>
          <Menu.CheckboxItem
            checked={showStatusBar()}
            value="status-bar"
            onCheckedChange={setShowStatusBar}
          >
            <Menu.ItemIndicator />
            <Menu.ItemText>Show Status Bar</Menu.ItemText>
          </Menu.CheckboxItem>
          <Menu.CheckboxItem
            checked={showLineNumbers()}
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