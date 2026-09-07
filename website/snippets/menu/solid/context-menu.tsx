import { Menu } from '@moduix/solid/menu';
import styles from '@/components/examples/menu/menu-context-menu.module.css';

export default function ContextMenuDemo() {
  return (
    <Menu>
      <Menu.ContextTrigger class={styles.contextTrigger}>Right click here</Menu.ContextTrigger>
      <Menu.Positioner>
        <Menu.Content class={styles.content}>
          <Menu.Viewport>
            <Menu.Item value="cut">Cut</Menu.Item>
            <Menu.Item value="copy">Copy</Menu.Item>
            <Menu.Item value="paste">Paste</Menu.Item>
            <Menu.Item value="select-all">Select All</Menu.Item>
          </Menu.Viewport>
        </Menu.Content>
      </Menu.Positioner>
    </Menu>
  );
}