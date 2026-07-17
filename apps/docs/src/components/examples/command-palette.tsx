import { useListCollection } from '@ark-ui/react/collection';
import { useFilter } from '@ark-ui/react/locale';
import { Button, CommandPalette, PlusIcon } from '@moduix/react';
import { ArrowUpRight as ArrowUpRightIcon, Bell as BellIcon, Star as StarIcon } from 'lucide-react';
import * as React from 'react';
import type { CSSPropertiesEditorContext, CssPropertyInput } from '../preview';
import { CSSPropertiesEditor, CSSPropertiesReferenceTable } from '../preview';

type CommandItem = {
  id: string;
  section: string;
  label: string;
  description: string;
  shortcut?: string;
  icon: React.ReactNode;
};

type CommandActionItem = CommandItem & {
  onSelect: () => void;
};

const commandItems: CommandItem[] = [
  {
    id: 'new-project',
    section: 'Create',
    label: 'New project',
    description: 'Start a blank workspace',
    shortcut: 'N',
    icon: <PlusIcon />,
  },
  {
    id: 'invite-team',
    section: 'Create',
    label: 'Invite teammates',
    description: 'Send access to the current organization',
    shortcut: 'I',
    icon: <PlusIcon />,
  },
  {
    id: 'recent',
    section: 'Navigate',
    label: 'Open recent work',
    description: 'Jump back to a recently edited file',
    shortcut: 'R',
    icon: <ArrowUpRightIcon />,
  },
  {
    id: 'favorites',
    section: 'Navigate',
    label: 'View favorites',
    description: 'Show pinned dashboards and docs',
    shortcut: 'F',
    icon: <StarIcon />,
  },
  {
    id: 'notifications',
    section: 'System',
    label: 'Notification settings',
    description: 'Tune email and product alerts',
    icon: <BellIcon />,
  },
  {
    id: 'release-notes',
    section: 'System',
    label: 'Release notes',
    description: 'Read the latest product changes',
    icon: <ArrowUpRightIcon />,
  },
  {
    id: 'api-tokens',
    section: 'System',
    label: 'API tokens',
    description: 'Manage personal access tokens',
    icon: <StarIcon />,
  },
  {
    id: 'workspace-audit-log',
    section: 'System',
    label: 'Workspace audit log',
    description: 'Inspect recent security events',
    icon: <BellIcon />,
  },
];

