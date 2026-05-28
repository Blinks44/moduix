import {
  InfoIcon,
  MapIcon,
  Menubar,
  MenubarArrow,
  MenubarBackdrop,
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
  MenubarPortal,
  MenubarPopup,
  MenubarPositioner,
  MenubarViewport,
} from 'moduix';
import * as React from 'react';
import type { CSSPropertiesEditorContext, CssPropertyInput } from '../preview';
import { CSSPropertiesEditor, CSSPropertiesReferenceTable } from '../preview';
import styles from './menubar.module.css';

export const menubarOverrideCssProperties: CssPropertyInput[] = [
  ['--menubar-arrow-height', '0.625rem', 'Controls popup arrow height.'],
  ['--menubar-arrow-inline-offset', '0.8125rem', 'Controls popup arrow inline offset.'],
  ['--menubar-arrow-size', '0.5rem', 'Controls popup arrow size.'],
  [
    '--menubar-arrow-stroke-color',
    'var(--menubar-popup-border-color)',
    'Controls arrow stroke color.',
  ],
  ['--menubar-arrow-width', '1.25rem', 'Controls popup arrow width.'],
  ['--menubar-backdrop-bg', 'var(--color-overlay)', 'Controls optional backdrop background.'],
  ['--menubar-backdrop-blur', '2px', 'Controls optional backdrop blur.'],
  [
    '--menubar-backdrop-transition',
    'var(--transition-default)',
    'Controls optional backdrop transition.',
  ],
  ['--menubar-bg', 'var(--color-muted)', 'Controls menubar background.'],
  ['--menubar-border-color', 'var(--color-border)', 'Controls menubar border color.'],
  ['--menubar-border-width', 'var(--border-width-sm)', 'Controls menubar border width.'],
  ['--menubar-check-gap', '0.5rem', 'Controls checkbox/radio indicator gap.'],
  ['--menubar-check-indicator-size', '0.75rem', 'Controls checkbox/radio indicator size.'],
  ['--menubar-check-padding-x-start', '0.625rem', 'Controls checkbox/radio start padding.'],
  ['--menubar-checkbox-indicator-bg', 'transparent', 'Controls checkbox indicator background.'],
  [
    '--menubar-checkbox-indicator-bg-checked',
    'var(--menubar-checkbox-indicator-bg)',
    'Controls checked checkbox indicator background.',
  ],
  [
    '--menubar-checkbox-indicator-border-color',
    'currentColor',
    'Controls checkbox indicator border color.',
  ],
  [
    '--menubar-checkbox-indicator-border-color-checked',
    'var(--menubar-checkbox-indicator-border-color)',
    'Controls checked checkbox indicator border color.',
  ],
  [
    '--menubar-checkbox-indicator-border-width',
    'var(--border-width-sm)',
    'Controls checkbox indicator border width.',
  ],
  [
    '--menubar-checkbox-indicator-radius',
    'var(--radius-xs)',
    'Controls checkbox indicator radius.',
  ],
  ['--menubar-color', 'var(--color-foreground)', 'Controls menubar text color.'],
  ['--menubar-disabled-opacity', 'var(--opacity-disabled)', 'Controls disabled trigger opacity.'],
  [
    '--menubar-focus-ring-color',
    'var(--menu-focus-ring-color, var(--color-ring))',
    'Controls focus ring color.',
  ],
  ['--menubar-focus-ring-width', 'var(--menubar-border-width)', 'Controls focus ring width.'],
  ['--menubar-gap', 'var(--spacing-1)', 'Controls spacing between triggers.'],
  ['--menubar-group-label-color', 'var(--color-muted-foreground)', 'Controls group label color.'],
  ['--menubar-group-label-font-size', 'var(--text-xs)', 'Controls group label font size.'],
  [
    '--menubar-group-label-line-height',
    'var(--line-height-text-xs)',
    'Controls group label line height.',
  ],
  ['--menubar-group-label-padding-x-end', '0.75rem', 'Controls group label end padding.'],
  ['--menubar-group-label-padding-x-start', '0.625rem', 'Controls group label start padding.'],
  ['--menubar-group-label-padding-y', '0.35rem', 'Controls group label vertical padding.'],
  ['--menubar-group-padding-y', '0', 'Controls group vertical padding.'],
  ['--menubar-highlight-bg', 'var(--color-foreground)', 'Controls highlighted item background.'],
  ['--menubar-highlight-color', 'var(--color-background)', 'Controls highlighted item color.'],
  ['--menubar-highlight-inset-x', 'var(--spacing-1)', 'Controls highlight inline inset.'],
  ['--menubar-highlight-radius', 'var(--radius-sm)', 'Controls highlight radius.'],
  ['--menubar-item-bg', 'transparent', 'Controls item background.'],
  ['--menubar-item-bg-disabled', 'var(--menubar-item-bg)', 'Controls disabled item background.'],
  [
    '--menubar-item-disabled-color',
    'var(--color-muted-foreground)',
    'Controls disabled item color.',
  ],
  ['--menubar-item-font-size', 'var(--text-sm)', 'Controls item font size.'],
  ['--menubar-item-gap', 'var(--spacing-2)', 'Controls item content gap.'],
  ['--menubar-item-height', '2rem', 'Controls item minimum height.'],
  ['--menubar-item-line-height', 'var(--line-height-text-sm)', 'Controls item line height.'],
  ['--menubar-item-padding-x-end', '1rem', 'Controls item end padding.'],
  ['--menubar-item-padding-x-start', '1rem', 'Controls item start padding.'],
  ['--menubar-item-padding-y', '0.5rem', 'Controls item vertical padding.'],
  ['--menubar-item-shortcut-color', 'var(--color-muted-foreground)', 'Controls shortcut color.'],
  ['--menubar-item-shortcut-font-size', 'var(--text-xs)', 'Controls shortcut font size.'],
  [
    '--menubar-item-shortcut-line-height',
    'var(--line-height-text-xs)',
    'Controls shortcut line height.',
  ],
  [
    '--menubar-item-shortcut-padding-x-start',
    'var(--spacing-4)',
    'Controls shortcut start padding.',
  ],
  ['--menubar-item-text-content-gap', 'var(--spacing-2)', 'Controls item text content gap.'],
  ['--menubar-item-text-icon-color', 'currentColor', 'Controls item text icon color.'],
  ['--menubar-item-text-icon-size', '1rem', 'Controls item text icon size.'],
  ['--menubar-padding-x', '0.125rem', 'Controls menubar horizontal padding.'],
  ['--menubar-padding-y', '0.125rem', 'Controls menubar vertical padding.'],
  ['--menubar-popup-bg', 'var(--color-popover)', 'Controls popup background.'],
  ['--menubar-popup-border-color', 'var(--color-border)', 'Controls popup border color.'],
  ['--menubar-popup-border-width', 'var(--border-width-sm)', 'Controls popup border width.'],
  ['--menubar-popup-color', 'var(--color-popover-foreground)', 'Controls popup text color.'],
  ['--menubar-popup-max-height', '24rem', 'Controls popup maximum height.'],
  ['--menubar-popup-max-width', '20rem', 'Controls popup maximum width.'],
  ['--menubar-popup-min-width', '12rem', 'Controls popup minimum width.'],
  ['--menubar-popup-padding-y', '0.25rem', 'Controls popup vertical padding.'],
  ['--menubar-popup-radius', 'var(--radius-md)', 'Controls popup radius.'],
  ['--menubar-popup-scale', 'var(--scale-popup)', 'Controls popup enter/exit scale.'],
  ['--menubar-popup-shadow', 'var(--shadow-lg)', 'Controls popup shadow.'],
  ['--menubar-radius', 'var(--radius-md)', 'Controls menubar radius.'],
  ['--menubar-separator-color', 'var(--color-border)', 'Controls separator color.'],
  ['--menubar-separator-height', 'var(--border-width-sm)', 'Controls separator thickness.'],
  ['--menubar-separator-margin-x-end', '1rem', 'Controls separator end margin.'],
  ['--menubar-separator-margin-x-start', '1rem', 'Controls separator start margin.'],
  ['--menubar-separator-margin-y', '0.375rem', 'Controls separator vertical margin.'],
  ['--menubar-submenu-icon-size', '0.875rem', 'Controls submenu icon size.'],
  ['--menubar-submenu-open-bg', 'var(--color-accent)', 'Controls open submenu background.'],
  ['--menubar-submenu-trigger-gap', 'var(--spacing-3)', 'Controls submenu trigger gap.'],
  ['--menubar-submenu-trigger-padding-x-end', '1rem', 'Controls submenu trigger end padding.'],
  [
    '--menubar-transition',
    'var(--transition-default)',
    'Controls menubar transition duration/timing.',
  ],
  ['--menubar-trigger-bg', 'transparent', 'Controls trigger background.'],
  [
    '--menubar-trigger-bg-active',
    'var(--menubar-trigger-bg-hover)',
    'Controls active trigger background.',
  ],
  ['--menubar-trigger-bg-hover', 'var(--color-accent)', 'Controls hover trigger background.'],
  ['--menubar-trigger-color', 'var(--color-foreground)', 'Controls trigger color.'],
  [
    '--menubar-trigger-color-active',
    'var(--menubar-trigger-color, var(--color-foreground))',
    'Controls active trigger color.',
  ],
  ['--menubar-trigger-font-size', 'var(--text-sm)', 'Controls trigger font size.'],
  ['--menubar-trigger-gap', '0.5rem', 'Controls trigger content gap.'],
  ['--menubar-trigger-height', 'var(--size-lg)', 'Controls trigger minimum height.'],
  ['--menubar-trigger-line-height', 'var(--line-height-text-sm)', 'Controls trigger line height.'],
  ['--menubar-trigger-padding-x', '0.75rem', 'Controls trigger horizontal padding.'],
  ['--menubar-trigger-padding-y', '0.5rem', 'Controls trigger vertical padding.'],
  ['--menubar-trigger-radius', 'var(--radius-sm)', 'Controls trigger radius.'],
  [
    '--menubar-trigger-ring-active',
    'var(--menubar-border-color, var(--color-border))',
    'Controls active trigger inset ring color.',
  ],
  [
    '--menubar-trigger-ring-width',
    'var(--menubar-border-width)',
    'Controls active trigger ring width.',
  ],
  ['--menubar-vertical-width', '12rem', 'Controls vertical menubar width.'],
];
export const menubarPlaygroundCssProperties: CssPropertyInput[] = [
  [
    '--menubar-arrow-stroke-color',
    'var(--menubar-popup-border-color)',
    'Controls arrow stroke color.',
  ],
  ['--menubar-bg', 'var(--color-muted)', 'Controls menubar background.'],
  ['--menubar-border-color', 'var(--color-border)', 'Controls menubar border color.'],
  ['--menubar-border-width', 'var(--border-width-sm)', 'Controls menubar border width.'],
  [
    '--menubar-checkbox-indicator-border-color',
    'currentColor',
    'Controls checkbox indicator border color.',
  ],
  ['--menubar-highlight-bg', 'var(--color-foreground)', 'Controls highlighted item background.'],
  ['--menubar-highlight-color', 'var(--color-background)', 'Controls highlighted item text color.'],
  ['--menubar-item-bg', 'transparent', 'Controls item background.'],
  ['--menubar-popup-bg', 'var(--color-popover)', 'Controls popup background.'],
  ['--menubar-popup-border-color', 'var(--color-border)', 'Controls popup border color.'],
  ['--menubar-popup-border-width', 'var(--border-width-sm)', 'Controls popup border width.'],
  ['--menubar-popup-color', 'var(--color-popover-foreground)', 'Controls popup text color.'],
  ['--menubar-radius', 'var(--radius-md)', 'Controls menubar radius.'],
  [
    '--menubar-trigger-bg-active',
    'var(--menubar-trigger-bg-hover)',
    'Controls open trigger background.',
  ],
  ['--menubar-trigger-bg-hover', 'var(--color-accent)', 'Controls trigger hover background.'],
  [
    '--menubar-trigger-ring-width',
    'var(--menubar-border-width)',
    'Controls active trigger ring width.',
  ],
];

