import { Button } from '@moduix/solid/button';
import {
  Menu,
  MenuTrigger,
  MenuPositioner,
  MenuContent,
  MenuViewport,
  MenuItem,
  MenuSeparator,
  MenuItemGroup,
  MenuItemGroupLabel,
  MenuItemShortcut,
} from '@moduix/solid/menu';

export default function AdvancedCustomizationMenuDemo() {
  return (
    <Menu positioning={{ placement: 'bottom-end', gutter: 12 }}>
      <MenuTrigger asChild={(props) => <Button {...props()} variant="outline" />}>
        Project
      </MenuTrigger>
      <MenuPositioner>
        <MenuContent>
          <MenuViewport>
            <MenuItemGroup>
              <MenuItemGroupLabel>Project</MenuItemGroupLabel>
              <MenuItem asChild={(props) => <a {...props()} href="#overview" />} value="overview">
                Open overview
              </MenuItem>
              <MenuItem value="duplicate">
                <span>Duplicate project</span>
                <MenuItemShortcut>⌘D</MenuItemShortcut>
              </MenuItem>
              <MenuItem value="settings">Project settings</MenuItem>
            </MenuItemGroup>
            <MenuSeparator />
            <MenuItem value="archive" tone="destructive">
              Archive project
            </MenuItem>
          </MenuViewport>
        </MenuContent>
      </MenuPositioner>
    </Menu>
  );
}