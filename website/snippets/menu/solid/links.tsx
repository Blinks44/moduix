import { Button } from '@moduix/solid/button';
import {
  Menu,
  MenuTrigger,
  MenuIndicator,
  MenuPositioner,
  MenuContent,
  MenuViewport,
  MenuItem,
} from '@moduix/solid/menu';

export default function LinkItemsMenuDemo() {
  return (
    <Menu>
      <MenuTrigger asChild={(props) => <Button {...props()} />}>
        Help
        <MenuIndicator />
      </MenuTrigger>
      <MenuPositioner>
        <MenuContent>
          <MenuViewport>
            <MenuItem asChild={(props) => <a {...props()} href="#menu-docs" />} value="docs">
              Documentation
            </MenuItem>
            <MenuItem
              asChild={(props) => <a {...props()} href="https://github.com/Blinks44/moduix" />}
              value="github"
            >
              GitHub
            </MenuItem>
            <MenuItem
              asChild={(props) => <a {...props()} href="#menu-changelog" />}
              value="changelog"
            >
              Changelog
            </MenuItem>
            <MenuItem asChild={(props) => <a {...props()} href="#menu-support" />} value="support">
              Support
            </MenuItem>
          </MenuViewport>
        </MenuContent>
      </MenuPositioner>
    </Menu>
  );
}