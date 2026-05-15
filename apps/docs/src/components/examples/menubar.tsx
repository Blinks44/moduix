import {
  ChevronDownIcon,
  InfoIcon,
  MapIcon,
  Menubar,
  MenubarArrow,
  MenubarCheckboxItem,
  MenubarCheckboxItemIndicator,
  MenubarContent,
  MenubarGroup,
  MenubarGroupLabel,
  MenubarItem,
  MenubarLinkItem,
  MenubarItemShortcut,
  MenubarItemText,
  MenubarItemTextContent,
  MenubarItemTextIcon,
  MenubarItemTextLabel,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarRadioItemIndicator,
  MenubarSeparator,
  MenubarSubmenu,
  MenubarSubmenuContent,
  MenubarSubmenuTrigger,
  MenubarSubmenuTriggerIcon,
  MenubarTrigger,
} from 'moduix';
import * as React from 'react';
import type { CssPropertyInput } from '../preview';
import styles from './menubar.module.css';

export const menubarCssProperties: CssPropertyInput[] = [
  ['--menubar-bg', 'var(--color-muted)', 'Controls menubar background.'],
  ['--menubar-border-color', 'var(--color-border)', 'Controls menubar border color.'],
  ['--menubar-radius', 'var(--radius-md)', 'Controls menubar radius.'],
  ['--menubar-gap', 'var(--spacing-1)', 'Controls spacing between triggers.'],
  ['--menubar-trigger-height', 'var(--size-lg)', 'Controls trigger minimum height.'],
  ['--menubar-trigger-padding-x', '0.75rem', 'Controls trigger horizontal padding.'],
  ['--menubar-trigger-padding-y', '0.5rem', 'Controls trigger vertical padding.'],
  ['--menubar-trigger-bg-hover', 'var(--color-accent)', 'Controls trigger hover background.'],
  ['--menubar-trigger-bg-active', 'var(--color-accent)', 'Controls open trigger background.'],
  ['--menubar-popup-bg', 'var(--color-popover)', 'Controls popup background.'],
  ['--menubar-popup-color', 'var(--color-popover-foreground)', 'Controls popup text color.'],
  ['--menubar-popup-border-color', 'var(--color-border)', 'Controls popup border color.'],
  ['--menubar-popup-min-width', '12rem', 'Controls popup minimum width.'],
  ['--menubar-popup-max-width', '20rem', 'Controls popup maximum width.'],
  ['--menubar-popup-max-height', '24rem', 'Controls popup maximum height.'],
  ['--menubar-popup-padding-y', '0.25rem', 'Controls popup vertical padding.'],
  ['--menubar-popup-radius', 'var(--radius-md)', 'Controls popup radius.'],
  ['--menubar-popup-shadow', 'var(--shadow-lg)', 'Controls popup shadow.'],
  ['--menubar-item-height', '2rem', 'Controls item minimum height.'],
  ['--menubar-item-padding-y', '0.5rem', 'Controls item vertical padding.'],
  ['--menubar-item-padding-x-start', '1rem', 'Controls item start padding.'],
  ['--menubar-item-padding-x-end', '1rem', 'Controls item end padding.'],
  ['--menubar-item-gap', 'var(--spacing-2)', 'Controls item content gap.'],
  ['--menubar-highlight-bg', 'var(--color-foreground)', 'Controls highlighted item background.'],
  ['--menubar-highlight-color', 'var(--color-background)', 'Controls highlighted item text color.'],
  ['--menubar-check-indicator-size', '0.75rem', 'Controls checkbox and radio indicator size.'],
  ['--menubar-submenu-icon-size', '0.875rem', 'Controls submenu trigger icon size.'],
  [
    '--menubar-item-shortcut-color',
    'var(--color-muted-foreground)',
    'Controls shortcut text color.',
  ],
  ['--menubar-separator-color', 'var(--color-border)', 'Controls separator color.'],
  ['--menubar-vertical-width', '12rem', 'Controls vertical menubar width.'],
  ['--menubar-backdrop-bg', 'var(--color-overlay)', 'Controls optional backdrop background.'],
  ['--menubar-backdrop-blur', '2px', 'Controls optional backdrop blur.'],
  [
    '--menubar-backdrop-transition',
    'var(--transition-default)',
    'Controls optional backdrop transition.',
  ],
];

