import { Button, Menu } from '@moduix/react';

export default function NestedMenuDemo() {
  return (
    <Menu>
      <Menu.Trigger asChild>
        <Button>
          File
          <Menu.Indicator />
        </Button>
      </Menu.Trigger>
      <Menu.Positioner>
        <Menu.Content className="menu-content">
          <Menu.Item value="open">Open...</Menu.Item>
          <Menu.Item value="save">Save</Menu.Item>
          <Menu>
            <Menu.TriggerItem>
              Share
              <Menu.TriggerItemIcon />
            </Menu.TriggerItem>
            <Menu.Positioner>
              <Menu.Content className="menu-content">
                <Menu.Item value="email">Email</Menu.Item>
                <Menu.Item value="message">Message</Menu.Item>
                <Menu.Item value="copy-link">Copy Link</Menu.Item>
                <Menu.Item value="invite">Invite people</Menu.Item>
              </Menu.Content>
            </Menu.Positioner>
          </Menu>
          <Menu.Item value="print">Print</Menu.Item>
        </Menu.Content>
      </Menu.Positioner>
    </Menu>
  );
}