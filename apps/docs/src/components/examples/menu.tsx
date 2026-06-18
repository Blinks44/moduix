import type { ComponentProps, ReactNode } from 'react';
import {
  Button,
  ChevronDownIcon,
  CheckIcon,
  InfoIcon,
  MapIcon,
  Menu,
  MenuArrow,
  MenuCheckboxItem,
  MenuContent,
  MenuContextTrigger,
  MenuItem,
  MenuItemGroup,
  MenuItemGroupLabel,
  MenuItemIndicator,
  MenuItemShortcut,
  MenuItemText,
  MenuItemTextContent,
  MenuItemTextIcon,
  MenuItemTextLabel,
  MenuPositioner,
  MenuRadioItem,
  MenuRadioItemGroup,
  MenuSeparator,
  MenuTrigger,
  MenuTriggerIcon,
  MenuTriggerItem,
  MenuTriggerItemIcon,
  Portal,
  useMenu,
} from 'moduix';
import { useState } from 'react';
import type { CssPropertyInput } from '../preview';
import { CSSPropertiesReferenceTable } from '../preview';
import styles from './menu.module.css';

export const menuItemsData = `const fileItems = [
  { value: 'new-file', label: 'New File' },
  { value: 'open', label: 'Open...' },
  { value: 'save', label: 'Save' },
  { value: 'save-as', label: 'Save As...' },
];`;

export const menuMessagesData = `const messages = [
  { id: '1', sender: 'Alice Johnson', preview: 'Hey, can you review the latest PR?' },
  { id: '2', sender: 'Bob Smith', preview: 'Meeting notes from today are attached.' },
  { id: '3', sender: 'Carol Davis', preview: 'The deploy finished successfully!' },
];`;

export const menuExampleCss = `.menu-content {
  --menu-popup-min-width: 13rem;
}

.menu-context-trigger {
  width: 16rem;
}

.message-list {
  display: grid;
  gap: 0.5rem;
  width: min(24rem, 100%);
}`;

export const menuCustomStylingCss = `.custom-content {
  --menu-popup-bg: var(--color-background);
  --menu-popup-border-color: var(--color-primary);
  --menu-popup-shadow: var(--shadow-lg);
  --menu-highlight-bg: var(--color-primary);
  --menu-highlight-color: var(--color-primary-foreground);
  --menu-separator-color: var(--color-primary);
  --menu-item-padding-x-start: var(--spacing-3);
  --menu-item-padding-x-end: var(--spacing-3);
}`;

