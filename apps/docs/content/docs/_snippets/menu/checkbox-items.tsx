/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Button, Menu } from '@moduix/react';
import { useState } from 'react';

export function CheckboxItemsMenuDemo() {
  const [showToolbar, setShowToolbar] = useState(true);
  return (
    <Menu>
      <Menu.Trigger asChild>
        <Button>
          View
          <Menu.Indicator />
        </Button>
      </Menu.Trigger>
      <Menu.Positioner>
        <Menu.Content className="menu-content">
          <Menu.CheckboxItem checked={showToolbar} value="toolbar" onCheckedChange={setShowToolbar}>
            <Menu.ItemIndicator />
            <Menu.ItemText>Show Toolbar</Menu.ItemText>
          </Menu.CheckboxItem>
        </Menu.Content>
      </Menu.Positioner>
    </Menu>
  );
}

//#endregion