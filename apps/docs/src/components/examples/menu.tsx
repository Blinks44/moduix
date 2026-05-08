import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  Button,
  ChevronDownIcon,
  InfoIcon,
  MapIcon,
  Menu,
  MenuArrow,
  MenuCheckboxItem,
  MenuCheckboxItemIndicator,
  MenuContent,
  MenuGroup,
  MenuGroupLabel,
  MenuItem,
  MenuItemShortcut,
  MenuItemText,
  MenuItemTextContent,
  MenuItemTextIcon,
  MenuItemTextLabel,
  MenuLinkItem,
  MenuRadioGroup,
  MenuRadioItem,
  MenuRadioItemIndicator,
  MenuSeparator,
  MenuSubmenu,
  MenuSubmenuContent,
  MenuSubmenuTrigger,
  MenuSubmenuTriggerIcon,
  MenuTrigger,
  MenuTriggerIcon,
  createMenuHandle,
} from 'moduix';
import * as React from 'react';
import type { CssPropertyInput } from '../preview';
import styles from './menu.module.css';

export const menuCssProperties: CssPropertyInput[] = [
  ['--menu-trigger-gap', '0.5rem', 'Controls spacing between trigger content and icon.'],
  ['--menu-trigger-height', 'var(--size-lg)', 'Controls trigger minimum height.'],
  ['--menu-trigger-padding-x', '0.875rem', 'Controls trigger horizontal padding.'],
  ['--menu-trigger-padding-y', '0.5rem', 'Controls trigger vertical padding.'],
  ['--menu-trigger-radius', 'var(--radius-md)', 'Controls trigger radius.'],
  ['--menu-trigger-bg', 'var(--color-background)', 'Controls trigger background.'],
  ['--menu-trigger-bg-hover', 'var(--color-accent)', 'Controls trigger hover background.'],
  ['--menu-trigger-border-color', 'var(--color-border)', 'Controls trigger border color.'],
  ['--menu-trigger-icon-size', '1rem', 'Controls trigger icon size.'],
  ['--menu-backdrop-bg', 'var(--color-overlay)', 'Controls backdrop background.'],
  ['--menu-backdrop-blur', '2px', 'Controls backdrop blur.'],
  ['--menu-backdrop-transition', 'var(--transition-default)', 'Controls backdrop transition.'],
  ['--menu-arrow-width', '1.25rem', 'Controls popup arrow width.'],
  ['--menu-arrow-height', '0.625rem', 'Controls popup arrow height.'],
  ['--menu-popup-bg', 'var(--color-popover)', 'Controls popup background.'],
  ['--menu-popup-color', 'var(--color-popover-foreground)', 'Controls popup text color.'],
  ['--menu-popup-border-color', 'var(--color-border)', 'Controls popup border color.'],
  ['--menu-popup-width', 'auto', 'Controls popup width.'],
  ['--menu-popup-height', 'auto', 'Controls popup height.'],
  ['--menu-popup-min-width', '12rem', 'Controls popup minimum width.'],
  ['--menu-popup-max-width', '20rem', 'Controls popup maximum width.'],
  ['--menu-popup-max-height', '24rem', 'Controls popup maximum height.'],
  ['--menu-popup-radius', 'var(--radius-md)', 'Controls popup radius.'],
  ['--menu-popup-shadow', 'var(--shadow-lg)', 'Controls popup shadow.'],
  ['--menu-item-height', '2rem', 'Controls item minimum height.'],
  ['--menu-item-padding-y', '0.5rem', 'Controls item vertical padding.'],
  ['--menu-item-padding-x-start', '1rem', 'Controls item start padding.'],
  ['--menu-item-padding-x-end', '1rem', 'Controls item end padding.'],
  ['--menu-item-gap', 'var(--spacing-2)', 'Controls item content gap.'],
  ['--menu-item-text-icon-size', '1rem', 'Controls item text icon size.'],
  ['--menu-highlight-bg', 'var(--color-foreground)', 'Controls highlighted item background.'],
  ['--menu-highlight-color', 'var(--color-background)', 'Controls highlighted item text color.'],
  ['--menu-check-indicator-size', '0.75rem', 'Controls checkbox and radio indicator size.'],
  ['--menu-submenu-open-bg', 'var(--color-accent)', 'Controls open submenu item background.'],
  ['--menu-submenu-icon-size', '0.875rem', 'Controls submenu trigger icon size.'],
  ['--menu-item-shortcut-color', 'var(--color-muted-foreground)', 'Controls shortcut text color.'],
  ['--menu-separator-color', 'var(--color-border)', 'Controls separator color.'],
];

