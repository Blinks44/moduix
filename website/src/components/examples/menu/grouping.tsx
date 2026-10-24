import { Button } from '@moduix/react/button';
import {
  Menu,
  MenuTrigger,
  MenuIndicator,
  MenuPositioner,
  MenuContent,
  MenuViewport,
  MenuItem,
  MenuSeparator,
  MenuItemGroup,
  MenuItemGroupLabel,
} from '@moduix/react/menu';

export default function GroupingMenuDemo() {
  return (
    <Menu>
      <MenuTrigger asChild>
        <Button>
          Edit
          <MenuIndicator />
        </Button>
      </MenuTrigger>
      <MenuPositioner>
        <MenuContent>
          <MenuViewport>
            <MenuItemGroup>
              <MenuItemGroupLabel>Clipboard</MenuItemGroupLabel>
              <MenuItem value="cut">Cut</MenuItem>
              <MenuItem value="copy">Copy</MenuItem>
              <MenuItem value="paste">Paste</MenuItem>
            </MenuItemGroup>
            <MenuSeparator />
            <MenuItemGroup>
              <MenuItemGroupLabel>Selection</MenuItemGroupLabel>
              <MenuItem value="select-all">Select All</MenuItem>
            </MenuItemGroup>
          </MenuViewport>
        </MenuContent>
      </MenuPositioner>
    </Menu>
  );
}