export const menuOverrideCssProperties: CssPropertyInput[] = [
  ['--menu-arrow-size', '0.625rem', 'Controls Ark arrow size.'],
  [
    '--menu-arrow-stroke-color',
    'var(--menu-popup-border-color)',
    'Controls arrow tip stroke color.',
  ],
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
  ['--menu-context-trigger-border-style', 'dashed', 'Controls context trigger border style.'],
  ['--menu-context-trigger-height', '10rem', 'Controls context trigger height.'],
  ['--menu-context-trigger-width', '15rem', 'Controls context trigger width.'],
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
  [
    '--menu-item-destructive-color',
    'var(--color-destructive)',
    'Controls destructive item text color.',
  ],
  [
    '--menu-item-destructive-highlight-bg',
    'color-mix(in oklab, var(--color-destructive) 12%, transparent)',
    'Controls destructive item highlight background.',
  ],
  [
    '--menu-item-destructive-highlight-color',
    'var(--menu-item-destructive-color)',
    'Controls destructive item highlight text color.',
  ],
  ['--menu-item-disabled-color', 'var(--color-muted-foreground)', 'Controls disabled item color.'],
  ['--menu-item-font-size', 'var(--text-sm)', 'Controls item font size.'],
  ['--menu-item-gap', 'var(--spacing-2)', 'Controls item content gap.'],
  ['--menu-item-height', '2rem', 'Controls item minimum height.'],
  ['--menu-item-indicator-color-checked', 'currentColor', 'Controls checked item indicator color.'],
  ['--menu-item-line-height', 'var(--line-height-text-sm)', 'Controls item line height.'],
  ['--menu-item-padding-x-end', '1rem', 'Controls item end padding.'],
  ['--menu-item-padding-x-start', '1rem', 'Controls item start padding.'],
  ['--menu-item-padding-y', '0.5rem', 'Controls item vertical padding.'],
  ['--menu-item-radius', 'var(--radius-sm)', 'Controls item border radius.'],
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
  ['--menu-popup-ending-opacity', '0', 'Controls popup opacity at the end of exit transitions.'],
  ['--menu-popup-ending-scale', 'var(--scale-popup)', 'Controls popup scale at exit.'],
  ['--menu-popup-ending-translate-x', '0', 'Controls popup horizontal exit offset.'],
  ['--menu-popup-ending-translate-y', '0', 'Controls popup vertical exit offset.'],
  ['--menu-popup-max-height', '24rem', 'Controls popup maximum height.'],
  ['--menu-popup-max-width', '20rem', 'Controls popup maximum width.'],
  ['--menu-popup-min-width', '12rem', 'Controls popup minimum width.'],
  ['--menu-popup-padding-y', '0.25rem', 'Controls popup vertical padding.'],
  ['--menu-popup-radius', 'var(--radius-md)', 'Controls popup radius.'],
  ['--menu-popup-shadow', 'var(--shadow-lg)', 'Controls popup shadow.'],
  ['--menu-popup-starting-opacity', '0', 'Controls popup opacity at enter start.'],
  ['--menu-popup-starting-scale', 'var(--scale-popup)', 'Controls popup scale at enter start.'],
  ['--menu-popup-starting-translate-x', '0', 'Controls popup horizontal enter offset.'],
  ['--menu-popup-starting-translate-y', '0', 'Controls popup vertical enter offset.'],
  ['--menu-separator-color', 'var(--color-border)', 'Controls separator color.'],
  ['--menu-separator-height', 'var(--border-width-sm)', 'Controls separator thickness.'],
  ['--menu-separator-margin-x-end', '1rem', 'Controls separator end margin.'],
  ['--menu-separator-margin-x-start', '1rem', 'Controls separator start margin.'],
  ['--menu-separator-margin-y', '0.375rem', 'Controls separator vertical margin.'],
  ['--menu-submenu-open-bg', 'var(--color-accent)', 'Controls open nested trigger background.'],
  ['--menu-transition', 'var(--transition-default)', 'Controls menu transition duration/timing.'],
  ['--menu-trigger-bg', 'var(--color-background)', 'Controls trigger background.'],
  [
    '--menu-trigger-bg-active',
    'var(--menu-trigger-bg-hover)',
    'Controls active trigger background.',
  ],
  [
    '--menu-trigger-bg-hover',
    'no default (set explicitly when needed)',
    'Controls hover trigger background.',
  ],
  ['--menu-trigger-border-color', 'var(--color-border)', 'Controls trigger border color.'],
  ['--menu-trigger-border-width', 'var(--border-width-sm)', 'Controls trigger border width.'],
  ['--menu-trigger-color', 'var(--color-foreground)', 'Controls trigger color.'],
  ['--menu-trigger-font-size', 'var(--text-md)', 'Controls trigger font size.'],
  ['--menu-trigger-gap', '0.5rem', 'Controls trigger content gap.'],
  ['--menu-trigger-height', 'var(--size-lg)', 'Controls trigger minimum height.'],
  ['--menu-trigger-icon-color', 'currentColor', 'Controls trigger icon color.'],
  ['--menu-trigger-icon-size', '1rem', 'Controls trigger icon size.'],
  ['--menu-trigger-item-gap', 'var(--spacing-3)', 'Controls nested trigger item gap.'],
  ['--menu-trigger-item-icon-size', '0.875rem', 'Controls nested trigger icon size.'],
  ['--menu-trigger-item-padding-x-end', '1rem', 'Controls nested trigger end padding.'],
  ['--menu-trigger-line-height', 'var(--line-height-text-md)', 'Controls trigger line height.'],
  ['--menu-trigger-padding-x', '0.875rem', 'Controls trigger horizontal padding.'],
  ['--menu-trigger-padding-y', '0.5rem', 'Controls trigger vertical padding.'],
  ['--menu-trigger-radius', 'var(--radius-md)', 'Controls trigger radius.'],
];