export const commandPaletteOverrideCssProperties: CssPropertyInput[] = [
  [
    '--command-palette-backdrop-bg',
    'var(--backdrop-bg, var(--color-overlay))',
    'Controls backdrop fill.',
  ],
  ['--command-palette-backdrop-blur', '4px', 'Controls backdrop blur.'],
  [
    '--command-palette-backdrop-ending-blur',
    'none',
    'Customizes command palette backdrop ending blur.',
  ],
  [
    '--command-palette-backdrop-ending-opacity',
    '0',
    'Customizes command palette backdrop ending opacity.',
  ],
  [
    '--command-palette-backdrop-starting-blur',
    'none',
    'Customizes command palette backdrop starting blur.',
  ],
  [
    '--command-palette-backdrop-starting-opacity',
    '0',
    'Customizes command palette backdrop starting opacity.',
  ],
  [
    '--command-palette-backdrop-transition',
    'var(--transition-default)',
    'Customizes command palette backdrop transition.',
  ],
  ['--command-palette-bg', 'var(--color-popover)', 'Customizes command palette bg.'],
  [
    '--command-palette-border-color',
    'color-mix(in oklab, var(--color-border) 84%, transparent)',
    'Customizes command palette border color.',
  ],
  [
    '--command-palette-border-width',
    'var(--border-width-sm)',
    'Customizes command palette border width.',
  ],
  [
    '--command-palette-clear-bg-hover',
    'var(--color-accent)',
    'Customizes command palette clear bg hover.',
  ],
  [
    '--command-palette-clear-radius',
    'var(--radius-md)',
    'Customizes command palette clear radius.',
  ],
  ['--command-palette-clear-size', 'var(--size-sm)', 'Customizes command palette clear size.'],
  [
    '--command-palette-color',
    'var(--color-popover-foreground)',
    'Customizes command palette color.',
  ],
  [
    '--command-palette-content-ending-opacity',
    '0',
    'Customizes command palette content ending opacity.',
  ],
  [
    '--command-palette-content-ending-scale',
    'var(--scale-popup)',
    'Customizes command palette content ending scale.',
  ],
  [
    '--command-palette-content-ending-translate-x',
    '0',
    'Customizes command palette content ending translate x.',
  ],
  [
    '--command-palette-content-ending-translate-y',
    '-0.75rem',
    'Customizes command palette content ending translate y.',
  ],
  [
    '--command-palette-content-starting-opacity',
    '0',
    'Customizes command palette content starting opacity.',
  ],
  [
    '--command-palette-content-starting-scale',
    'var(--scale-popup)',
    'Customizes command palette content starting scale.',
  ],
  [
    '--command-palette-content-starting-translate-x',
    '0',
    'Customizes command palette content starting translate x.',
  ],
  [
    '--command-palette-content-starting-translate-y',
    '-0.75rem',
    'Customizes command palette content starting translate y.',
  ],
  [
    '--command-palette-control-margin-bottom',
    'var(--spacing-2)',
    'Customizes command palette control margin bottom.',
  ],
  [
    '--command-palette-control-margin-x',
    'var(--spacing-4)',
    'Customizes command palette control margin x.',
  ],
  [
    '--command-palette-control-margin-y',
    'var(--spacing-2)',
    'Customizes command palette control margin y.',
  ],
  [
    '--command-palette-control-padding-x',
    'var(--spacing-3)',
    'Customizes command palette control padding x.',
  ],
  [
    '--command-palette-control-padding-y',
    'var(--spacing-1)',
    'Customizes command palette control padding y.',
  ],
  [
    '--command-palette-divider-color',
    'var(--color-border)',
    'Customizes command palette divider color.',
  ],
  [
    '--command-palette-divider-width',
    'var(--border-width-sm)',
    'Customizes command palette divider width.',
  ],
  [
    '--command-palette-description-color',
    'var(--color-muted-foreground)',
    'Customizes command palette description color.',
  ],
  [
    '--command-palette-description-font-size',
    'var(--text-sm)',
    'Customizes command palette description font size.',
  ],
  [
    '--command-palette-description-line-height',
    'var(--line-height-text-sm)',
    'Customizes command palette description line height.',
  ],
  [
    '--command-palette-empty-font-size',
    'var(--text-sm)',
    'Customizes command palette empty font size.',
  ],
  [
    '--command-palette-empty-line-height',
    'var(--line-height-text-sm)',
    'Customizes command palette empty line height.',
  ],
  [
    '--command-palette-empty-padding-x',
    'var(--spacing-4)',
    'Customizes command palette empty padding x.',
  ],
  ['--command-palette-empty-padding-y', '0.75rem', 'Customizes command palette empty padding y.'],
  [
    '--command-palette-focus-ring-color',
    'var(--color-ring)',
    'Customizes command palette focus ring color.',
  ],
  [
    '--command-palette-focus-ring-offset',
    'var(--border-width-sm)',
    'Customizes command palette focus ring offset.',
  ],
  [
    '--command-palette-focus-ring-width',
    'var(--border-width-sm)',
    'Customizes command palette focus ring width.',
  ],
  [
    '--command-palette-footer-font-size',
    'var(--text-xs)',
    'Customizes command palette footer font size.',
  ],
  ['--command-palette-footer-gap', 'var(--spacing-3)', 'Customizes command palette footer gap.'],
  [
    '--command-palette-footer-line-height',
    'var(--line-height-text-xs)',
    'Customizes command palette footer line height.',
  ],
  [
    '--command-palette-footer-padding-x',
    'var(--spacing-4)',
    'Customizes command palette footer padding x.',
  ],
  [
    '--command-palette-footer-padding-y',
    'var(--spacing-2)',
    'Customizes command palette footer padding y.',
  ],
  ['--command-palette-group-gap', 'var(--spacing-1)', 'Customizes command palette group gap.'],
  [
    '--command-palette-group-label-font-size',
    'var(--text-xs)',
    'Customizes command palette group label font size.',
  ],
  [
    '--command-palette-group-label-font-weight',
    'var(--weight-semibold)',
    'Customizes command palette group label font weight.',
  ],
  [
    '--command-palette-group-label-line-height',
    'var(--line-height-text-xs)',
    'Customizes command palette group label line height.',
  ],
  [
    '--command-palette-group-label-padding-x',
    'var(--spacing-3)',
    'Customizes command palette group label padding x.',
  ],
  [
    '--command-palette-group-label-padding-y',
    'var(--spacing-1)',
    'Customizes command palette group label padding y.',
  ],
  [
    '--command-palette-group-padding-bottom',
    'var(--spacing-2)',
    'Customizes command palette group padding bottom.',
  ],
  ['--command-palette-header-gap', 'var(--spacing-1)', 'Customizes command palette header gap.'],
  [
    '--command-palette-header-padding-x',
    'var(--spacing-4)',
    'Customizes command palette header padding x.',
  ],
  [
    '--command-palette-header-padding-y',
    'var(--spacing-4)',
    'Customizes command palette header padding y.',
  ],
  [
    '--command-palette-highlight-bg',
    'var(--color-accent)',
    'Controls highlighted item background.',
  ],
  [
    '--command-palette-highlight-color',
    'var(--color-foreground)',
    'Customizes command palette highlight color.',
  ],
  ['--command-palette-icon-size', '1rem', 'Customizes command palette icon size.'],
  ['--command-palette-input-bg', 'var(--color-background)', 'Customizes command palette input bg.'],
  [
    '--command-palette-input-border-color',
    'var(--color-border)',
    'Customizes command palette input border color.',
  ],
  [
    '--command-palette-input-border-color-invalid',
    'var(--color-destructive)',
    'Customizes command palette input border color invalid.',
  ],
  [
    '--command-palette-input-border-width',
    'var(--border-width-sm)',
    'Customizes command palette input border width.',
  ],
  [
    '--command-palette-input-color',
    'var(--color-foreground)',
    'Customizes command palette input color.',
  ],
  [
    '--command-palette-input-control-height',
    'var(--size-sm)',
    'Customizes command palette input control height.',
  ],
  [
    '--command-palette-input-font-size',
    'var(--text-sm)',
    'Customizes command palette input font size.',
  ],
  ['--command-palette-input-gap', 'var(--spacing-2)', 'Customizes command palette input gap.'],
  ['--command-palette-input-height', 'var(--size-md)', 'Customizes command palette input height.'],
  [
    '--command-palette-input-line-height',
    'var(--line-height-text-sm)',
    'Customizes command palette input line height.',
  ],
  [
    '--command-palette-input-placeholder-color',
    'var(--color-muted-foreground)',
    'Customizes command palette input placeholder color.',
  ],
  [
    '--command-palette-input-radius',
    'var(--radius-md)',
    'Customizes command palette input radius.',
  ],
  [
    '--command-palette-item-color',
    'var(--command-palette-color)',
    'Customizes command palette item color.',
  ],
  [
    '--command-palette-item-description-font-size',
    'var(--text-xs)',
    'Customizes command palette item description font size.',
  ],
  [
    '--command-palette-item-description-line-height',
    'var(--line-height-text-xs)',
    'Customizes command palette item description line height.',
  ],
  [
    '--command-palette-item-font-size',
    'var(--text-sm)',
    'Customizes command palette item font size.',
  ],
  ['--command-palette-item-gap', 'var(--spacing-3)', 'Customizes command palette item gap.'],
  [
    '--command-palette-item-icon-bg',
    'var(--color-muted)',
    'Customizes command palette item icon bg.',
  ],
  [
    '--command-palette-item-icon-border-color',
    'var(--color-border)',
    'Customizes command palette item icon border color.',
  ],
  [
    '--command-palette-item-icon-border-width',
    'var(--border-width-sm)',
    'Customizes command palette item icon border width.',
  ],
  [
    '--command-palette-item-icon-box-size',
    '2rem',
    'Customizes command palette item icon box size.',
  ],
  [
    '--command-palette-item-icon-color',
    'var(--color-muted-foreground)',
    'Customizes command palette item icon color.',
  ],
  [
    '--command-palette-item-icon-radius',
    'var(--radius-md)',
    'Customizes command palette item icon radius.',
  ],
  ['--command-palette-item-icon-size', '1rem', 'Customizes command palette item icon size.'],
  [
    '--command-palette-item-label-font-weight',
    'var(--weight-medium)',
    'Customizes command palette item label font weight.',
  ],
  [
    '--command-palette-item-line-height',
    'var(--line-height-text-sm)',
    'Customizes command palette item line height.',
  ],
  [
    '--command-palette-item-meta-font-size',
    'var(--text-xs)',
    'Customizes command palette item meta font size.',
  ],
  [
    '--command-palette-item-meta-line-height',
    'var(--line-height-text-xs)',
    'Customizes command palette item meta line height.',
  ],
  ['--command-palette-item-min-height', '3rem', 'Customizes command palette item min height.'],
  [
    '--command-palette-item-padding-x',
    'var(--spacing-3)',
    'Customizes command palette item padding x.',
  ],
  [
    '--command-palette-item-padding-y',
    'var(--spacing-2)',
    'Customizes command palette item padding y.',
  ],
  ['--command-palette-item-radius', 'var(--radius-md)', 'Customizes command palette item radius.'],
  [
    '--command-palette-item-text-gap',
    'var(--spacing-1)',
    'Customizes command palette item text gap.',
  ],
  ['--command-palette-kbd-bg', 'var(--color-muted)', 'Customizes command palette kbd bg.'],
  [
    '--command-palette-kbd-border-color',
    'var(--color-border)',
    'Customizes command palette kbd border color.',
  ],
  [
    '--command-palette-kbd-border-width',
    'var(--border-width-sm)',
    'Customizes command palette kbd border width.',
  ],
  [
    '--command-palette-kbd-color',
    'var(--color-muted-foreground)',
    'Customizes command palette kbd color.',
  ],
  [
    '--command-palette-kbd-font-family',
    'var(--font-mono)',
    'Customizes command palette kbd font family.',
  ],
  [
    '--command-palette-kbd-font-size',
    'var(--text-xs)',
    'Customizes command palette kbd font size.',
  ],
  ['--command-palette-kbd-height', '1.25rem', 'Customizes command palette kbd height.'],
  ['--command-palette-kbd-line-height', '1rem', 'Customizes command palette kbd line height.'],
  ['--command-palette-kbd-min-width', '1.25rem', 'Customizes command palette kbd min width.'],
  [
    '--command-palette-kbd-padding-x',
    'var(--spacing-1)',
    'Customizes command palette kbd padding x.',
  ],
  ['--command-palette-kbd-radius', 'var(--radius-sm)', 'Customizes command palette kbd radius.'],
  [
    '--command-palette-list-padding-x',
    'var(--spacing-2)',
    'Customizes command palette list padding x.',
  ],
  [
    '--command-palette-list-padding-y',
    'var(--spacing-2)',
    'Customizes command palette list padding y.',
  ],
  [
    '--command-palette-list-scroll-padding-y',
    'var(--spacing-2)',
    'Customizes command palette list scroll padding y.',
  ],
  ['--command-palette-max-height', '34rem', 'Customizes command palette max height.'],
  [
    '--command-palette-max-width',
    'calc(100vw - var(--spacing-8))',
    'Customizes command palette max width.',
  ],
  [
    '--command-palette-muted-color',
    'var(--color-muted-foreground)',
    'Customizes command palette muted color.',
  ],
  [
    '--command-palette-positioner-padding',
    '10dvh var(--spacing-4) var(--spacing-4)',
    'Customizes command palette positioner padding.',
  ],
  ['--command-palette-radius', 'var(--radius-lg)', 'Controls palette corner radius.'],
  [
    '--command-palette-scrollbar-margin',
    'var(--spacing-1)',
    'Customizes command palette scrollbar margin.',
  ],
  ['--command-palette-scrollbar-size', '0.375rem', 'Customizes command palette scrollbar size.'],
  [
    '--command-palette-scrollbar-thumb-bg',
    'var(--color-border)',
    'Customizes command palette scrollbar thumb bg.',
  ],
  [
    '--command-palette-selected-color',
    'var(--command-palette-highlight-color)',
    'Customizes command palette selected color.',
  ],
  [
    '--command-palette-separator-margin-x',
    'var(--spacing-2)',
    'Customizes command palette separator margin x.',
  ],
  [
    '--command-palette-separator-margin-y',
    'var(--spacing-2)',
    'Customizes command palette separator margin y.',
  ],
  ['--command-palette-shadow', 'var(--shadow-lg)', 'Customizes command palette shadow.'],
  [
    '--command-palette-top-bg',
    'color-mix(in oklab, var(--color-popover) 96%, white 4%)',
    'Customizes command palette top bg.',
  ],
  [
    '--command-palette-title-color',
    'var(--command-palette-color, var(--color-popover-foreground))',
    'Customizes command palette title color.',
  ],
  [
    '--command-palette-title-font-size',
    'var(--text-md)',
    'Customizes command palette title font size.',
  ],
  [
    '--command-palette-title-font-weight',
    'var(--weight-semibold)',
    'Customizes command palette title font weight.',
  ],
  [
    '--command-palette-title-line-height',
    'var(--line-height-text-md)',
    'Customizes command palette title line height.',
  ],
  [
    '--command-palette-transition',
    'var(--transition-default)',
    'Customizes command palette transition.',
  ],
  [
    '--command-palette-trigger-bg',
    'var(--color-background)',
    'Customizes command palette trigger bg.',
  ],
  [
    '--command-palette-trigger-bg-hover',
    'var(--color-accent)',
    'Customizes command palette trigger bg hover.',
  ],
  [
    '--command-palette-trigger-border-color',
    'var(--color-border)',
    'Customizes command palette trigger border color.',
  ],
  [
    '--command-palette-trigger-border-width',
    'var(--border-width-sm)',
    'Customizes command palette trigger border width.',
  ],
  [
    '--command-palette-trigger-color',
    'var(--color-foreground)',
    'Customizes command palette trigger color.',
  ],
  [
    '--command-palette-trigger-font-size',
    'var(--text-md)',
    'Customizes command palette trigger font size.',
  ],
  ['--command-palette-trigger-gap', 'var(--spacing-2)', 'Customizes command palette trigger gap.'],
  [
    '--command-palette-trigger-height',
    'var(--size-lg)',
    'Customizes command palette trigger height.',
  ],
  [
    '--command-palette-trigger-line-height',
    'var(--line-height-text-md)',
    'Customizes command palette trigger line height.',
  ],
  [
    '--command-palette-trigger-padding-x',
    '0.875rem',
    'Customizes command palette trigger padding x.',
  ],
  [
    '--command-palette-trigger-padding-y',
    '0.5rem',
    'Customizes command palette trigger padding y.',
  ],
  [
    '--command-palette-trigger-radius',
    'var(--radius-md)',
    'Customizes command palette trigger radius.',
  ],
  ['--command-palette-width', '37.5rem', 'Controls palette width.'],
];

