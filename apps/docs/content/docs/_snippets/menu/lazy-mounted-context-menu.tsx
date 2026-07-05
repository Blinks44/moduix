/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Menu } from '@moduix/react';

export function ContextLazyMountMenuDemo() {
  return (
    <Menu lazyMount unmountOnExit>
      <Menu.ContextTrigger className="menu-context-trigger">
        Right click lazy mounted content
      </Menu.ContextTrigger>
      <Menu.Positioner>
        <Menu.Content className="menu-content">
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

//#endregion