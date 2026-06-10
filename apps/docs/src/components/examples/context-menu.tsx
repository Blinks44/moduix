import {
  ContextMenu,
  ContextMenuArrow,
  ContextMenuBackdrop,
  ContextMenuCheckboxItem,
  ContextMenuCheckboxItemIndicator,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuGroupLabel,
  ContextMenuItem,
  ContextMenuLinkItem,
  ContextMenuItemShortcut,
  ContextMenuItemText,
  ContextMenuItemTextContent,
  ContextMenuItemTextIcon,
  ContextMenuItemTextLabel,
  ContextMenuPopup,
  ContextMenuPortal,
  ContextMenuPositioner,
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
import { useState } from 'react';
import type { CSSPropertiesEditorContext, CssPropertyInput } from '../preview';
import { CSSPropertiesEditor, CSSPropertiesReferenceTable } from '../preview';
import styles from './context-menu.module.css';

export const contextMenuOverrideCssProperties: CssPropertyInput[] = [
  [
    '--context-menu-arrow-inline-offset',
    '0.8125rem',
    'Controls inline arrow offset for side placement.',
  ],
  ['--context-menu-arrow-size', '0.5rem', 'Controls popup arrow size.'],
  [
    '--context-menu-arrow-stroke-color',
    'var(--context-menu-popup-border-color)',
    'Controls popup arrow stroke color.',
  ],
  [
    '--context-menu-backdrop-bg',
    'var(--backdrop-bg, var(--color-overlay))',
    'Controls optional backdrop background.',
  ],
  ['--context-menu-backdrop-blur', '4px', 'Controls optional backdrop blur amount.'],
  [
    '--context-menu-backdrop-transition',
    'var(--context-menu-transition)',
    'Controls optional backdrop transition.',
  ],
  [
    '--context-menu-check-gap',
    '0.5rem',
    'Controls gap between indicator and item text in radio/checkbox items.',
  ],
  ['--context-menu-check-icon-size', '100%', 'Controls icon size inside check indicators.'],
  [
    '--context-menu-check-indicator-bg',
    'transparent',
    'Controls indicator background for radio/checkbox items.',
  ],
  [
    '--context-menu-check-indicator-border-color',
    'transparent',
    'Controls indicator border color for radio/checkbox items.',
  ],
  [
    '--context-menu-check-indicator-border-width',
    'var(--border-width-sm)',
    'Controls indicator border width for radio/checkbox items.',
  ],
  [
    '--context-menu-check-indicator-color',
    'currentColor',
    'Controls indicator icon color for radio/checkbox items.',
  ],
  [
    '--context-menu-check-indicator-padding',
    '0',
    'Controls indicator inner padding for radio/checkbox items.',
  ],
  [
    '--context-menu-check-indicator-radius',
    'var(--radius-xs)',
    'Controls indicator corner radius for radio/checkbox items.',
  ],
  [
    '--context-menu-check-indicator-size',
    '0.75rem',
    'Controls indicator size for radio/checkbox items.',
  ],
  [
    '--context-menu-check-padding-x-start',
    '0.625rem',
    'Controls start padding for radio/checkbox items.',
  ],
  [
    '--context-menu-disabled-opacity',
    'var(--opacity-disabled)',
    'Controls disabled trigger opacity.',
  ],
  ['--context-menu-focus-ring-color', 'var(--color-ring)', 'Controls trigger focus ring color.'],
  [
    '--context-menu-group-label-color',
    'var(--color-muted-foreground)',
    'Controls group label text color.',
  ],
  ['--context-menu-group-label-font-size', 'var(--text-xs)', 'Controls group label font size.'],
  [
    '--context-menu-group-label-line-height',
    'var(--line-height-text-xs)',
    'Controls group label line height.',
  ],
  ['--context-menu-group-label-padding-x-end', '0.75rem', 'Controls group label end padding.'],
  ['--context-menu-group-label-padding-x-start', '0.625rem', 'Controls group label start padding.'],
  ['--context-menu-group-label-padding-y', '0.35rem', 'Controls group label vertical padding.'],
  ['--context-menu-group-padding-y', '0', 'Controls group vertical padding.'],
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
    '--context-menu-highlight-inset-x',
    'var(--spacing-1)',
    'Controls horizontal inset for highlighted/open row background.',
  ],
  ['--context-menu-highlight-radius', 'var(--radius-sm)', 'Controls highlighted/open row radius.'],
  ['--context-menu-item-bg', 'transparent', 'Controls base background of menu rows.'],
  [
    '--context-menu-item-disabled-color',
    'var(--color-muted-foreground)',
    'Controls disabled item text color.',
  ],
  ['--context-menu-item-font-size', 'var(--text-sm)', 'Controls item font size.'],
  ['--context-menu-item-gap', 'var(--spacing-2)', 'Controls gap for regular item content.'],
  ['--context-menu-item-height', '2rem', 'Controls minimum row height.'],
  ['--context-menu-item-line-height', 'var(--line-height-text-sm)', 'Controls item line height.'],
  ['--context-menu-item-padding-x-end', '1rem', 'Controls item end padding.'],
  ['--context-menu-item-padding-x-start', '1rem', 'Controls item start padding.'],
  ['--context-menu-item-padding-y', '0.5rem', 'Controls item vertical padding.'],
  [
    '--context-menu-item-shortcut-color',
    'var(--color-muted-foreground)',
    'Controls shortcut text color.',
  ],
  ['--context-menu-item-shortcut-font-size', 'var(--text-xs)', 'Controls shortcut font size.'],
  [
    '--context-menu-item-shortcut-line-height',
    'var(--line-height-text-xs)',
    'Controls shortcut line height.',
  ],
  [
    '--context-menu-item-shortcut-padding-x-start',
    'var(--spacing-4)',
    'Controls start spacing before shortcut text.',
  ],
  [
    '--context-menu-item-text-content-gap',
    'var(--spacing-2)',
    'Controls gap inside `ContextMenuItemTextContent`.',
  ],
  [
    '--context-menu-item-text-icon-color',
    'currentColor',
    'Controls color of `ContextMenuItemTextIcon`.',
  ],
  ['--context-menu-item-text-icon-size', '1rem', 'Controls size of `ContextMenuItemTextIcon`.'],
  ['--context-menu-popup-bg', 'var(--color-popover)', 'Controls popup background.'],
  ['--context-menu-popup-border-color', 'var(--color-border)', 'Controls popup border color.'],
  ['--context-menu-popup-color', 'var(--color-popover-foreground)', 'Controls popup text color.'],
  ['--context-menu-popup-max-height', '24rem', 'Controls popup maximum height.'],
  ['--context-menu-popup-max-width', '20rem', 'Controls popup maximum width.'],
  ['--context-menu-popup-min-width', '12rem', 'Controls popup minimum width.'],
  ['--context-menu-popup-padding-y', '0.25rem', 'Controls popup vertical padding.'],
  ['--context-menu-popup-radius', 'var(--radius-md)', 'Controls popup corner radius.'],
  ['--context-menu-popup-shadow', 'var(--shadow-lg)', 'Controls popup shadow.'],
  ['--context-menu-separator-color', 'var(--color-border)', 'Controls separator color.'],
  ['--context-menu-separator-margin-x-end', '1rem', 'Controls separator end margin.'],
  ['--context-menu-separator-margin-x-start', '1rem', 'Controls separator start margin.'],
  ['--context-menu-separator-margin-y', '0.375rem', 'Controls separator vertical margin.'],
  ['--context-menu-submenu-icon-size', '0.875rem', 'Controls submenu trigger icon size.'],
  [
    '--context-menu-submenu-open-bg',
    'var(--color-accent)',
    'Controls submenu trigger open background.',
  ],
  [
    '--context-menu-submenu-trigger-gap',
    'var(--spacing-3)',
    'Controls submenu trigger content gap.',
  ],
  ['--context-menu-submenu-trigger-padding-x-end', '1rem', 'Controls submenu trigger end padding.'],
  ['--context-menu-transition', 'var(--transition-default)', 'Controls shared transition timing.'],
];