export function MenubarCssPropertiesPanel(_context: CSSPropertiesEditorContext) {
  return (
    <CSSPropertiesReferenceTable
      properties={menubarOverrideCssProperties.map(normalizeCssProperty)}
    />
  );
}

export function MenubarCssPlaygroundPanel({
  values,
  onChange,
  onReset,
}: CSSPropertiesEditorContext) {
  return (
    <CSSPropertiesEditor
      properties={menubarPlaygroundCssProperties.map(normalizeCssProperty)}
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

export function MenubarExample() {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
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

export function VerticalMenubarExample() {
  return (
    <Menubar orientation="vertical">
      <MenubarMenu>
        <MenubarTrigger>Project</MenubarTrigger>
        <MenubarContent>
          <MenubarItem closeOnClick>Create branch</MenubarItem>
          <MenubarItem closeOnClick>Pull latest</MenubarItem>
          <MenubarItem closeOnClick>Open in IDE</MenubarItem>
        </MenubarContent>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger>Deploy</MenubarTrigger>
        <MenubarContent>
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

export function CustomCompositionMenubarExample() {
  return (
    <Menubar className={styles.customRoot}>
      <MenubarMenu>
        <MenubarTrigger className={styles.customTrigger}>Window</MenubarTrigger>
        <MenubarPortal className={styles.customPortal}>
          <MenubarBackdrop className={styles.customBackdrop} />
          <MenubarPositioner
            className={styles.customPositioner}
            sideOffset={10}
            align="start"
            alignOffset={-4}
          >
            <MenubarPopup className={styles.customPopup}>
              <MenubarArrow className={styles.customArrow} />
              <MenubarViewport className={styles.customViewport}>
                <MenubarItem closeOnClick>Minimize</MenubarItem>
                <MenubarItem closeOnClick>Zoom</MenubarItem>
                <MenubarSeparator />
                <MenubarItem closeOnClick>Bring All to Front</MenubarItem>
              </MenubarViewport>
            </MenubarPopup>
          </MenubarPositioner>
        </MenubarPortal>
      </MenubarMenu>
    </Menubar>
  );
}