function MenuButtonTrigger(props: React.ComponentProps<typeof MenuTrigger>) {
  return <MenuTrigger render={<Button />} {...props} />;
}

export function MenuExample() {
  return (
    <Menu>
      <MenuButtonTrigger>
        Song
        <MenuTriggerIcon />
      </MenuButtonTrigger>
      <MenuContent>
        <MenuArrow />
        <MenuItem closeOnClick>Add to Library</MenuItem>
        <MenuItem closeOnClick>Add to Playlist</MenuItem>
        <MenuSeparator />
        <MenuItem closeOnClick>Play Next</MenuItem>
        <MenuItem closeOnClick>Play Last</MenuItem>
        <MenuSeparator />
        <MenuItem closeOnClick disabled>
          Share
        </MenuItem>
      </MenuContent>
    </Menu>
  );
}

export function WithoutArrowMenuExample() {
  return (
    <Menu>
      <MenuButtonTrigger>
        Song
        <MenuTriggerIcon />
      </MenuButtonTrigger>
      <MenuContent>
        <MenuItem closeOnClick>Add to Library</MenuItem>
        <MenuItem closeOnClick>Add to Playlist</MenuItem>
        <MenuSeparator />
        <MenuItem closeOnClick>Play Next</MenuItem>
      </MenuContent>
    </Menu>
  );
}

export function GroupsAndControlsMenuExample() {
  const [sortBy, setSortBy] = React.useState('date');
  const [showMinimap, setShowMinimap] = React.useState(true);
  const [showSearch, setShowSearch] = React.useState(true);
  const [showSidebar, setShowSidebar] = React.useState(false);

  return (
    <Menu>
      <MenuButtonTrigger>
        View
        <MenuTriggerIcon />
      </MenuButtonTrigger>
      <MenuContent>
        <MenuArrow />
        <MenuGroup>
          <MenuGroupLabel>Sort</MenuGroupLabel>
          <MenuRadioGroup value={sortBy} onValueChange={setSortBy}>
            <MenuRadioItem value="date">
              <MenuRadioItemIndicator />
              <MenuItemText>Date</MenuItemText>
            </MenuRadioItem>
            <MenuRadioItem value="name">
              <MenuRadioItemIndicator />
              <MenuItemText>Name</MenuItemText>
            </MenuRadioItem>
            <MenuRadioItem value="type">
              <MenuRadioItemIndicator />
              <MenuItemText>Type</MenuItemText>
            </MenuRadioItem>
          </MenuRadioGroup>
        </MenuGroup>
        <MenuSeparator />
        <MenuGroup>
          <MenuGroupLabel>Workspace</MenuGroupLabel>
          <MenuCheckboxItem checked={showMinimap} onCheckedChange={setShowMinimap}>
            <MenuCheckboxItemIndicator />
            <MenuItemText>Minimap</MenuItemText>
          </MenuCheckboxItem>
          <MenuCheckboxItem checked={showSearch} onCheckedChange={setShowSearch}>
            <MenuCheckboxItemIndicator />
            <MenuItemText>Search</MenuItemText>
          </MenuCheckboxItem>
          <MenuCheckboxItem checked={showSidebar} onCheckedChange={setShowSidebar}>
            <MenuCheckboxItemIndicator />
            <MenuItemText>Sidebar</MenuItemText>
          </MenuCheckboxItem>
        </MenuGroup>
      </MenuContent>
    </Menu>
  );
}

