import {
  ArrowUpRightIcon,
  BellIcon,
  Button,
  CommandPalette,
  CommandPaletteClear,
  CommandPaletteCollection,
  CommandPaletteContent,
  CommandPaletteEmpty,
  CommandPaletteFooter,
  CommandPaletteGroup,
  CommandPaletteGroupLabel,
  CommandPaletteInput,
  CommandPaletteInputWrap,
  CommandPaletteItem,
  CommandPaletteItemDescription,
  CommandPaletteItemIcon,
  CommandPaletteItemLabel,
  CommandPaletteItemMeta,
  CommandPaletteItemText,
  CommandPaletteKbd,
  CommandPaletteList,
  CommandPaletteTrigger,
  PlusIcon,
  StarIcon,
} from 'moduix';
import * as React from 'react';
import type { CSSPropertiesEditorContext, CssPropertyInput } from '../preview';
import { CSSPropertiesEditor, CSSPropertiesReferenceTable } from '../preview';
import styles from './command-palette.module.css';

type CommandItem = {
  id: string;
  section: string;
  label: string;
  description: string;
  shortcut?: string;
  icon: React.ReactNode;
};

type CommandActionItem = CommandItem & {
  action: () => void;
};

type CommandGroup = {
  value: string;
  items: CommandItem[];
};

type CommandActionGroup = {
  value: string;
  items: CommandActionItem[];
};