export function MenubarExample() {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarArrow />
          <MenubarItem closeOnClick>New File</MenubarItem>
          <MenubarItem closeOnClick>Open...</MenubarItem>
          <MenubarItem closeOnClick>Save</MenubarItem>
          <MenubarSubmenu>
            <MenubarSubmenuTrigger>
              Export
              <MenubarSubmenuTriggerIcon />
            </MenubarSubmenuTrigger>
            <MenubarSubmenuContent>
              <MenubarItem closeOnClick>PDF</MenubarItem>
              <MenubarItem closeOnClick>PNG</MenubarItem>
              <MenubarItem closeOnClick>SVG</MenubarItem>
            </MenubarSubmenuContent>
          </MenubarSubmenu>
          <MenubarSeparator />
          <MenubarItem closeOnClick>Print</MenubarItem>
        </MenubarContent>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger>Edit</MenubarTrigger>
        <MenubarContent>
          <MenubarArrow />
          <MenubarItem closeOnClick>Cut</MenubarItem>
          <MenubarItem closeOnClick>Copy</MenubarItem>
          <MenubarItem closeOnClick>Paste</MenubarItem>
        </MenubarContent>
      </MenubarMenu>

      <MenubarMenu disabled>
        <MenubarTrigger>Help</MenubarTrigger>
      </MenubarMenu>
    </Menubar>
  );
}

export function GroupsAndControlsMenubarExample() {
  const [sortBy, setSortBy] = React.useState('name');
  const [showSidebar, setShowSidebar] = React.useState(true);
  const [showPanel, setShowPanel] = React.useState(false);

  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>View</MenubarTrigger>
        <MenubarContent>
          <MenubarArrow />
          <MenubarGroup>
            <MenubarGroupLabel>Sort</MenubarGroupLabel>
            <MenubarRadioGroup value={sortBy} onValueChange={setSortBy}>
              <MenubarRadioItem value="name">
                <MenubarRadioItemIndicator />
                <MenubarItemText>Name</MenubarItemText>
              </MenubarRadioItem>
              <MenubarRadioItem value="date">
                <MenubarRadioItemIndicator />
                <MenubarItemText>Date Modified</MenubarItemText>
              </MenubarRadioItem>
              <MenubarRadioItem value="type">
                <MenubarRadioItemIndicator />
                <MenubarItemText>Type</MenubarItemText>
              </MenubarRadioItem>
            </MenubarRadioGroup>
          </MenubarGroup>

          <MenubarSeparator />

          <MenubarGroup>
            <MenubarGroupLabel>Panels</MenubarGroupLabel>
            <MenubarCheckboxItem checked={showSidebar} onCheckedChange={setShowSidebar}>
              <MenubarCheckboxItemIndicator />
              <MenubarItemText>Sidebar</MenubarItemText>
            </MenubarCheckboxItem>
            <MenubarCheckboxItem checked={showPanel} onCheckedChange={setShowPanel}>
              <MenubarCheckboxItemIndicator />
              <MenubarItemText>Preview</MenubarItemText>
            </MenubarCheckboxItem>
          </MenubarGroup>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}

export function ShortcutsMenubarExample() {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>Edit</MenubarTrigger>
        <MenubarContent>
          <MenubarArrow />
          <MenubarItem closeOnClick>
            Undo
            <MenubarItemShortcut>Ctrl+Z</MenubarItemShortcut>
          </MenubarItem>
          <MenubarItem closeOnClick>
            Redo
            <MenubarItemShortcut>Ctrl+Y</MenubarItemShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem closeOnClick>
            Copy
            <MenubarItemShortcut>Ctrl+C</MenubarItemShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}

