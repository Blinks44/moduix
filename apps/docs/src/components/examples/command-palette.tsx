import {
  ArrowUpRightIcon,
  BellIcon,
  Button,
  CommandPalette,
  CommandPaletteClear,
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
  useCommandPaletteFilteredItems,
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
];

export const commandPaletteOverrideCssProperties: CssPropertyInput[] = [
  [
    '--command-palette-backdrop-bg',
    'var(--backdrop-bg, rgb(8 12 20 / 0.42))',
    'Controls backdrop fill.',
  ],
  ['--command-palette-backdrop-blur', '8px', 'Controls backdrop blur.'],
  ['--command-palette-bg', 'var(--color-popover)', 'Controls palette background.'],
  ['--command-palette-border-color', 'var(--color-border)', 'Controls palette border color.'],
  ['--command-palette-color', 'var(--color-popover-foreground)', 'Controls primary text color.'],
  [
    '--command-palette-highlight-bg',
    'var(--color-accent)',
    'Controls highlighted item background.',
  ],
  ['--command-palette-input-font-size', 'var(--text-lg)', 'Controls search input font size.'],
  ['--command-palette-item-icon-bg', 'var(--color-muted)', 'Controls item icon background.'],
  ['--command-palette-item-min-height', '3rem', 'Controls command row minimum height.'],
  ['--command-palette-kbd-bg', 'var(--color-muted)', 'Controls shortcut key background.'],
  ['--command-palette-max-height', '34rem', 'Controls maximum palette height.'],
  ['--command-palette-radius', 'var(--radius-lg)', 'Controls palette corner radius.'],
  ['--command-palette-shadow', 'var(--shadow-lg)', 'Controls palette shadow.'],
  ['--command-palette-width', '37.5rem', 'Controls palette width.'],
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

function CommandResults() {
  const filteredItems = useCommandPaletteFilteredItems<CommandItem>();
  const sections = Array.from(new Set(filteredItems.map((item) => item.section)));

  return (
    <CommandPaletteList>
      {sections.map((section) => {
        const sectionItems = filteredItems.filter((item) => item.section === section);

        return (
          <CommandPaletteGroup key={section}>
            <CommandPaletteGroupLabel>{section}</CommandPaletteGroupLabel>
            {sectionItems.map((item) => (
              <CommandPaletteItem key={item.id} value={item}>
                <CommandPaletteItemIcon>{item.icon}</CommandPaletteItemIcon>
                <CommandPaletteItemText>
                  <CommandPaletteItemLabel>{item.label}</CommandPaletteItemLabel>
                  <CommandPaletteItemDescription>{item.description}</CommandPaletteItemDescription>
                </CommandPaletteItemText>
                {item.shortcut ? (
                  <CommandPaletteItemMeta>{item.shortcut}</CommandPaletteItemMeta>
                ) : null}
              </CommandPaletteItem>
            ))}
          </CommandPaletteGroup>
        );
      })}
    </CommandPaletteList>
  );
}

function CommandResultsWithActions() {
  const filteredItems = useCommandPaletteFilteredItems<CommandActionItem>();
  const sections = Array.from(new Set(filteredItems.map((item) => item.section)));

  return (
    <CommandPaletteList>
      {sections.map((section) => {
        const sectionItems = filteredItems.filter((item) => item.section === section);

        return (
          <CommandPaletteGroup key={section}>
            <CommandPaletteGroupLabel>{section}</CommandPaletteGroupLabel>
            {sectionItems.map((item) => (
              <CommandPaletteItem key={item.id} value={item} onClick={() => item.action()}>
                <CommandPaletteItemIcon>{item.icon}</CommandPaletteItemIcon>
                <CommandPaletteItemText>
                  <CommandPaletteItemLabel>{item.label}</CommandPaletteItemLabel>
                  <CommandPaletteItemDescription>{item.description}</CommandPaletteItemDescription>
                </CommandPaletteItemText>
                {item.shortcut ? (
                  <CommandPaletteItemMeta>{item.shortcut}</CommandPaletteItemMeta>
                ) : null}
              </CommandPaletteItem>
            ))}
          </CommandPaletteGroup>
        );
      })}
    </CommandPaletteList>
  );
}

export function CommandPaletteExample() {
  return (
    <CommandPalette>
      <CommandPaletteTrigger render={<Button />}>
        Open palette <span className={styles.triggerMeta}>⌘K</span>
      </CommandPaletteTrigger>
      <CommandPaletteContent
        aria-label="Command palette"
        items={commands}
        itemToStringValue={(item) => `${item.label} ${item.description} ${item.section}`}
      >
        <CommandPaletteInputWrap>
          <CommandPaletteInput placeholder="Search commands, pages, and settings..." />
          <CommandPaletteClear aria-label="Clear search" />
        </CommandPaletteInputWrap>
        <CommandPaletteEmpty>No commands found.</CommandPaletteEmpty>
        <CommandResults />
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
    ],
    [actions],
  );

  return (
    <CommandPalette>
      <CommandPaletteTrigger render={<Button />}>
        Open actions palette <span className={styles.triggerMeta}>⌘K</span>
      </CommandPaletteTrigger>
      <CommandPaletteContent
        aria-label="Command palette with actions"
        items={actionItems}
        itemToStringValue={(item) => `${item.label} ${item.description} ${item.section}`}
      >
        <CommandPaletteInputWrap>
          <CommandPaletteInput placeholder="Search and run commands..." />
          <CommandPaletteClear aria-label="Clear search" />
        </CommandPaletteInputWrap>
        <CommandPaletteEmpty>No commands found.</CommandPaletteEmpty>
        <CommandResultsWithActions />
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