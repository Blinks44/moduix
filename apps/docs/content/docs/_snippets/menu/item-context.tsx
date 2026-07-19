/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Button, Menu } from '@moduix/react';

export function ItemContextMenuDemo() {
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
                <span
                  style={{
                    fontWeight: item.highlighted ? 'var(--weight-semibold)' : undefined,
                  }}
                >
                  Profile Settings
                </span>
              )}
            </Menu.ItemContext>
          </Menu.Item>
        </Menu.Content>
      </Menu.Positioner>
    </Menu>
  );
}

//#endregion