export const commandPalettePlaygroundCssProperties: CssPropertyInput[] = [
  [
    '--command-palette-backdrop-bg',
    'var(--backdrop-bg, var(--color-overlay))',
    'Controls backdrop fill.',
  ],
  ['--command-palette-backdrop-blur', '4px', 'Controls backdrop blur.'],
  [
    '--command-palette-highlight-bg',
    'var(--color-accent)',
    'Controls highlighted item background.',
  ],
  ['--command-palette-radius', 'var(--radius-lg)', 'Controls palette corner radius.'],
  ['--command-palette-width', '37.5rem', 'Controls palette width.'],
];

export function CommandPaletteCssPropertiesPanel(_context: CSSPropertiesEditorContext) {
  return (
    <CSSPropertiesReferenceTable
      properties={commandPaletteOverrideCssProperties.map(normalizeCssProperty)}
    />
  );
}

export function CommandPaletteCssPlaygroundPanel({
  values,
  onChange,
  onReset,
}: CSSPropertiesEditorContext) {
  return (
    <CSSPropertiesEditor
      properties={commandPalettePlaygroundCssProperties.map(normalizeCssProperty)}
      values={values}
      onChange={onChange}
      onReset={onReset}
    />
  );
}

function normalizeCssProperty(property: CssPropertyInput) {
  if (!('name' in property)) {
    return { name: property[0], defaultValue: property[1], description: property[2] };
  }

  return property;
}

