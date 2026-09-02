import { Button } from '@moduix/react/button';
import { Menu } from '@moduix/react/menu';
import styles from '@/components/examples/menu/menu-links.module.css';

export default function LinkItemsMenuDemo() {
  return (
    <Menu>
      <Menu.Trigger asChild>
        <Button>
          Help
          <Menu.Indicator />
        </Button>
      </Menu.Trigger>
      <Menu.Positioner>
        <Menu.Content className={styles.content}>
          <Menu.Item value="docs" asChild>
            <a href="#menu-docs">Documentation</a>
          </Menu.Item>
          <Menu.Item value="github" asChild>
            <a href="https://github.com/Blinks44/moduix">GitHub</a>
          </Menu.Item>
          <Menu.Item value="changelog" asChild>
            <a href="#menu-changelog">Changelog</a>
          </Menu.Item>
          <Menu.Item value="support" asChild>
            <a href="#menu-support">Support</a>
          </Menu.Item>
        </Menu.Content>
      </Menu.Positioner>
    </Menu>
  );
}