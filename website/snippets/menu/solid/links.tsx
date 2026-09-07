import { Button } from '@moduix/solid/button';
import { Menu } from '@moduix/solid/menu';
import styles from '@/components/examples/menu/menu-links.module.css';

export default function LinkItemsMenuDemo() {
  return (
    <Menu>
      <Menu.Trigger asChild={(props) => <Button {...props()} />}>
        Help
        <Menu.Indicator />
      </Menu.Trigger>
      <Menu.Positioner>
        <Menu.Content class={styles.content}>
          <Menu.Item asChild={(props) => <a {...props()} href="#menu-docs" />} value="docs">
            Documentation
          </Menu.Item>
          <Menu.Item
            asChild={(props) => <a {...props()} href="https://github.com/Blinks44/moduix" />}
            value="github"
          >
            GitHub
          </Menu.Item>
          <Menu.Item
            asChild={(props) => <a {...props()} href="#menu-changelog" />}
            value="changelog"
          >
            Changelog
          </Menu.Item>
          <Menu.Item asChild={(props) => <a {...props()} href="#menu-support" />} value="support">
            Support
          </Menu.Item>
        </Menu.Content>
      </Menu.Positioner>
    </Menu>
  );
}