function useCommandCollection<T extends CommandItem>(items: T[]) {
  const { contains } = useFilter({ sensitivity: 'base' });
  const { collection, filter } = useListCollection({
    initialItems: items,
    itemToString: (item) => `${item.label} ${item.description} ${item.section}`,
    itemToValue: (item) => item.id,
    filter: contains,
    groupBy: (item) => item.section,
  });

  return { collection, filter };
}

function CommandPaletteShell<T extends CommandItem>({
  children,
  collection,
  filter,
  label,
  onSelect,
  placeholder,
  shortcut = false,
  trigger,
}: {
  children: React.ReactNode;
  collection: ReturnType<typeof useCommandCollection<T>>['collection'];
  filter: ReturnType<typeof useCommandCollection<T>>['filter'];
  label: string;
  onSelect?: (details: { itemValue: string }) => void;
  placeholder: string;
  shortcut?: false | string;
  trigger: React.ReactNode;
}) {
  return (
    <CommandPalette
      aria-label={label}
      shortcut={shortcut}
      onOpenChange={(details) => {
        if (!details.open) {
          filter('');
        }
      }}
    >
      <CommandPalette.Trigger asChild>
        <Button>{trigger}</Button>
      </CommandPalette.Trigger>
      <CommandPalette.Panel>
        <CommandPalette.Combobox
          collection={collection}
          onInputValueChange={(details) => filter(details.inputValue)}
          onSelect={onSelect}
        >
          <CommandPalette.Search placeholder={placeholder} />
          {children}
        </CommandPalette.Combobox>
      </CommandPalette.Panel>
    </CommandPalette>
  );
}

