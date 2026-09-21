import { Button } from '@moduix/react/button';
import { Menu, MenuTrigger, MenuPositioner, MenuContent, MenuViewport, MenuItem, MenuSeparator, MenuItemGroup, MenuItemGroupLabel, MenuItemShortcut } from '@moduix/react/menu';

export default function AdvancedCustomizationMenuDemo() {
  return (
    <Menu positioning={{ placement: 'bottom-end', gutter: 12 }}>
      <MenuTrigger asChild>
        <Button variant="outline">Project</Button>
      </MenuTrigger>
      <MenuPositioner>
        <MenuContent>
          <MenuViewport>
            <MenuItemGroup>
              <MenuItemGroupLabel>Project</MenuItemGroupLabel>
              <MenuItem asChild value="overview">
                <a href="#overview">Open overview</a>
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