export function ShortcutsMenuExample() {
  return (
    <Menu>
      <MenuButtonTrigger>
        Edit
        <MenuTriggerIcon />
      </MenuButtonTrigger>
      <MenuContent>
        <MenuArrow />
        <MenuItem closeOnClick>
          Copy
          <MenuItemShortcut>Ctrl+C</MenuItemShortcut>
        </MenuItem>
        <MenuItem closeOnClick>
          Paste
          <MenuItemShortcut>Ctrl+V</MenuItemShortcut>
        </MenuItem>
        <MenuSeparator />
        <MenuItem closeOnClick>
          Rename
          <MenuItemShortcut>F2</MenuItemShortcut>
        </MenuItem>
      </MenuContent>
    </Menu>
  );
}

export function IndicatorRightMenuExample() {
  const [showMinimap, setShowMinimap] = React.useState(true);
  const [showSearch, setShowSearch] = React.useState(true);

  return (
    <Menu>
      <MenuButtonTrigger>
        View
        <MenuTriggerIcon />
      </MenuButtonTrigger>
      <MenuContent>
        <MenuArrow />
        <MenuCheckboxItem checked={showMinimap} onCheckedChange={setShowMinimap} indicator="end">
          <MenuItemText>
            <MenuItemTextContent>
              <MenuItemTextIcon>
                <InfoIcon />
              </MenuItemTextIcon>
              <MenuItemTextLabel>Minimap</MenuItemTextLabel>
            </MenuItemTextContent>
          </MenuItemText>
          <MenuCheckboxItemIndicator />
        </MenuCheckboxItem>
        <MenuCheckboxItem checked={showSearch} onCheckedChange={setShowSearch} indicator="end">
          <MenuItemText>
            <MenuItemTextContent>
              <MenuItemTextIcon>
                <MapIcon />
              </MenuItemTextIcon>
              <MenuItemTextLabel>Search</MenuItemTextLabel>
            </MenuItemTextContent>
          </MenuItemText>
          <MenuCheckboxItemIndicator />
        </MenuCheckboxItem>
      </MenuContent>
    </Menu>
  );
}

export function NestedMenuExample() {
  return (
    <Menu>
      <MenuButtonTrigger>
        Song
        <MenuTriggerIcon />
      </MenuButtonTrigger>
      <MenuContent>
        <MenuArrow />
        <MenuItem closeOnClick>Add to Library</MenuItem>
        <MenuSubmenu>
          <MenuSubmenuTrigger>
            Add to Playlist
            <MenuSubmenuTriggerIcon />
          </MenuSubmenuTrigger>
          <MenuSubmenuContent>
            <MenuItem closeOnClick>Get Up!</MenuItem>
            <MenuItem closeOnClick>Inside Out</MenuItem>
            <MenuItem closeOnClick>Night Beats</MenuItem>
            <MenuSeparator />
            <MenuItem closeOnClick>New Playlist...</MenuItem>
          </MenuSubmenuContent>
        </MenuSubmenu>
        <MenuSeparator />
        <MenuItem closeOnClick>Favorite</MenuItem>
        <MenuItem closeOnClick>Share</MenuItem>
      </MenuContent>
    </Menu>
  );
}

export function OpenOnHoverMenuExample() {
  return (
    <Menu>
      <MenuButtonTrigger openOnHover delay={120}>
        Add to playlist
        <MenuTriggerIcon />
      </MenuButtonTrigger>
      <MenuContent>
        <MenuArrow />
        <MenuItem closeOnClick>Get Up!</MenuItem>
        <MenuItem closeOnClick>Inside Out</MenuItem>
        <MenuItem closeOnClick>Night Beats</MenuItem>
        <MenuSeparator />
        <MenuItem closeOnClick>New Playlist...</MenuItem>
      </MenuContent>
    </Menu>
  );
}

