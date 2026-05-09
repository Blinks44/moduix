import {
  ContextMenu,
  ContextMenuArrow,
  ContextMenuCheckboxItem,
  ContextMenuCheckboxItemIndicator,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuGroupLabel,
  ContextMenuItem,
  ContextMenuItemShortcut,
  ContextMenuItemText,
  ContextMenuItemTextContent,
  ContextMenuItemTextIcon,
  ContextMenuItemTextLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuRadioItemIndicator,
  ContextMenuSeparator,
  ContextMenuSubmenu,
  ContextMenuSubmenuContent,
  ContextMenuSubmenuTrigger,
  ContextMenuSubmenuTriggerIcon,
  ContextMenuTrigger,
  InfoIcon,
  ShareIcon,
} from 'moduix';
import * as React from 'react';
import type { CssPropertyInput } from '../preview';
import styles from './context-menu.module.css';

export const contextMenuCssProperties: CssPropertyInput[] = [
  ['--context-menu-trigger-min-width', '15rem', 'Controls trigger minimum width.'],
  ['--context-menu-trigger-min-height', '12rem', 'Controls trigger minimum height.'],
  ['--context-menu-trigger-radius', 'var(--radius-md)', 'Controls trigger radius.'],
  ['--context-menu-trigger-bg', 'var(--color-background)', 'Controls trigger background.'],
  ['--context-menu-trigger-bg-hover', 'var(--color-accent)', 'Controls trigger hover background.'],
  ['--context-menu-trigger-border-color', 'var(--color-border)', 'Controls trigger border color.'],
  ['--context-menu-popup-bg', 'var(--color-popover)', 'Controls popup background.'],
  ['--context-menu-popup-color', 'var(--color-popover-foreground)', 'Controls popup text color.'],
  ['--context-menu-popup-border-color', 'var(--color-border)', 'Controls popup border color.'],
  ['--context-menu-popup-min-width', '12rem', 'Controls popup minimum width.'],
  ['--context-menu-popup-max-width', '20rem', 'Controls popup maximum width.'],
  ['--context-menu-popup-max-height', '24rem', 'Controls popup maximum height.'],
  ['--context-menu-popup-padding-y', '0.25rem', 'Controls popup vertical padding.'],
  ['--context-menu-popup-radius', 'var(--radius-md)', 'Controls popup radius.'],
  ['--context-menu-popup-shadow', 'var(--shadow-lg)', 'Controls popup shadow.'],
  ['--context-menu-arrow-size', '0.5rem', 'Controls popup arrow size.'],
  [
    '--context-menu-arrow-stroke-color',
    'var(--context-menu-popup-border-color)',
    'Controls popup arrow border color.',
  ],
  ['--context-menu-backdrop-bg', 'transparent', 'Controls optional backdrop background.'],
  ['--context-menu-backdrop-blur', '0', 'Controls optional backdrop blur.'],
  [
    '--context-menu-backdrop-transition',
    'var(--context-menu-transition)',
    'Controls optional backdrop transition.',
  ],
  ['--context-menu-item-height', '2rem', 'Controls item minimum height.'],
  ['--context-menu-item-padding-y', '0.5rem', 'Controls item vertical padding.'],
  ['--context-menu-item-padding-x-start', '1rem', 'Controls item start padding.'],
  ['--context-menu-item-padding-x-end', '1rem', 'Controls item end padding.'],
  ['--context-menu-item-gap', 'var(--spacing-2)', 'Controls item content gap.'],
  ['--context-menu-item-font-size', 'var(--text-sm)', 'Controls item font size.'],
  [
    '--context-menu-highlight-bg',
    'var(--color-foreground)',
    'Controls highlighted item background.',
  ],
  [
    '--context-menu-highlight-color',
    'var(--color-background)',
    'Controls highlighted item text color.',
  ],
  [
    '--context-menu-item-disabled-color',
    'var(--color-muted-foreground)',
    'Controls disabled item text color.',
  ],
  ['--context-menu-check-indicator-size', '0.75rem', 'Controls checkbox and radio indicator size.'],
  ['--context-menu-check-gap', '0.5rem', 'Controls checkbox and radio item gap.'],
  ['--context-menu-submenu-icon-size', '0.875rem', 'Controls submenu trigger icon size.'],
  [
    '--context-menu-submenu-open-bg',
    'var(--color-accent)',
    'Controls submenu trigger open background.',
  ],
  [
    '--context-menu-item-shortcut-color',
    'var(--color-muted-foreground)',
    'Controls shortcut text color.',
  ],
  [
    '--context-menu-item-shortcut-padding-x-start',
    'var(--spacing-4)',
    'Controls spacing before shortcut text.',
  ],
  ['--context-menu-separator-color', 'var(--color-border)', 'Controls separator color.'],
  ['--context-menu-focus-ring-color', 'var(--color-ring)', 'Controls trigger focus ring color.'],
];