const commands: CommandItem[] = [
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

function groupCommands<T extends { section: string }>(
  items: T[],
): Array<{ value: string; items: T[] }> {
  return items.reduce<Array<{ value: string; items: T[] }>>((groups, item) => {
    const existingGroup = groups.find((group) => group.value === item.section);

    if (existingGroup) {
      existingGroup.items.push(item);
      return groups;
    }

    groups.push({ value: item.section, items: [item] });
    return groups;
  }, []);
}

export const commandPaletteOverrideCssProperties: CssPropertyInput[] = [
  ['--command-palette-backdrop-bg', 'var(--backdrop-bg, rgb(8 12 20 / 0.42))'],
  ['--command-palette-backdrop-blur', '8px'],
  ['--command-palette-backdrop-transition', 'var(--transition-default)'],
  ['--command-palette-bg', 'var(--color-popover)'],
  ['--command-palette-border-color', 'color-mix(in oklab, var(--color-border) 84%, transparent)'],
  ['--command-palette-border-width', 'var(--border-width-sm)'],
  ['--command-palette-clear-bg-hover', 'var(--color-accent)'],
  ['--command-palette-clear-radius', 'var(--radius-md)'],
  ['--command-palette-clear-size', '1.75rem'],
  ['--command-palette-color', 'var(--color-popover-foreground)'],
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
  ['--command-palette-footer-padding-y', '0.625rem'],
  ['--command-palette-group-gap', '0.125rem'],
  ['--command-palette-group-label-font-size', 'var(--text-xs)'],
  ['--command-palette-group-label-font-weight', 'var(--weight-semibold)'],
  ['--command-palette-group-label-line-height', 'var(--line-height-text-xs)'],
  ['--command-palette-group-label-padding-x', '0.75rem'],
  ['--command-palette-group-label-padding-y', '0.375rem'],
  ['--command-palette-group-padding-bottom', 'var(--spacing-2)'],
  ['--command-palette-highlight-bg', 'var(--color-accent)'],
  ['--command-palette-highlight-color', 'var(--color-foreground)'],
  ['--command-palette-icon-size', '1rem'],
  ['--command-palette-input-control-height', '2.25rem'],
  ['--command-palette-input-font-size', 'var(--text-lg)'],
  ['--command-palette-input-gap', 'var(--spacing-2)'],
  ['--command-palette-input-height', '4rem'],
  ['--command-palette-input-line-height', 'var(--line-height-text-lg)'],
  ['--command-palette-input-placeholder-color', 'var(--color-muted-foreground)'],
  ['--command-palette-input-wrap-padding-x', 'var(--spacing-4)'],
  ['--command-palette-input-wrap-padding-y', 'var(--spacing-3)'],
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
  ['--command-palette-item-padding-x', '0.75rem'],
  ['--command-palette-item-padding-y', '0.5rem'],
  ['--command-palette-item-radius', 'var(--radius-md)'],
  ['--command-palette-item-text-gap', '0.125rem'],
  ['--command-palette-kbd-bg', 'var(--color-muted)'],
  ['--command-palette-kbd-border-color', 'var(--color-border)'],
  ['--command-palette-kbd-border-width', 'var(--border-width-sm)'],
  ['--command-palette-kbd-color', 'var(--color-muted-foreground)'],
  ['--command-palette-kbd-font-family', 'var(--font-mono)'],
  ['--command-palette-kbd-font-size', '0.6875rem'],
  ['--command-palette-kbd-height', '1.25rem'],
  ['--command-palette-kbd-line-height', '1rem'],
  ['--command-palette-kbd-min-width', '1.25rem'],
  ['--command-palette-kbd-padding-x', '0.375rem'],
  ['--command-palette-kbd-radius', 'var(--radius-sm)'],
  ['--command-palette-list-padding-x', 'var(--spacing-2)'],
  ['--command-palette-list-padding-y', 'var(--spacing-2)'],
  ['--command-palette-list-scroll-padding-y', 'var(--spacing-2)'],
  ['--command-palette-max-height', '34rem'],
  ['--command-palette-max-width', 'calc(100vw - var(--spacing-8))'],
  ['--command-palette-muted-color', 'var(--color-muted-foreground)'],
  ['--command-palette-radius', 'var(--radius-lg)'],
  ['--command-palette-scale', 'var(--scale-popup)'],
  ['--command-palette-separator-margin-x', 'var(--spacing-2)'],
  ['--command-palette-separator-margin-y', 'var(--spacing-2)'],
  ['--command-palette-shadow', 'var(--shadow-lg)'],
  ['--command-palette-status-font-size', 'var(--text-xs)'],
  ['--command-palette-status-line-height', 'var(--line-height-text-xs)'],
  ['--command-palette-status-padding-x', 'var(--spacing-4)'],
  ['--command-palette-status-padding-y', '0.25rem'],
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
  ['--command-palette-viewport-padding', '10dvh var(--spacing-4) var(--spacing-4)'],
  ['--command-palette-width', '37.5rem'],
];

export const commandPalettePlaygroundCssProperties: CssPropertyInput[] = [
  [
    '--command-palette-backdrop-bg',
    'var(--backdrop-bg, rgb(8 12 20 / 0.42))',
    'Controls backdrop fill.',
  ],
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
  if (!('name' in property))
    return { name: property[0], defaultValue: property[1], description: property[2] };
  return property;
}

const commandGroups: CommandGroup[] = groupCommands(commands);

export function CommandPaletteExample() {
  return (
    <CommandPalette>
      <CommandPaletteTrigger render={<Button />}>
        Open palette <span className={styles.triggerMeta}>⌘K</span>
      </CommandPaletteTrigger>
      <CommandPaletteContent<CommandItem>
        aria-label="Command palette"
        items={commandGroups}
        itemToStringValue={(item) => `${item.label} ${item.description} ${item.section}`}
      >
        <CommandPaletteInputWrap>
          <CommandPaletteInput
            aria-label="Search commands"
            placeholder="Search commands, pages, and settings..."
          />
          <CommandPaletteClear aria-label="Clear search" />
        </CommandPaletteInputWrap>
        <CommandPaletteEmpty>No commands found.</CommandPaletteEmpty>
        <CommandPaletteList>
          {(group: CommandGroup) => (
            <CommandPaletteGroup key={group.value} items={group.items}>
              <CommandPaletteGroupLabel>{group.value}</CommandPaletteGroupLabel>
              <CommandPaletteCollection>
                {(item: CommandItem) => (
                  <CommandPaletteItem key={item.id} value={item}>
                    <CommandPaletteItemIcon>{item.icon}</CommandPaletteItemIcon>
                    <CommandPaletteItemText>
                      <CommandPaletteItemLabel>{item.label}</CommandPaletteItemLabel>
                      <CommandPaletteItemDescription>
                        {item.description}
                      </CommandPaletteItemDescription>
                    </CommandPaletteItemText>
                    {item.shortcut ? (
                      <CommandPaletteItemMeta>{item.shortcut}</CommandPaletteItemMeta>
                    ) : null}
                  </CommandPaletteItem>
                )}
              </CommandPaletteCollection>
            </CommandPaletteGroup>
          )}
        </CommandPaletteList>
        <CommandPaletteFooter>
          <span className={styles.footerHint}>
            <CommandPaletteKbd>Enter</CommandPaletteKbd> run
          </span>
          <span className={styles.footerHint}>
            <CommandPaletteKbd>Esc</CommandPaletteKbd> close
          </span>
        </CommandPaletteFooter>
      </CommandPaletteContent>
    </CommandPalette>
  );
}

export function CommandPaletteActionsExample() {
  const [lastAction, setLastAction] = React.useState('No command executed yet.');
  const actions = React.useMemo(
    () => ({
      openProfile: () => {
        setLastAction('Executed: Open profile');
      },
      logout: () => {
        console.log('User requested logout from command palette');
        setLastAction('Logged: Logout');
      },
      openDocs: () => {
        window.open('https://moduix.dev/docs/roadmap', '_blank', 'noopener,noreferrer');
        setLastAction('Navigated: Open docs');
      },
      defaultAction: (label: string) => {
        setLastAction(`Executed: ${label}`);
      },
    }),
    [],
  );

  const actionItems = React.useMemo<CommandActionItem[]>(
    () => [
      {
        id: 'new-project',
        section: 'Create',
        label: 'New project',
        description: 'Start a blank workspace',
        shortcut: 'N',
        icon: <PlusIcon />,
        action: actions.openProfile,
      },
      {
        id: 'invite-team',
        section: 'Create',
        label: 'Invite teammates',
        description: 'Send access to the current organization',
        shortcut: 'I',
        icon: <PlusIcon />,
        action: () => actions.defaultAction('Invite teammates'),
      },
      {
        id: 'recent',
        section: 'Navigate',
        label: 'Open recent work',
        description: 'Jump back to a recently edited file',
        shortcut: 'R',
        icon: <ArrowUpRightIcon />,
        action: () => actions.defaultAction('Open recent work'),
      },
      {
        id: 'favorites',
        section: 'Navigate',
        label: 'View favorites',
        description: 'Show pinned dashboards and docs',
        shortcut: 'F',
        icon: <StarIcon />,
        action: () => actions.defaultAction('View favorites'),
      },
      {
        id: 'notifications',
        section: 'System',
        label: 'Notification settings',
        description: 'Tune email and product alerts',
        icon: <BellIcon />,
        action: actions.logout,
      },
      {
        id: 'release-notes',
        section: 'System',
        label: 'Release notes',
        description: 'Read the latest product changes',
        icon: <ArrowUpRightIcon />,
        action: actions.openDocs,
      },
      {
        id: 'api-tokens',
        section: 'System',
        label: 'API tokens',
        description: 'Manage personal access tokens',
        icon: <StarIcon />,
        action: () => actions.defaultAction('API tokens'),
      },
      {
        id: 'workspace-audit-log',
        section: 'System',
        label: 'Workspace audit log',
        description: 'Inspect recent security events',
        icon: <BellIcon />,
        action: () => actions.defaultAction('Workspace audit log'),
      },
    ],
    [actions],
  );
  const actionGroups = React.useMemo<CommandActionGroup[]>(
    () => groupCommands(actionItems),
    [actionItems],
  );

  return (
    <CommandPalette>
      <CommandPaletteTrigger render={<Button />}>
        Open actions palette <span className={styles.triggerMeta}>⌘K</span>
      </CommandPaletteTrigger>
      <CommandPaletteContent<CommandActionItem>
        aria-label="Command palette with actions"
        items={actionGroups}
        itemToStringValue={(item) => `${item.label} ${item.description} ${item.section}`}
      >
        <CommandPaletteInputWrap>
          <CommandPaletteInput
            aria-label="Search commands"
            placeholder="Search and run commands..."
          />
          <CommandPaletteClear aria-label="Clear search" />
        </CommandPaletteInputWrap>
        <CommandPaletteEmpty>No commands found.</CommandPaletteEmpty>
        <CommandPaletteList>
          {(group: CommandActionGroup) => (
            <CommandPaletteGroup key={group.value} items={group.items}>
              <CommandPaletteGroupLabel>{group.value}</CommandPaletteGroupLabel>
              <CommandPaletteCollection>
                {(item: CommandActionItem) => (
                  <CommandPaletteItem key={item.id} value={item} onClick={() => item.action()}>
                    <CommandPaletteItemIcon>{item.icon}</CommandPaletteItemIcon>
                    <CommandPaletteItemText>
                      <CommandPaletteItemLabel>{item.label}</CommandPaletteItemLabel>
                      <CommandPaletteItemDescription>
                        {item.description}
                      </CommandPaletteItemDescription>
                    </CommandPaletteItemText>
                    {item.shortcut ? (
                      <CommandPaletteItemMeta>{item.shortcut}</CommandPaletteItemMeta>
                    ) : null}
                  </CommandPaletteItem>
                )}
              </CommandPaletteCollection>
            </CommandPaletteGroup>
          )}
        </CommandPaletteList>
        <CommandPaletteFooter>
          <span className={styles.footerHint}>
            <CommandPaletteKbd>Enter</CommandPaletteKbd> run
          </span>
          <span className={styles.footerHint}>{lastAction}</span>
        </CommandPaletteFooter>
      </CommandPaletteContent>
    </CommandPalette>
  );
}