function CommandPaletteGroupedItems<T extends CommandItem>({
  collection,
}: {
  collection: ReturnType<typeof useCommandCollection<T>>['collection'];
}) {
  return (
    <CommandPalette.List>
      <CommandPalette.Empty>No commands found.</CommandPalette.Empty>
      {collection.group().map(([section, items]) => (
        <CommandPalette.ItemGroup key={section}>
          <CommandPalette.ItemGroupLabel>{section}</CommandPalette.ItemGroupLabel>
          {items.map((item) => (
            <CommandPalette.Item key={item.id} item={item}>
              <CommandPalette.ItemIcon>{item.icon}</CommandPalette.ItemIcon>
              <CommandPalette.ItemText>
                <CommandPalette.ItemLabel>{item.label}</CommandPalette.ItemLabel>
                <CommandPalette.ItemDescription>{item.description}</CommandPalette.ItemDescription>
              </CommandPalette.ItemText>
              {item.shortcut ? (
                <CommandPalette.ItemMeta>{item.shortcut}</CommandPalette.ItemMeta>
              ) : null}
            </CommandPalette.Item>
          ))}
        </CommandPalette.ItemGroup>
      ))}
    </CommandPalette.List>
  );
}

export function CommandPaletteExample() {
  const { collection, filter } = useCommandCollection(commandItems);

  return (
    <CommandPaletteShell
      collection={collection}
      filter={filter}
      label="Command palette"
      placeholder="Search commands, pages, and settings..."
      shortcut="alt+k"
      trigger="Open palette"
    >
      <CommandPaletteGroupedItems collection={collection} />
      <CommandPalette.Footer>
        <span>
          <CommandPalette.Kbd>Enter</CommandPalette.Kbd> run
        </span>
        <span>
          <CommandPalette.Kbd>Esc</CommandPalette.Kbd> close
        </span>
      </CommandPalette.Footer>
    </CommandPaletteShell>
  );
}

