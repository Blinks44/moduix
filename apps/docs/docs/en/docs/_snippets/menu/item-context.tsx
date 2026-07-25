import { Button, Menu } from '@moduix/react';

export default function ItemContextMenuDemo() {
  return (
    <Menu>
      <Menu.Trigger asChild>
        <Button>
          Settings
          <Menu.Indicator />
        </Button>
      </Menu.Trigger>
      <Menu.Positioner>
        <Menu.Content className="menu-content">
          <Menu.Item value="profile">
            <Menu.ItemContext>
              {(item) => (
                <span data-highlighted={item.highlighted || undefined}>Profile Settings</span>
              )}
            </Menu.ItemContext>
          </Menu.Item>
          <Menu.Item value="notifications">
            <Menu.ItemContext>
              {(item) => (
                <span data-highlighted={item.highlighted || undefined}>Notifications</span>
              )}
            </Menu.ItemContext>
          </Menu.Item>
          <Menu.Item value="appearance">
            <Menu.ItemContext>
              {(item) => <span data-highlighted={item.highlighted || undefined}>Appearance</span>}
            </Menu.ItemContext>
          </Menu.Item>
          <Menu.Item value="security">
            <Menu.ItemContext>
              {(item) => <span data-highlighted={item.highlighted || undefined}>Security</span>}
            </Menu.ItemContext>
          </Menu.Item>
        </Menu.Content>
      </Menu.Positioner>
    </Menu>
  );
}