export const contextMenuPlaygroundCssProperties: CssPropertyInput[] =
  contextMenuOverrideCssProperties;

export function ContextMenuCssPropertiesPanel(_context: CSSPropertiesEditorContext) {
  return (
    <div className="space-y-2">
      <CSSPropertiesReferenceTable
        properties={contextMenuOverrideCssProperties.map(normalizeCssProperty)}
      />
    </div>
  );
}

export function ContextMenuCssPlaygroundPanel({
  values,
  onChange,
  onReset,
}: CSSPropertiesEditorContext) {
  return (
    <div className="space-y-2">
      <CSSPropertiesEditor
        properties={contextMenuPlaygroundCssProperties.map(normalizeCssProperty)}
        values={values}
        onChange={onChange}
        onReset={onReset}
      />
    </div>
  );
}

function normalizeCssProperty(property: CssPropertyInput) {
  if (!('name' in property)) {
    return { name: property[0], defaultValue: property[1], description: property[2] };
  }

  return property;
}

export function ContextMenuExample() {
  return (
    <ContextMenu>
      <ContextMenuTrigger className={styles.trigger}>Right click here</ContextMenuTrigger>
      <ContextMenuContent>
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
      <ContextMenuTrigger className={styles.trigger}>Right click here</ContextMenuTrigger>
      <ContextMenuContent>
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
      <ContextMenuTrigger className={styles.trigger}>Right click here</ContextMenuTrigger>
      <ContextMenuContent>
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
  const [sortBy, setSortBy] = useState('date');
  const [showMinimap, setShowMinimap] = useState(true);
  const [showSearch, setShowSearch] = useState(true);
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <ContextMenu>
      <ContextMenuTrigger className={styles.trigger}>Right click here</ContextMenuTrigger>
      <ContextMenuContent>
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
  const [showMinimap, setShowMinimap] = useState(true);
  const [showSearch, setShowSearch] = useState(true);

  return (
    <ContextMenu>
      <ContextMenuTrigger className={styles.trigger}>Right click here</ContextMenuTrigger>
      <ContextMenuContent>
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
      <ContextMenuTrigger className={styles.trigger}>Right click here</ContextMenuTrigger>
      <ContextMenuContent showArrow align="start" sideOffset={12} collisionPadding={16}>
        <ContextMenuItem closeOnClick>Open</ContextMenuItem>
        <ContextMenuItem closeOnClick>Duplicate</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem closeOnClick>Archive</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}

export function LinkItemsContextMenuExample() {
  return (
    <ContextMenu>
      <ContextMenuTrigger className={styles.trigger}>Right click here</ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuLinkItem href="#projects">Projects</ContextMenuLinkItem>
        <ContextMenuLinkItem href="#teams">Teams</ContextMenuLinkItem>
        <ContextMenuLinkItem href="#billing">Billing</ContextMenuLinkItem>
        <ContextMenuSeparator />
        <ContextMenuItem closeOnClick>Copy Link</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}

export function CustomCompositionContextMenuExample() {
  return (
    <ContextMenu>
      <ContextMenuTrigger className={styles.customTrigger}>Right click card</ContextMenuTrigger>
      <ContextMenuPortal>
        <ContextMenuBackdrop className={styles.customBackdrop} />
        <ContextMenuPositioner sideOffset={12}>
          <ContextMenuPopup className={styles.customPopup}>
            <ContextMenuArrow />
            <ContextMenuItem closeOnClick>Open details</ContextMenuItem>
            <ContextMenuItem closeOnClick>Copy link</ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem closeOnClick disabled>
              Delete
            </ContextMenuItem>
          </ContextMenuPopup>
        </ContextMenuPositioner>
      </ContextMenuPortal>
    </ContextMenu>
  );
}