export function AdvancedCommandPaletteExample() {
  const { collection, filter } = useCommandCollection(commandItems);

  return (
    <CommandPalette
      aria-label="Custom command palette"
      onOpenChange={(details) => {
        if (!details.open) {
          filter('');
        }
      }}
    >
      <CommandPalette.Trigger asChild>
        <Button>Open custom palette</Button>
      </CommandPalette.Trigger>
      <CommandPalette.Backdrop />
      <CommandPalette.Positioner>
        <CommandPalette.Content className="commandPalette">
          <CommandPalette.Header>
            <CommandPalette.Title>Commands</CommandPalette.Title>
          </CommandPalette.Header>
          <CommandPalette.Body>
            <CommandPalette.Combobox
              collection={collection}
              onInputValueChange={(details) => filter(details.inputValue)}
            >
              <CommandPalette.Control>
                <CommandPalette.Input placeholder="Search commands..." />
                <CommandPalette.ClearTrigger />
              </CommandPalette.Control>
              <CommandPaletteGroupedItems collection={collection} />
            </CommandPalette.Combobox>
          </CommandPalette.Body>
        </CommandPalette.Content>
      </CommandPalette.Positioner>
    </CommandPalette>
  );
}

export function CommandPaletteActionsExample() {
  const [lastAction, setLastAction] = React.useState('No command executed yet.');

  const actionItems = commandItems.map<CommandActionItem>((item) => ({
    ...item,
    onSelect: () => {
      if (item.id === 'release-notes') {
        window.open('https://github.com/Blinks44/moduix/releases', '_blank', 'noopener,noreferrer');
        setLastAction('Navigated: Release notes');
        return;
      }

      setLastAction(`Executed: ${item.label}`);
    },
  }));
  const { collection, filter } = useCommandCollection(actionItems);

  return (
    <CommandPaletteShell
      collection={collection}
      filter={filter}
      label="Command palette with actions"
      onSelect={(details) => {
        const selectedItem = actionItems.find((item) => item.id === details.itemValue);
        selectedItem?.onSelect();
      }}
      placeholder="Search and run commands..."
      trigger="Open actions palette"
    >
      <CommandPalette.List>
        <CommandPalette.Empty>No commands found.</CommandPalette.Empty>
        {collection.group().map(([section, items]) => (
          <CommandPalette.ItemGroup key={section}>
            <CommandPalette.ItemGroupLabel>{section}</CommandPalette.ItemGroupLabel>
            {items.map((item) => (
              <CommandPalette.Item key={item.id} item={item}>
                <CommandPalette.ItemIcon>{item.icon}</CommandPalette.ItemIcon>
                <CommandPalette.ItemText>
                  <CommandPalette.ItemLabel>{item.label}</CommandPalette.ItemLabel>
                  <CommandPalette.ItemDescription>
                    {item.description}
                  </CommandPalette.ItemDescription>
                </CommandPalette.ItemText>
                {item.shortcut ? (
                  <CommandPalette.ItemMeta>{item.shortcut}</CommandPalette.ItemMeta>
                ) : null}
              </CommandPalette.Item>
            ))}
          </CommandPalette.ItemGroup>
        ))}
      </CommandPalette.List>
      <CommandPalette.Footer>
        <span>
          <CommandPalette.Kbd>Enter</CommandPalette.Kbd> run
        </span>
        <span>{lastAction}</span>
      </CommandPalette.Footer>
    </CommandPaletteShell>
  );
}