export function PositionedWithBackdropMenuExample() {
  return (
    <Menu>
      <MenuButtonTrigger>
        Export
        <MenuTriggerIcon />
      </MenuButtonTrigger>
      <MenuContent side="right" align="start" sideOffset={12} withBackdrop>
        <MenuArrow />
        <MenuItem closeOnClick>Export PNG</MenuItem>
        <MenuItem closeOnClick>Export PDF</MenuItem>
        <MenuSeparator />
        <MenuItem closeOnClick>Copy share link</MenuItem>
      </MenuContent>
    </Menu>
  );
}

export function OpenAlertDialogMenuExample() {
  const [dialogOpen, setDialogOpen] = React.useState(false);

  return (
    <React.Fragment>
      <Menu>
        <MenuButtonTrigger>
          Project
          <MenuTriggerIcon />
        </MenuButtonTrigger>
        <MenuContent>
          <MenuArrow />
          <MenuItem closeOnClick>Rename</MenuItem>
          <MenuItem closeOnClick>Duplicate</MenuItem>
          <MenuSeparator />
          <MenuItem
            closeOnClick
            onClick={() => {
              setDialogOpen(true);
            }}
          >
            Delete...
          </MenuItem>
        </MenuContent>
      </Menu>

      <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete project?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone and will permanently remove all environments.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </React.Fragment>
  );
}

export function LinkItemsMenuExample() {
  return (
    <Menu>
      <MenuButtonTrigger>
        Navigate
        <MenuTriggerIcon />
      </MenuButtonTrigger>
      <MenuContent>
        <MenuArrow />
        <MenuLinkItem href="#projects">Projects</MenuLinkItem>
        <MenuLinkItem href="#teams">Teams</MenuLinkItem>
        <MenuLinkItem href="#billing">Billing</MenuLinkItem>
        <MenuSeparator />
        <MenuItem closeOnClick>Copy Link</MenuItem>
      </MenuContent>
    </Menu>
  );
}

export function DetachedTriggerMenuExample() {
  const menuHandle = React.useMemo(() => createMenuHandle(), []);

  return (
    <React.Fragment>
      <div className={styles.detachedTrigger}>
        <MenuButtonTrigger handle={menuHandle}>
          Actions
          <MenuTriggerIcon />
        </MenuButtonTrigger>
      </div>

      <Menu handle={menuHandle}>
        <MenuContent>
          <MenuArrow />
          <MenuItem closeOnClick>Edit</MenuItem>
          <MenuItem closeOnClick>Share</MenuItem>
          <MenuSeparator />
          <MenuItem closeOnClick>Archive</MenuItem>
        </MenuContent>
      </Menu>
    </React.Fragment>
  );
}

export function CustomIconsMenuExample() {
  return (
    <Menu>
      <MenuButtonTrigger>
        Places
        <MenuTriggerIcon className={styles.customTriggerIcon}>
          <ChevronDownIcon />
        </MenuTriggerIcon>
      </MenuButtonTrigger>
      <MenuContent>
        <MenuArrow />
        <MenuItem closeOnClick>
          <MenuItemTextContent>
            <MenuItemTextIcon>
              <MapIcon />
            </MenuItemTextIcon>
            <MenuItemTextLabel>Open map</MenuItemTextLabel>
          </MenuItemTextContent>
        </MenuItem>
        <MenuSubmenu>
          <MenuSubmenuTrigger>
            <MenuItemTextContent>
              <MenuItemTextIcon>
                <InfoIcon />
              </MenuItemTextIcon>
              <MenuItemTextLabel>More</MenuItemTextLabel>
            </MenuItemTextContent>
            <MenuSubmenuTriggerIcon>
              <ChevronDownIcon />
            </MenuSubmenuTriggerIcon>
          </MenuSubmenuTrigger>
          <MenuSubmenuContent>
            <MenuItem closeOnClick>Nearby</MenuItem>
            <MenuItem closeOnClick>Routes</MenuItem>
          </MenuSubmenuContent>
        </MenuSubmenu>
      </MenuContent>
    </Menu>
  );
}