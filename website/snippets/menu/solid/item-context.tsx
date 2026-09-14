import { Button } from '@moduix/solid/button';
import { Menu } from '@moduix/solid/menu';
import styles from '@/components/examples/menu/menu-item-context.module.css';

export default function ItemContextMenuDemo() {
  return (
    <Menu>
      <Menu.Trigger asChild={(props) => <Button {...props()} />}>
        Settings
        <Menu.Indicator />
      </Menu.Trigger>
      <Menu.Positioner>
        <Menu.Content class={styles.content}>
          <Menu.Viewport>
            <Menu.Item value="profile">
              <Menu.ItemContext>
                {(item) => (
                  <span data-highlighted={item().highlighted ? '' : undefined}>
                    Profile Settings
                  </span>
                )}
              </Menu.ItemContext>
            </Menu.Item>
            <Menu.Item value="notifications">
              <Menu.ItemContext>
                {(item) => (
                  <span data-highlighted={item().highlighted ? '' : undefined}>Notifications</span>
                )}
              </Menu.ItemContext>
            </Menu.Item>
            <Menu.Item value="appearance">
              <Menu.ItemContext>
                {(item) => (
                  <span data-highlighted={item().highlighted ? '' : undefined}>Appearance</span>
                )}
              </Menu.ItemContext>
            </Menu.Item>
            <Menu.Item value="security">
              <Menu.ItemContext>
                {(item) => (
                  <span data-highlighted={item().highlighted ? '' : undefined}>Security</span>
                )}
              </Menu.ItemContext>
            </Menu.Item>
          </Menu.Viewport>
        </Menu.Content>
      </Menu.Positioner>
    </Menu>
  );
}