export function ContextMenuExample() {
  return (
    <ContextMenu>
      <ContextMenuTrigger>Right click here</ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuArrow />
        <ContextMenuItem closeOnClick>Add to Library</ContextMenuItem>
        <ContextMenuItem closeOnClick>Add to Playlist</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem closeOnClick>Play Next</ContextMenuItem>
        <ContextMenuItem closeOnClick>Play Last</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem closeOnClick disabled>
          Share
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}

export function NestedContextMenuExample() {
  return (
    <ContextMenu>
      <ContextMenuTrigger>Right click here</ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuArrow />
        <ContextMenuItem closeOnClick>Add to Library</ContextMenuItem>
        <ContextMenuSubmenu>
          <ContextMenuSubmenuTrigger>
            Add to Playlist
            <ContextMenuSubmenuTriggerIcon />
          </ContextMenuSubmenuTrigger>
          <ContextMenuSubmenuContent>
            <ContextMenuItem closeOnClick>Get Up!</ContextMenuItem>
            <ContextMenuItem closeOnClick>Inside Out</ContextMenuItem>
            <ContextMenuItem closeOnClick>Night Beats</ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem closeOnClick>New Playlist...</ContextMenuItem>
          </ContextMenuSubmenuContent>
        </ContextMenuSubmenu>
        <ContextMenuSeparator />
        <ContextMenuItem closeOnClick>Favorite</ContextMenuItem>
        <ContextMenuItem closeOnClick>Share</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}

export function ShortcutsContextMenuExample() {
  return (
    <ContextMenu>
      <ContextMenuTrigger>Right click here</ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuArrow />
        <ContextMenuItem closeOnClick>
          Copy
          <ContextMenuItemShortcut>Ctrl+C</ContextMenuItemShortcut>
        </ContextMenuItem>
        <ContextMenuItem closeOnClick>
          Paste
          <ContextMenuItemShortcut>Ctrl+V</ContextMenuItemShortcut>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem closeOnClick>
          Rename
          <ContextMenuItemShortcut>F2</ContextMenuItemShortcut>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}

export function GroupsAndControlsContextMenuExample() {
  const [sortBy, setSortBy] = React.useState('date');
  const [showMinimap, setShowMinimap] = React.useState(true);
  const [showSearch, setShowSearch] = React.useState(true);
  const [showSidebar, setShowSidebar] = React.useState(false);

  return (
    <ContextMenu>
      <ContextMenuTrigger>Right click here</ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuArrow />
        <ContextMenuGroup>
          <ContextMenuGroupLabel>Sort</ContextMenuGroupLabel>
          <ContextMenuRadioGroup value={sortBy} onValueChange={setSortBy}>
            <ContextMenuRadioItem value="date">
              <ContextMenuRadioItemIndicator />
              <ContextMenuItemText>Date</ContextMenuItemText>
            </ContextMenuRadioItem>
            <ContextMenuRadioItem value="name">
              <ContextMenuRadioItemIndicator />
              <ContextMenuItemText>Name</ContextMenuItemText>
            </ContextMenuRadioItem>
            <ContextMenuRadioItem value="type">
              <ContextMenuRadioItemIndicator />
              <ContextMenuItemText>Type</ContextMenuItemText>
            </ContextMenuRadioItem>
          </ContextMenuRadioGroup>
        </ContextMenuGroup>
        <ContextMenuSeparator />
        <ContextMenuGroup>
          <ContextMenuGroupLabel>Workspace</ContextMenuGroupLabel>
          <ContextMenuCheckboxItem checked={showMinimap} onCheckedChange={setShowMinimap}>
            <ContextMenuCheckboxItemIndicator />
            <ContextMenuItemText>Minimap</ContextMenuItemText>
          </ContextMenuCheckboxItem>
          <ContextMenuCheckboxItem checked={showSearch} onCheckedChange={setShowSearch}>
            <ContextMenuCheckboxItemIndicator />
            <ContextMenuItemText>Search</ContextMenuItemText>
          </ContextMenuCheckboxItem>
          <ContextMenuCheckboxItem checked={showSidebar} onCheckedChange={setShowSidebar}>
            <ContextMenuCheckboxItemIndicator />
            <ContextMenuItemText>Sidebar</ContextMenuItemText>
          </ContextMenuCheckboxItem>
        </ContextMenuGroup>
      </ContextMenuContent>
    </ContextMenu>
  );
}

export function IndicatorRightContextMenuExample() {
  const [showMinimap, setShowMinimap] = React.useState(true);
  const [showSearch, setShowSearch] = React.useState(true);

  return (
    <ContextMenu>
      <ContextMenuTrigger>Right click here</ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuArrow />
        <ContextMenuCheckboxItem
          checked={showMinimap}
          onCheckedChange={setShowMinimap}
          indicator="end"
        >
          <ContextMenuItemText>
            <ContextMenuItemTextContent>
              <ContextMenuItemTextIcon>
                <InfoIcon />
              </ContextMenuItemTextIcon>
              <ContextMenuItemTextLabel>Minimap</ContextMenuItemTextLabel>
            </ContextMenuItemTextContent>
          </ContextMenuItemText>
          <ContextMenuCheckboxItemIndicator />
        </ContextMenuCheckboxItem>
        <ContextMenuCheckboxItem
          checked={showSearch}
          onCheckedChange={setShowSearch}
          indicator="end"
        >
          <ContextMenuItemText>
            <ContextMenuItemTextContent>
              <ContextMenuItemTextIcon>
                <ShareIcon />
              </ContextMenuItemTextIcon>
              <ContextMenuItemTextLabel>Search</ContextMenuItemTextLabel>
            </ContextMenuItemTextContent>
          </ContextMenuItemText>
          <ContextMenuCheckboxItemIndicator />
        </ContextMenuCheckboxItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}

export function PositionedContextMenuExample() {
  return (
    <ContextMenu>
      <ContextMenuTrigger>Right click here</ContextMenuTrigger>
      <ContextMenuContent align="start" sideOffset={12} collisionPadding={16}>
        <ContextMenuArrow />
        <ContextMenuItem closeOnClick>Open</ContextMenuItem>
        <ContextMenuItem closeOnClick>Duplicate</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem closeOnClick>Archive</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}

export function CustomStylesContextMenuExample() {
  return (
    <ContextMenu>
      <ContextMenuTrigger className={styles.customTrigger}>Right click card</ContextMenuTrigger>
      <ContextMenuContent
        className={styles.customPopup}
        classNames={{
          portal: styles.customPortal,
          backdrop: styles.customBackdrop,
          positioner: styles.customPositioner,
        }}
        withBackdrop
      >
        <ContextMenuItem closeOnClick>Open details</ContextMenuItem>
        <ContextMenuItem closeOnClick>Copy link</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem closeOnClick disabled>
          Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}