export function IndicatorRightMenubarExample() {
  const [showSidebar, setShowSidebar] = React.useState(true);
  const [showPanel, setShowPanel] = React.useState(false);

  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>View</MenubarTrigger>
        <MenubarContent>
          <MenubarArrow />
          <MenubarCheckboxItem
            checked={showSidebar}
            onCheckedChange={setShowSidebar}
            indicator="end"
          >
            <MenubarItemText>
              <MenubarItemTextContent>
                <MenubarItemTextIcon>
                  <InfoIcon />
                </MenubarItemTextIcon>
                <MenubarItemTextLabel>Sidebar</MenubarItemTextLabel>
              </MenubarItemTextContent>
            </MenubarItemText>
            <MenubarCheckboxItemIndicator />
          </MenubarCheckboxItem>
          <MenubarCheckboxItem checked={showPanel} onCheckedChange={setShowPanel} indicator="end">
            <MenubarItemText>
              <MenubarItemTextContent>
                <MenubarItemTextIcon>
                  <MapIcon />
                </MenubarItemTextIcon>
                <MenubarItemTextLabel>Preview</MenubarItemTextLabel>
              </MenubarItemTextContent>
            </MenubarItemText>
            <MenubarCheckboxItemIndicator />
          </MenubarCheckboxItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}

export function NestedMenubarExample() {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarArrow />
          <MenubarItem closeOnClick>New File</MenubarItem>
          <MenubarSubmenu>
            <MenubarSubmenuTrigger>
              Export
              <MenubarSubmenuTriggerIcon />
            </MenubarSubmenuTrigger>
            <MenubarSubmenuContent>
              <MenubarItem closeOnClick>PDF</MenubarItem>
              <MenubarItem closeOnClick>PNG</MenubarItem>
              <MenubarItem closeOnClick>SVG</MenubarItem>
            </MenubarSubmenuContent>
          </MenubarSubmenu>
          <MenubarSeparator />
          <MenubarItem closeOnClick>Print</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}

export function VerticalMenubarExample() {
  return (
    <Menubar orientation="vertical">
      <MenubarMenu>
        <MenubarTrigger>Project</MenubarTrigger>
        <MenubarContent>
          <MenubarArrow />
          <MenubarItem closeOnClick>Create branch</MenubarItem>
          <MenubarItem closeOnClick>Pull latest</MenubarItem>
          <MenubarItem closeOnClick>Open in IDE</MenubarItem>
        </MenubarContent>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger>Deploy</MenubarTrigger>
        <MenubarContent>
          <MenubarArrow />
          <MenubarItem closeOnClick>Staging</MenubarItem>
          <MenubarItem closeOnClick>Production</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}

export function LinkItemsMenubarExample() {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>Navigate</MenubarTrigger>
        <MenubarContent>
          <MenubarArrow />
          <MenubarLinkItem href="#projects">Projects</MenubarLinkItem>
          <MenubarLinkItem href="#teams">Teams</MenubarLinkItem>
          <MenubarLinkItem href="#billing">Billing</MenubarLinkItem>
          <MenubarSeparator />
          <MenubarItem closeOnClick>Copy Link</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}

export function CustomStylesMenubarExample() {
  return (
    <Menubar className={styles.customRoot}>
      <MenubarMenu>
        <MenubarTrigger>Window</MenubarTrigger>
        <MenubarContent
          className={styles.customPopup}
          classNames={{
            portal: styles.customPortal,
            backdrop: styles.customBackdrop,
            positioner: styles.customPositioner,
            viewport: styles.customViewport,
          }}
          sideOffset={10}
          align="start"
          alignOffset={-4}
          withBackdrop
        >
          <MenubarArrow />
          <MenubarItem closeOnClick>Minimize</MenubarItem>
          <MenubarItem closeOnClick>Zoom</MenubarItem>
          <MenubarSeparator />
          <MenubarItem closeOnClick>Bring All to Front</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}

export function IconsMenubarExample() {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>Places</MenubarTrigger>
        <MenubarContent>
          <MenubarArrow />
          <MenubarItem closeOnClick>
            <MenubarItemTextContent>
              <MenubarItemTextIcon>
                <MapIcon />
              </MenubarItemTextIcon>
              <MenubarItemTextLabel>Open map</MenubarItemTextLabel>
            </MenubarItemTextContent>
          </MenubarItem>
          <MenubarSubmenu>
            <MenubarSubmenuTrigger>
              More
              <MenubarSubmenuTriggerIcon>
                <ChevronDownIcon />
              </MenubarSubmenuTriggerIcon>
            </MenubarSubmenuTrigger>
            <MenubarSubmenuContent>
              <MenubarItem closeOnClick>Nearby</MenubarItem>
              <MenubarItem closeOnClick>Routes</MenubarItem>
            </MenubarSubmenuContent>
          </MenubarSubmenu>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}