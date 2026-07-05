/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Button, Menu } from '@moduix/react';

export function LinkItemsMenuDemo() {
  return (
    <Menu>
      <Menu.Trigger asChild>
        <Button>
          Help
          <Menu.Indicator />
        </Button>
      </Menu.Trigger>
      <Menu.Positioner>
        <Menu.Content className="menu-content">
          <Menu.Item value="docs" asChild>
            <a href="#menu-docs">Documentation</a>
          </Menu.Item>
          <Menu.Item value="github" asChild>
            <a href="https://github.com/Blinks44/moduix">GitHub</a>
          </Menu.Item>
        </Menu.Content>
      </Menu.Positioner>
    </Menu>
  );
}

//#endregion