const fileItems = [
  { value: 'new-file', label: 'New File' },
  { value: 'open', label: 'Open...' },
  { value: 'save', label: 'Save' },
  { value: 'save-as', label: 'Save As...' },
];

const messages = [
  { id: '1', sender: 'Alice Johnson', preview: 'Hey, can you review the latest PR?' },
  { id: '2', sender: 'Bob Smith', preview: 'Meeting notes from today are attached.' },
  { id: '3', sender: 'Carol Davis', preview: 'The deploy finished successfully!' },
];

export function MenuCssPropertiesPanel() {
  return (
    <CSSPropertiesReferenceTable properties={menuOverrideCssProperties.map(normalizeCssProperty)} />
  );
}

function normalizeCssProperty(property: CssPropertyInput) {
  if (!('name' in property))
    return { name: property[0], defaultValue: property[1], description: property[2] };
  return property;
}

function MenuButtonTrigger(props: ComponentProps<typeof MenuTrigger>) {
  return (
    <MenuTrigger asChild {...props}>
      <Button>{props.children}</Button>
    </MenuTrigger>
  );
}

function PositionedContent({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <Portal>
      <MenuPositioner>
        <MenuContent className={className}>{children}</MenuContent>
      </MenuPositioner>
    </Portal>
  );
}

