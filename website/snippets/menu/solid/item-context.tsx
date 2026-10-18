import { Button } from '@moduix/solid/button';
import {
  Menu,
  MenuTrigger,
  MenuIndicator,
  MenuPositioner,
  MenuContent,
  MenuViewport,
  MenuItem,
  MenuItemContext,
} from '@moduix/solid/menu';

export default function ItemContextMenuDemo() {
  return (
    <Menu>
      <MenuTrigger asChild={(props) => <Button {...props()} />}>
        Settings
        <MenuIndicator />
      </MenuTrigger>
      <MenuPositioner>
        <MenuContent>
          <MenuViewport>
            <MenuItem value="profile">
              <MenuItemContext>
                {(item) => (
                  <span data-highlighted={item().highlighted ? '' : undefined}>
                    Profile Settings
                  </span>
                )}
              </MenuItemContext>
            </MenuItem>
            <MenuItem value="notifications">
              <MenuItemContext>
                {(item) => (
                  <span data-highlighted={item().highlighted ? '' : undefined}>Notifications</span>
                )}
              </MenuItemContext>
            </MenuItem>
            <MenuItem value="appearance">
              <MenuItemContext>
                {(item) => (
                  <span data-highlighted={item().highlighted ? '' : undefined}>Appearance</span>
                )}
              </MenuItemContext>
            </MenuItem>
            <MenuItem value="security">
              <MenuItemContext>
                {(item) => (
                  <span data-highlighted={item().highlighted ? '' : undefined}>Security</span>
                )}
              </MenuItemContext>
            </MenuItem>
          </MenuViewport>
        </MenuContent>
      </MenuPositioner>
    </Menu>
  );
}