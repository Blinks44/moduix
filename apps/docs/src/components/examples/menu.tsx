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
import type { CSSPropertiesEditorContext, CssPropertyInput } from '../preview';
import { CSSPropertiesEditor, CSSPropertiesReferenceTable } from '../preview';
import styles from './menu.module.css';

export const menuOverrideCssProperties: CssPropertyInput[] = [
  ['--menu-arrow-height', '0.625rem', 'Controls popup arrow height.'],
  ['--menu-arrow-inline-offset', '0.8125rem', 'Controls popup arrow inline offset.'],
  ['--menu-arrow-size', '0.5rem', 'Controls popup arrow size.'],
  ['--menu-arrow-stroke-color', 'var(--menu-popup-border-color)', 'Controls arrow stroke color.'],
  ['--menu-arrow-width', '1.25rem', 'Controls popup arrow width.'],
  ['--menu-backdrop-bg', 'var(--color-overlay)', 'Controls backdrop background.'],
  ['--menu-backdrop-blur', '2px', 'Controls backdrop blur.'],
  ['--menu-backdrop-transition', 'var(--transition-default)', 'Controls backdrop transition.'],
  ['--menu-check-gap', '0.5rem', 'Controls checkbox/radio indicator gap.'],
  ['--menu-check-indicator-size', '0.75rem', 'Controls checkbox/radio indicator size.'],
  ['--menu-check-padding-x-start', '0.625rem', 'Controls checkbox/radio start padding.'],
  ['--menu-checkbox-indicator-bg', 'transparent', 'Controls checkbox indicator background.'],
  [
    '--menu-checkbox-indicator-bg-checked',
    'var(--menu-checkbox-indicator-bg)',
    'Controls checked checkbox indicator background.',
  ],
  [
    '--menu-checkbox-indicator-border-color',
    'currentColor',
    'Controls checkbox indicator border color.',
  ],
  [
    '--menu-checkbox-indicator-border-color-checked',
    'var(--menu-checkbox-indicator-border-color)',
    'Controls checked checkbox indicator border color.',
  ],
  ['--menu-checkbox-indicator-border-width', '0', 'Controls checkbox indicator border width.'],
  ['--menu-checkbox-indicator-radius', 'var(--radius-xs)', 'Controls checkbox indicator radius.'],
  ['--menu-disabled-opacity', 'var(--opacity-disabled)', 'Controls disabled trigger opacity.'],
  ['--menu-focus-ring-color', 'var(--color-ring)', 'Controls focus ring color.'],
  ['--menu-focus-ring-width', 'var(--menu-trigger-border-width)', 'Controls focus ring width.'],
  ['--menu-group-label-color', 'var(--color-muted-foreground)', 'Controls group label color.'],
  ['--menu-group-label-font-size', 'var(--text-xs)', 'Controls group label font size.'],
  [
    '--menu-group-label-line-height',
    'var(--line-height-text-xs)',
    'Controls group label line height.',
  ],
  ['--menu-group-label-padding-x-end', '0.75rem', 'Controls group label end padding.'],
  ['--menu-group-label-padding-x-start', '0.625rem', 'Controls group label start padding.'],
  ['--menu-group-label-padding-y', '0.35rem', 'Controls group label vertical padding.'],
  ['--menu-group-padding-y', '0', 'Controls group vertical padding.'],
  ['--menu-highlight-bg', 'var(--color-foreground)', 'Controls highlighted item background.'],
  ['--menu-highlight-color', 'var(--color-background)', 'Controls highlighted item color.'],
  ['--menu-highlight-inset-x', 'var(--spacing-1)', 'Controls highlight inline inset.'],
  ['--menu-highlight-radius', 'var(--radius-sm)', 'Controls highlight radius.'],
  ['--menu-item-bg', 'transparent', 'Controls item background.'],
  ['--menu-item-bg-disabled', 'var(--menu-item-bg)', 'Controls disabled item background.'],
  ['--menu-item-disabled-color', 'var(--color-muted-foreground)', 'Controls disabled item color.'],
  ['--menu-item-font-size', 'var(--text-sm)', 'Controls item font size.'],
  ['--menu-item-gap', 'var(--spacing-2)', 'Controls item content gap.'],
  ['--menu-item-height', '2rem', 'Controls item minimum height.'],
  ['--menu-item-line-height', 'var(--line-height-text-sm)', 'Controls item line height.'],
  ['--menu-item-padding-x-end', '1rem', 'Controls item end padding.'],
  ['--menu-item-padding-x-start', '1rem', 'Controls item start padding.'],
  ['--menu-item-padding-y', '0.5rem', 'Controls item vertical padding.'],
  ['--menu-item-shortcut-color', 'var(--color-muted-foreground)', 'Controls shortcut color.'],
  ['--menu-item-shortcut-font-size', 'var(--text-xs)', 'Controls shortcut font size.'],
  [
    '--menu-item-shortcut-line-height',
    'var(--line-height-text-xs)',
    'Controls shortcut line height.',
  ],
  ['--menu-item-shortcut-padding-x-start', 'var(--spacing-4)', 'Controls shortcut start padding.'],
  ['--menu-item-text-content-gap', 'var(--spacing-2)', 'Controls item text content gap.'],
  ['--menu-item-text-icon-color', 'currentColor', 'Controls item text icon color.'],
  ['--menu-item-text-icon-size', '1rem', 'Controls item text icon size.'],
  ['--menu-popup-bg', 'var(--color-popover)', 'Controls popup background.'],
  ['--menu-popup-border-color', 'var(--color-border)', 'Controls popup border color.'],
  ['--menu-popup-border-width', 'var(--border-width-sm)', 'Controls popup border width.'],
  ['--menu-popup-color', 'var(--color-popover-foreground)', 'Controls popup text color.'],
  ['--menu-popup-height', 'auto', 'Controls popup height.'],
  ['--menu-popup-max-height', '24rem', 'Controls popup maximum height.'],
  ['--menu-popup-max-width', '20rem', 'Controls popup maximum width.'],
  ['--menu-popup-min-width', '12rem', 'Controls popup minimum width.'],
  ['--menu-popup-padding-y', '0.25rem', 'Controls popup vertical padding.'],
  ['--menu-popup-radius', 'var(--radius-md)', 'Controls popup radius.'],
  ['--menu-popup-scale', 'var(--scale-popup)', 'Controls popup enter/exit scale.'],
  ['--menu-popup-shadow', 'var(--shadow-lg)', 'Controls popup shadow.'],
  ['--menu-popup-width', 'auto', 'Controls popup width.'],
  ['--menu-separator-color', 'var(--color-border)', 'Controls separator color.'],
  ['--menu-separator-height', 'var(--border-width-sm)', 'Controls separator thickness.'],
  ['--menu-separator-margin-x-end', '1rem', 'Controls separator end margin.'],
  ['--menu-separator-margin-x-start', '1rem', 'Controls separator start margin.'],
  ['--menu-separator-margin-y', '0.375rem', 'Controls separator vertical margin.'],
  ['--menu-submenu-icon-size', '0.875rem', 'Controls submenu icon size.'],
  ['--menu-submenu-open-bg', 'var(--color-accent)', 'Controls open submenu background.'],
  ['--menu-submenu-trigger-gap', 'var(--spacing-3)', 'Controls submenu trigger gap.'],
  ['--menu-submenu-trigger-padding-x-end', '1rem', 'Controls submenu trigger end padding.'],
  ['--menu-transition', 'var(--transition-default)', 'Controls menu transition duration/timing.'],
  ['--menu-trigger-bg', 'var(--color-background)', 'Controls trigger background.'],
  [
    '--menu-trigger-bg-active',
    'var(--menu-trigger-bg-hover)',
    'Controls active trigger background.',
  ],
  ['--menu-trigger-bg-hover', 'var(--color-accent)', 'Controls hover trigger background.'],
  ['--menu-trigger-border-color', 'var(--color-border)', 'Controls trigger border color.'],
  ['--menu-trigger-border-width', 'var(--border-width-sm)', 'Controls trigger border width.'],
  ['--menu-trigger-color', 'var(--color-foreground)', 'Controls trigger color.'],
  ['--menu-trigger-font-size', 'var(--text-md)', 'Controls trigger font size.'],
  ['--menu-trigger-gap', '0.5rem', 'Controls trigger content gap.'],
  ['--menu-trigger-height', 'var(--size-lg)', 'Controls trigger minimum height.'],
  ['--menu-trigger-icon-color', 'currentColor', 'Controls trigger icon color.'],
  ['--menu-trigger-icon-size', '1rem', 'Controls trigger icon size.'],
  ['--menu-trigger-line-height', 'var(--line-height-text-md)', 'Controls trigger line height.'],
  ['--menu-trigger-padding-x', '0.875rem', 'Controls trigger horizontal padding.'],
  ['--menu-trigger-padding-y', '0.5rem', 'Controls trigger vertical padding.'],
  ['--menu-trigger-radius', 'var(--radius-md)', 'Controls trigger radius.'],
];
export const menuPlaygroundCssProperties: CssPropertyInput[] = [
  ['--menu-arrow-stroke-color', 'var(--menu-popup-border-color)', 'Controls arrow stroke color.'],
  [
    '--menu-checkbox-indicator-border-color',
    'currentColor',
    'Controls checkbox indicator border color.',
  ],
  ['--menu-highlight-bg', 'var(--color-foreground)', 'Controls highlight background.'],
  ['--menu-highlight-color', 'var(--color-background)', 'Controls highlight text color.'],
  ['--menu-item-bg', 'transparent', 'Controls item background.'],
  ['--menu-popup-bg', 'var(--color-popover)', 'Controls popup background.'],
  ['--menu-popup-border-color', 'var(--color-border)', 'Controls popup border color.'],
  ['--menu-popup-border-width', 'var(--border-width-sm)', 'Controls popup border width.'],
  ['--menu-popup-color', 'var(--color-popover-foreground)', 'Controls popup text color.'],
  ['--menu-popup-radius', 'var(--radius-md)', 'Controls popup radius.'],
  ['--menu-popup-shadow', 'var(--shadow-lg)', 'Controls popup shadow.'],
  ['--menu-trigger-bg', 'var(--color-background)', 'Controls trigger background.'],
  ['--menu-trigger-bg-hover', 'var(--color-accent)', 'Controls trigger hover background.'],
  ['--menu-trigger-border-width', 'var(--border-width-sm)', 'Controls trigger border width.'],
  ['--menu-trigger-radius', 'var(--radius-md)', 'Controls trigger radius.'],
];

