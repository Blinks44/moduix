import { Menu } from '@moduix/solid/menu';
import styles from '@/components/examples/menu/menu-lazy-mounted-context-menu.module.css';

export default function ContextLazyMountMenuDemo() {
  return (
    <Menu lazyMount unmountOnExit>
      <Menu.ContextTrigger class={styles.contextTrigger}>
        Right click lazy mounted content
      </Menu.ContextTrigger>
      <Menu.Positioner>
        <Menu.Content class={styles.content}>
          <Menu.Item value="cut">Cut</Menu.Item>
          <Menu.Item value="copy">Copy</Menu.Item>
          <Menu.Item value="paste">Paste</Menu.Item>
          <Menu.Item value="delete" tone="destructive">
            Delete
          </Menu.Item>
        </Menu.Content>
      </Menu.Positioner>
    </Menu>
  );
}