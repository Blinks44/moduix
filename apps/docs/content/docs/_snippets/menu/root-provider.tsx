/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Button, Menu, useMenu } from '@moduix/react';

export function RootProviderMenuDemo() {
  const menu = useMenu();
  return (
    <Menu.RootProvider value={menu}>
      <Button onClick={() => menu.api.setHighlightedValue('copy')}>Highlight Copy</Button>
      <Menu.Trigger asChild>
        <Button>
          Edit
          <Menu.Indicator />
        </Button>
      </Menu.Trigger>
      <Menu.Positioner>
        <Menu.Content className="menu-content">
          <Menu.Item value="cut">Cut</Menu.Item>
          <Menu.Item value="copy">Copy</Menu.Item>
          <Menu.Item value="paste">Paste</Menu.Item>
        </Menu.Content>
      </Menu.Positioner>
    </Menu.RootProvider>
  );
}

//#endregion