export function ControlledCommandPaletteExample() {
  const [open, setOpen] = React.useState(false);
  const { collection, filter } = useCommandCollection(commandItems);

  return (
    <CommandPalette
      aria-label="Controlled command palette"
      open={open}
      onOpenChange={(details) => {
        setOpen(details.open);

        if (!details.open) {
          filter('');
        }
      }}
    >
      <CommandPalette.Trigger asChild>
        <Button>Search actions</Button>
      </CommandPalette.Trigger>
      <CommandPalette.Panel>
        <CommandPalette.Combobox
          collection={collection}
          onInputValueChange={(details) => filter(details.inputValue)}
        >
          <CommandPalette.Search placeholder="Search controlled commands..." />
          <CommandPaletteGroupedItems collection={collection} />
        </CommandPalette.Combobox>
      </CommandPalette.Panel>
    </CommandPalette>
  );
}

export function CommandPaletteShortcutExample() {
  const { collection, filter } = useCommandCollection(commandItems);

  return (
    <CommandPalette
      aria-label="Shortcut command palette preview"
      onOpenChange={(details) => {
        if (!details.open) {
          filter('');
        }
      }}
    >
      <CommandPalette.Trigger asChild>
        <Button>Open palette</Button>
      </CommandPalette.Trigger>
      <CommandPalette.Panel>
        <CommandPalette.Combobox
          collection={collection}
          onInputValueChange={(details) => filter(details.inputValue)}
        >
          <CommandPalette.Search placeholder="Search commands..." />
          <CommandPaletteGroupedItems collection={collection} />
          <CommandPalette.Footer>
            <span>
              <CommandPalette.Kbd>Alt</CommandPalette.Kbd> +{' '}
              <CommandPalette.Kbd>K</CommandPalette.Kbd>
            </span>
          </CommandPalette.Footer>
        </CommandPalette.Combobox>
      </CommandPalette.Panel>
    </CommandPalette>
  );
}