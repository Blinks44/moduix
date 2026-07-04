/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Menu as ArkMenu } from '@ark-ui/react/menu';
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
            <ArkMenu.ItemContext>
              {(item) => (
                <span
                  style={{
                    fontWeight: item.highlighted ? 'var(--weight-semibold)' : undefined,
                  }}
                >
                  Profile Settings
                </span>
              )}
            </ArkMenu.ItemContext>
          </Menu.Item>
        </Menu.Content>
      </Menu.Positioner>
    </Menu>
  );
}

//#endregion