export function MenuCssPropertiesPanel(_context: CSSPropertiesEditorContext) {
  return (
    <CSSPropertiesReferenceTable properties={menuOverrideCssProperties.map(normalizeCssProperty)} />
  );
}

export function MenuCssPlaygroundPanel({ values, onChange, onReset }: CSSPropertiesEditorContext) {
  return (
    <CSSPropertiesEditor
      properties={menuPlaygroundCssProperties.map(normalizeCssProperty)}
      values={values}
      onChange={onChange}
      onReset={onReset}
    />
  );
}

function normalizeCssProperty(property: CssPropertyInput) {
  if (!('name' in property))
    return { name: property[0], defaultValue: property[1], description: property[2] };
  return property;
}

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
      <MenuContent withArrow={false}>
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
    <div className={styles.backdropDemoSurface}>
      <Menu>
        <MenuButtonTrigger className={styles.backdropDemoTrigger}>
          Export
          <MenuTriggerIcon />
        </MenuButtonTrigger>
        <MenuContent side="right" align="start" sideOffset={12} withBackdrop>
          <MenuItem closeOnClick>Export PNG</MenuItem>
          <MenuItem closeOnClick>Export PDF</MenuItem>
          <MenuSeparator />
          <MenuItem closeOnClick>Copy share link</MenuItem>
        </MenuContent>
      </Menu>
    </div>
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
          <MenuItem closeOnClick>Edit</MenuItem>
          <MenuItem closeOnClick>Share</MenuItem>
          <MenuSeparator />
          <MenuItem closeOnClick>Archive</MenuItem>
        </MenuContent>
      </Menu>
    </React.Fragment>
  );
}

