import { Button } from '@moduix/react/button';
import {
  Menu,
  MenuTrigger,
  MenuIndicator,
  MenuPositioner,
  MenuContent,
  MenuViewport,
  MenuItem,
} from '@moduix/react/menu';

export default function LinkItemsMenuDemo() {
  return (
    <Menu>
      <MenuTrigger asChild>
        <Button>
          Help
          <MenuIndicator />
        </Button>
      </MenuTrigger>
      <MenuPositioner>
        <MenuContent>
          <MenuViewport>
            <MenuItem value="docs" asChild>
              <a href="#menu-docs">Documentation</a>
            </MenuItem>
            <MenuItem value="github" asChild>
              <a href="https://github.com/Blinks44/moduix">GitHub</a>
            </MenuItem>
            <MenuItem value="changelog" asChild>
              <a href="#menu-changelog">Changelog</a>
            </MenuItem>
            <MenuItem value="support" asChild>
              <a href="#menu-support">Support</a>
            </MenuItem>
          </MenuViewport>
        </MenuContent>
      </MenuPositioner>
    </Menu>
  );
}