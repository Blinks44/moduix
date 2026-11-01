import { Button } from '@moduix/react/button';
import {
  Menu,
  MenuArrow,
  MenuCheckboxItem,
  MenuContent,
  MenuIndicator,
  MenuItem,
  MenuItemGroup,
  MenuItemGroupLabel,
  MenuItemIndicator,
  MenuItemShortcut,
  MenuItemText,
  MenuPositioner,
  MenuRadioItem,
  MenuRadioItemGroup,
  MenuSeparator,
  MenuTrigger,
  MenuTriggerItem,
  MenuViewport,
} from '@moduix/react/menu';

// Anatomy scene: the menu stays open and inline so every part can be outlined.
export default function MenuAnatomy() {
  return (
    <div
      style={{
        minHeight: 316,
        width: '100%',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
      }}
    >
      <Menu open portalled={false}>
        <MenuTrigger asChild>
          <Button variant="outline">
            File
            <MenuIndicator />
          </Button>
        </MenuTrigger>
        <MenuPositioner>
          <MenuContent>
            <MenuArrow />
            <MenuViewport>
              <MenuItemGroup>
                <MenuItemGroupLabel>File</MenuItemGroupLabel>
                <MenuItem value="new">
                  <MenuItemText>New file</MenuItemText>
                  <MenuItemShortcut>⌘N</MenuItemShortcut>
                </MenuItem>
                <MenuCheckboxItem value="autosave" checked>
                  <MenuItemIndicator />
                  <MenuItemText>Autosave</MenuItemText>
                </MenuCheckboxItem>
              </MenuItemGroup>
              <MenuSeparator />
              <MenuRadioItemGroup value="list">
                <MenuItemGroupLabel>View</MenuItemGroupLabel>
                <MenuRadioItem value="list">
                  <MenuItemIndicator />
                  <MenuItemText>List</MenuItemText>
                </MenuRadioItem>
                <MenuRadioItem value="grid">
                  <MenuItemIndicator />
                  <MenuItemText>Grid</MenuItemText>
                </MenuRadioItem>
              </MenuRadioItemGroup>
              <MenuSeparator />
              <Menu>
                <MenuTriggerItem>Share</MenuTriggerItem>
              </Menu>
            </MenuViewport>
          </MenuContent>
        </MenuPositioner>
      </Menu>
    </div>
  );
}