export function CustomCompositionMenuExample() {
  return (
    <Menu>
      <MenuButtonTrigger className={styles.customTrigger}>
        Places
        <MenuTriggerIcon className={styles.customTriggerIcon}>
          <ChevronDownIcon />
        </MenuTriggerIcon>
      </MenuButtonTrigger>
      <MenuContent
        className={styles.customPopup}
        classNames={{
          portal: styles.customPortal,
          backdrop: styles.customBackdrop,
          positioner: styles.customPositioner,
          arrow: styles.customArrow,
        }}
        withBackdrop
      >
        <MenuItem closeOnClick className={styles.customItem}>
          <MenuItemTextContent>
            <MenuItemTextIcon>
              <MapIcon />
            </MenuItemTextIcon>
            <MenuItemTextLabel>Open map</MenuItemTextLabel>
          </MenuItemTextContent>
        </MenuItem>
        <MenuSubmenu>
          <MenuSubmenuTrigger className={styles.customItem}>
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
            <MenuItem closeOnClick className={styles.customItem}>
              Nearby
            </MenuItem>
            <MenuItem closeOnClick className={styles.customItem}>
              Routes
            </MenuItem>
          </MenuSubmenuContent>
        </MenuSubmenu>
      </MenuContent>
    </Menu>
  );
}