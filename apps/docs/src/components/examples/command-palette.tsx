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
  ['--command-palette-backdrop-bg', 'var(--backdrop-bg, var(--color-overlay))'],
  ['--command-palette-backdrop-blur', '4px'],
  ['--command-palette-backdrop-ending-blur', 'none'],
  ['--command-palette-backdrop-ending-opacity', '0'],
  ['--command-palette-backdrop-starting-blur', 'none'],
  ['--command-palette-backdrop-starting-opacity', '0'],
  ['--command-palette-backdrop-transition', 'var(--transition-default)'],
  ['--command-palette-bg', 'var(--color-popover)'],
  ['--command-palette-border-color', 'color-mix(in oklab, var(--color-border) 84%, transparent)'],
  ['--command-palette-border-width', 'var(--border-width-sm)'],
  ['--command-palette-clear-bg-hover', 'var(--color-accent)'],
  ['--command-palette-clear-radius', 'var(--radius-md)'],
  ['--command-palette-clear-size', 'var(--size-sm)'],
  ['--command-palette-close-offset', 'var(--spacing-3)'],
  ['--command-palette-color', 'var(--color-popover-foreground)'],
  ['--command-palette-content-ending-opacity', '0'],
  ['--command-palette-content-ending-scale', 'var(--scale-popup)'],
  ['--command-palette-content-ending-translate-x', '0'],
  ['--command-palette-content-ending-translate-y', '-0.75rem'],
  ['--command-palette-content-starting-opacity', '0'],
  ['--command-palette-content-starting-scale', 'var(--scale-popup)'],
  ['--command-palette-content-starting-translate-x', '0'],
  ['--command-palette-content-starting-translate-y', '-0.75rem'],
  ['--command-palette-control-padding-x', 'var(--spacing-4)'],
  ['--command-palette-control-padding-y', 'var(--spacing-3)'],
  ['--command-palette-divider-color', 'var(--color-border)'],
  ['--command-palette-divider-width', 'var(--border-width-sm)'],
  ['--command-palette-empty-font-size', 'var(--text-sm)'],
  ['--command-palette-empty-line-height', 'var(--line-height-text-sm)'],
  ['--command-palette-empty-padding-x', 'var(--spacing-4)'],
  ['--command-palette-empty-padding-y', '0.75rem'],
  ['--command-palette-focus-ring-color', 'var(--color-ring)'],
  ['--command-palette-focus-ring-offset', 'var(--border-width-sm)'],
  ['--command-palette-focus-ring-width', 'var(--border-width-sm)'],
  ['--command-palette-footer-font-size', 'var(--text-xs)'],
  ['--command-palette-footer-gap', 'var(--spacing-3)'],
  ['--command-palette-footer-line-height', 'var(--line-height-text-xs)'],
  ['--command-palette-footer-padding-x', 'var(--spacing-4)'],
  ['--command-palette-footer-padding-y', 'var(--spacing-2)'],
  ['--command-palette-group-gap', 'var(--spacing-1)'],
  ['--command-palette-group-label-font-size', 'var(--text-xs)'],
  ['--command-palette-group-label-font-weight', 'var(--weight-semibold)'],
  ['--command-palette-group-label-line-height', 'var(--line-height-text-xs)'],
  ['--command-palette-group-label-padding-x', 'var(--spacing-3)'],
  ['--command-palette-group-label-padding-y', 'var(--spacing-1)'],
  ['--command-palette-group-padding-bottom', 'var(--spacing-2)'],
  ['--command-palette-highlight-bg', 'var(--color-accent)'],
  ['--command-palette-highlight-color', 'var(--color-foreground)'],
  ['--command-palette-icon-size', '1rem'],
  ['--command-palette-input-control-height', 'var(--size-md)'],
  ['--command-palette-input-font-size', 'var(--text-lg)'],
  ['--command-palette-input-gap', 'var(--spacing-2)'],
  ['--command-palette-input-height', '4rem'],
  ['--command-palette-input-line-height', 'var(--line-height-text-lg)'],
  ['--command-palette-input-placeholder-color', 'var(--color-muted-foreground)'],
  ['--command-palette-item-color', 'var(--command-palette-color)'],
  ['--command-palette-item-description-font-size', 'var(--text-xs)'],
  ['--command-palette-item-description-line-height', 'var(--line-height-text-xs)'],
  ['--command-palette-item-font-size', 'var(--text-sm)'],
  ['--command-palette-item-gap', 'var(--spacing-3)'],
  ['--command-palette-item-icon-bg', 'var(--color-muted)'],
  ['--command-palette-item-icon-border-color', 'var(--color-border)'],
  ['--command-palette-item-icon-border-width', 'var(--border-width-sm)'],
  ['--command-palette-item-icon-box-size', '2rem'],
  ['--command-palette-item-icon-color', 'var(--color-muted-foreground)'],
  ['--command-palette-item-icon-radius', 'var(--radius-md)'],
  ['--command-palette-item-icon-size', '1rem'],
  ['--command-palette-item-label-font-weight', 'var(--weight-medium)'],
  ['--command-palette-item-line-height', 'var(--line-height-text-sm)'],
  ['--command-palette-item-meta-font-size', 'var(--text-xs)'],
  ['--command-palette-item-meta-line-height', 'var(--line-height-text-xs)'],
  ['--command-palette-item-min-height', '3rem'],
  ['--command-palette-item-padding-x', 'var(--spacing-3)'],
  ['--command-palette-item-padding-y', 'var(--spacing-2)'],
  ['--command-palette-item-radius', 'var(--radius-md)'],
  ['--command-palette-item-text-gap', 'var(--spacing-1)'],
  ['--command-palette-kbd-bg', 'var(--color-muted)'],
  ['--command-palette-kbd-border-color', 'var(--color-border)'],
  ['--command-palette-kbd-border-width', 'var(--border-width-sm)'],
  ['--command-palette-kbd-color', 'var(--color-muted-foreground)'],
  ['--command-palette-kbd-font-family', 'var(--font-mono)'],
  ['--command-palette-kbd-font-size', 'var(--text-xs)'],
  ['--command-palette-kbd-height', '1.25rem'],
  ['--command-palette-kbd-line-height', '1rem'],
  ['--command-palette-kbd-min-width', '1.25rem'],
  ['--command-palette-kbd-padding-x', 'var(--spacing-1)'],
  ['--command-palette-kbd-radius', 'var(--radius-sm)'],
  ['--command-palette-list-padding-x', 'var(--spacing-2)'],
  ['--command-palette-list-padding-y', 'var(--spacing-2)'],
  ['--command-palette-list-scroll-padding-y', 'var(--spacing-2)'],
  ['--command-palette-max-height', '34rem'],
  ['--command-palette-max-width', 'calc(100vw - var(--spacing-8))'],
  ['--command-palette-muted-color', 'var(--color-muted-foreground)'],
  ['--command-palette-positioner-padding', '10dvh var(--spacing-4) var(--spacing-4)'],
  ['--command-palette-radius', 'var(--radius-lg)'],
  ['--command-palette-scrollbar-margin', 'var(--spacing-1)'],
  ['--command-palette-scrollbar-size', '0.375rem'],
  ['--command-palette-scrollbar-thumb-bg', 'var(--color-border)'],
  ['--command-palette-selected-color', 'var(--command-palette-highlight-color)'],
  ['--command-palette-separator-margin-x', 'var(--spacing-2)'],
  ['--command-palette-separator-margin-y', 'var(--spacing-2)'],
  ['--command-palette-shadow', 'var(--shadow-lg)'],
  ['--command-palette-top-bg', 'color-mix(in oklab, var(--color-popover) 96%, white 4%)'],
  ['--command-palette-transition', 'var(--transition-default)'],
  ['--command-palette-trigger-bg', 'var(--color-background)'],
  ['--command-palette-trigger-bg-hover', 'var(--color-accent)'],
  ['--command-palette-trigger-border-color', 'var(--color-border)'],
  ['--command-palette-trigger-border-width', 'var(--border-width-sm)'],
  ['--command-palette-trigger-color', 'var(--color-foreground)'],
  ['--command-palette-trigger-font-size', 'var(--text-md)'],
  ['--command-palette-trigger-gap', 'var(--spacing-2)'],
  ['--command-palette-trigger-height', 'var(--size-lg)'],
  ['--command-palette-trigger-line-height', 'var(--line-height-text-md)'],
  ['--command-palette-trigger-padding-x', '0.875rem'],
  ['--command-palette-trigger-padding-y', '0.5rem'],
  ['--command-palette-trigger-radius', 'var(--radius-md)'],
  ['--command-palette-width', '37.5rem'],
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
      <CommandPalette.Backdrop />
      <CommandPalette.Positioner>
        <CommandPalette.Content>
          <CommandPalette.Combobox
            collection={collection}
            onInputValueChange={(details) => filter(details.inputValue)}
            onSelect={onSelect}
          >
            <CommandPalette.Control>
              <CommandPalette.Input aria-label="Search commands" placeholder={placeholder} />
              <CommandPalette.ClearTrigger aria-label="Clear search" />
            </CommandPalette.Control>
            {children}
          </CommandPalette.Combobox>
        </CommandPalette.Content>
      </CommandPalette.Positioner>
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
        const selectedItem = collection.items.find((item) => item.id === details.itemValue);
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
    <>
      <Button type="button" onClick={() => setOpen(true)}>
        Search actions
      </Button>
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
        <CommandPalette.Backdrop />
        <CommandPalette.Positioner>
          <CommandPalette.Content>
            <CommandPalette.Combobox
              collection={collection}
              onInputValueChange={(details) => filter(details.inputValue)}
            >
              <CommandPalette.Control>
                <CommandPalette.Input
                  aria-label="Search commands"
                  placeholder="Search controlled commands..."
                />
                <CommandPalette.ClearTrigger aria-label="Clear search" />
              </CommandPalette.Control>
              <CommandPaletteGroupedItems collection={collection} />
            </CommandPalette.Combobox>
          </CommandPalette.Content>
        </CommandPalette.Positioner>
      </CommandPalette>
    </>
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
      <CommandPalette.Backdrop />
      <CommandPalette.Positioner>
        <CommandPalette.Content>
          <CommandPalette.Combobox
            collection={collection}
            onInputValueChange={(details) => filter(details.inputValue)}
          >
            <CommandPalette.Control>
              <CommandPalette.Input aria-label="Search commands" placeholder="Search commands..." />
              <CommandPalette.ClearTrigger aria-label="Clear search" />
            </CommandPalette.Control>
            <CommandPaletteGroupedItems collection={collection} />
            <CommandPalette.Footer>
              <span>
                <CommandPalette.Kbd>Alt</CommandPalette.Kbd> +{' '}
                <CommandPalette.Kbd>K</CommandPalette.Kbd>
              </span>
            </CommandPalette.Footer>
          </CommandPalette.Combobox>
        </CommandPalette.Content>
      </CommandPalette.Positioner>
    </CommandPalette>
  );
}