export function MenuExample() {
  return (
    <Menu>
      <MenuButtonTrigger>
        File
        <MenuTriggerIcon />
      </MenuButtonTrigger>
      <PositionedContent>
        <MenuArrow />
        {fileItems.map((item) => (
          <MenuItem key={item.value} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </PositionedContent>
    </Menu>
  );
}

export function ControlledMenuExample() {
  const [open, setOpen] = useState(false);

  return (
    <Menu open={open} onOpenChange={(details) => setOpen(details.open)}>
      <Button onClick={() => setOpen((value) => !value)}>Toggle</Button>
      <MenuButtonTrigger>
        Actions
        <MenuTriggerIcon />
      </MenuButtonTrigger>
      <PositionedContent>
        <MenuItem value="edit">Edit</MenuItem>
        <MenuItem value="duplicate">Duplicate</MenuItem>
        <MenuItem value="archive">Archive</MenuItem>
        <MenuItem value="delete" tone="destructive">
          Delete
        </MenuItem>
      </PositionedContent>
    </Menu>
  );
}

export function RootProviderMenuExample() {
  const menu = useMenu();

  return (
    <Menu.RootProvider value={menu}>
      <Button onClick={() => menu.api.setHighlightedValue('copy')}>Highlight Copy</Button>
      <MenuButtonTrigger>
        Edit
        <MenuTriggerIcon />
      </MenuButtonTrigger>
      <PositionedContent>
        <MenuItem value="cut">Cut</MenuItem>
        <MenuItem value="copy">Copy</MenuItem>
        <MenuItem value="paste">Paste</MenuItem>
        <MenuItem value="delete" tone="destructive">
          Delete
        </MenuItem>
      </PositionedContent>
    </Menu.RootProvider>
  );
}

export function GroupMenuExample() {
  return (
    <Menu>
      <MenuButtonTrigger>
        Edit
        <MenuTriggerIcon />
      </MenuButtonTrigger>
      <PositionedContent>
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
          <MenuItem value="deselect">Deselect</MenuItem>
        </MenuItemGroup>
      </PositionedContent>
    </Menu>
  );
}

export function LinkItemsMenuExample() {
  return (
    <Menu>
      <MenuButtonTrigger>
        Help
        <MenuTriggerIcon />
      </MenuButtonTrigger>
      <PositionedContent>
        <MenuItem value="docs" asChild>
          <a href="#menu-docs">Documentation</a>
        </MenuItem>
        <MenuItem value="github" asChild>
          <a href="https://github.com/Blinks44/moduix">GitHub</a>
        </MenuItem>
        <MenuItem value="changelog" asChild>
          <a href="#menu-changelog">Changelog</a>
        </MenuItem>
      </PositionedContent>
    </Menu>
  );
}

export function CheckboxItemsMenuExample() {
  const [showToolbar, setShowToolbar] = useState(true);
  const [showStatusBar, setShowStatusBar] = useState(false);

  return (
    <Menu>
      <MenuButtonTrigger>
        View
        <MenuTriggerIcon />
      </MenuButtonTrigger>
      <PositionedContent>
        <MenuCheckboxItem checked={showToolbar} value="toolbar" onCheckedChange={setShowToolbar}>
          <MenuItemIndicator />
          <MenuItemText>Show Toolbar</MenuItemText>
        </MenuCheckboxItem>
        <MenuCheckboxItem
          checked={showStatusBar}
          value="statusbar"
          onCheckedChange={setShowStatusBar}
        >
          <MenuItemIndicator />
          <MenuItemText>Show Status Bar</MenuItemText>
        </MenuCheckboxItem>
      </PositionedContent>
    </Menu>
  );
}

export function RadioItemsMenuExample() {
  const [sortBy, setSortBy] = useState('date');

  return (
    <Menu>
      <MenuButtonTrigger>
        Sort
        <MenuTriggerIcon />
      </MenuButtonTrigger>
      <PositionedContent>
        <MenuItemGroup>
          <MenuItemGroupLabel>Sort By</MenuItemGroupLabel>
          <MenuRadioItemGroup value={sortBy} onValueChange={(details) => setSortBy(details.value)}>
            <MenuRadioItem value="name">
              <MenuItemIndicator />
              <MenuItemText>Name</MenuItemText>
            </MenuRadioItem>
            <MenuRadioItem value="date">
              <MenuItemIndicator />
              <MenuItemText>Date Modified</MenuItemText>
            </MenuRadioItem>
            <MenuRadioItem value="size">
              <MenuItemIndicator />
              <MenuItemText>Size</MenuItemText>
            </MenuRadioItem>
            <MenuRadioItem value="type">
              <MenuItemIndicator />
              <MenuItemText>Type</MenuItemText>
            </MenuRadioItem>
          </MenuRadioItemGroup>
        </MenuItemGroup>
      </PositionedContent>
    </Menu>
  );
}

export function ContextMenuExample() {
  return (
    <Menu>
      <MenuContextTrigger className={styles.contextTrigger}>Right click here</MenuContextTrigger>
      <PositionedContent>
        <MenuItem value="cut">Cut</MenuItem>
        <MenuItem value="copy">Copy</MenuItem>
        <MenuItem value="paste">Paste</MenuItem>
        <MenuItem value="delete" tone="destructive">
          Delete
        </MenuItem>
      </PositionedContent>
    </Menu>
  );
}

export function NestedMenuExample() {
  return (
    <Menu>
      <MenuButtonTrigger>
        File
        <MenuTriggerIcon />
      </MenuButtonTrigger>
      <PositionedContent>
        <MenuItem value="new-file">New File</MenuItem>
        <MenuItem value="open">Open...</MenuItem>
        <Menu>
          <MenuTriggerItem>
            Share
            <MenuTriggerItemIcon />
          </MenuTriggerItem>
          <PositionedContent>
            <MenuItem value="email">Email</MenuItem>
            <MenuItem value="message">Message</MenuItem>
            <MenuItem value="airdrop">AirDrop</MenuItem>
          </PositionedContent>
        </Menu>
        <Menu>
          <MenuTriggerItem>
            Export
            <MenuTriggerItemIcon />
          </MenuTriggerItem>
          <PositionedContent>
            <MenuItem value="pdf">PDF</MenuItem>
            <MenuItem value="png">PNG</MenuItem>
            <MenuItem value="svg">SVG</MenuItem>
          </PositionedContent>
        </Menu>
        <MenuSeparator />
        <MenuItem value="print">Print...</MenuItem>
      </PositionedContent>
    </Menu>
  );
}

export function MultipleTriggersMenuExample() {
  return (
    <Menu>
      <div className={styles.messageList}>
        {messages.map((message) => (
          <div key={message.id} className={styles.messageItem}>
            <div className={styles.messageContent}>
              <div className={styles.messageSender}>{message.sender}</div>
              <div className={styles.messagePreview}>{message.preview}</div>
            </div>
            <MenuTrigger value={message.id} className={styles.messageAction} aria-label="Open menu">
              <MapIcon />
            </MenuTrigger>
          </div>
        ))}
      </div>
      <PositionedContent>
        <MenuItem value="reply">Reply</MenuItem>
        <MenuItem value="forward">Forward</MenuItem>
        <MenuItem value="archive">Archive</MenuItem>
        <MenuItem value="delete" tone="destructive">
          Delete
        </MenuItem>
      </PositionedContent>
    </Menu>
  );
}

export function SelectEventMenuExample() {
  const [selected, setSelected] = useState('Nothing selected');

  return (
    <div className={styles.selectEvent}>
      <Menu onSelect={(details) => setSelected(details.value)}>
        <MenuButtonTrigger>
          Actions
          <MenuTriggerIcon />
        </MenuButtonTrigger>
        <PositionedContent>
          <MenuItem value="edit">Edit</MenuItem>
          <MenuItem value="duplicate">Duplicate</MenuItem>
          <MenuItem value="archive">Archive</MenuItem>
        </PositionedContent>
      </Menu>
      <span>{selected}</span>
    </div>
  );
}

export function ItemContextMenuExample() {
  return (
    <Menu>
      <MenuButtonTrigger>
        Settings
        <MenuTriggerIcon />
      </MenuButtonTrigger>
      <PositionedContent>
        <MenuItem value="profile">
          <Menu.ItemContext>
            {(item) => (
              <span style={{ fontWeight: item.highlighted ? 'var(--weight-semibold)' : undefined }}>
                Profile Settings
              </span>
            )}
          </Menu.ItemContext>
        </MenuItem>
        <MenuItem value="preferences">Preferences</MenuItem>
        <MenuItem value="notifications">Notifications</MenuItem>
        <MenuSeparator />
        <MenuItem value="logout">Log Out</MenuItem>
      </PositionedContent>
    </Menu>
  );
}

export function IndicatorRightMenuExample() {
  const [showMinimap, setShowMinimap] = useState(true);
  const [showSearch, setShowSearch] = useState(true);

  return (
    <Menu>
      <MenuButtonTrigger>
        View
        <MenuTriggerIcon />
      </MenuButtonTrigger>
      <PositionedContent>
        <MenuCheckboxItem
          checked={showMinimap}
          value="minimap"
          onCheckedChange={setShowMinimap}
          indicator="end"
        >
          <MenuItemText>
            <MenuItemTextContent>
              <MenuItemTextIcon>
                <InfoIcon />
              </MenuItemTextIcon>
              <MenuItemTextLabel>Minimap</MenuItemTextLabel>
            </MenuItemTextContent>
          </MenuItemText>
          <MenuItemIndicator />
        </MenuCheckboxItem>
        <MenuCheckboxItem
          checked={showSearch}
          value="search"
          onCheckedChange={setShowSearch}
          indicator="end"
        >
          <MenuItemText>
            <MenuItemTextContent>
              <MenuItemTextIcon>
                <MapIcon />
              </MenuItemTextIcon>
              <MenuItemTextLabel>Search</MenuItemTextLabel>
            </MenuItemTextContent>
          </MenuItemText>
          <MenuItemIndicator />
        </MenuCheckboxItem>
      </PositionedContent>
    </Menu>
  );
}

export function CustomStylingMenuExample() {
  return (
    <Menu positioning={{ placement: 'right-start', gutter: 12 }}>
      <MenuButtonTrigger>
        Export
        <MenuTriggerIcon />
      </MenuButtonTrigger>
      <PositionedContent className={styles.customContent}>
        <MenuArrow />
        <MenuItem value="png">
          <CheckIcon />
          Export PNG
          <MenuItemShortcut>Shift+P</MenuItemShortcut>
        </MenuItem>
        <MenuItem value="pdf">
          <ChevronDownIcon />
          Export PDF
          <MenuItemShortcut>Shift+D</MenuItemShortcut>
        </MenuItem>
        <MenuSeparator />
        <MenuItem value="copy-link">Copy share link</MenuItem>
      </PositionedContent>
    </Menu>
  );
}