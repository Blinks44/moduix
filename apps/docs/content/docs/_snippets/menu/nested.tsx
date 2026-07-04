/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Button, Menu } from '@moduix/react';

export function NestedMenuDemo() {
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
          <Menu>
            <Menu.TriggerItem>
              Share
              <Menu.TriggerItemIcon />
            </Menu.TriggerItem>
            <Menu.Positioner>
              <Menu.Content className="menu-content">
                <Menu.Item value="email">Email</Menu.Item>
                <Menu.Item value="message">Message</Menu.Item>
              </Menu.Content>
            </Menu.Positioner>
          </Menu>
        </Menu.Content>
      </Menu.Positioner>
    </Menu>
  );
}

//#endregion