import type { Meta, StoryObj } from '@storybook/react-vite';
import * as React from 'react';
import { ArrowUpRightIcon, BellIcon, StarIcon } from '@/icons/demo';
import { PlusIcon } from '@/icons/ui';
import { Autocomplete } from '../Autocomplete';
import { Button } from '../Button';
import {
  CommandPalette,
  CommandPaletteBackdrop,
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
  CommandPalettePopup,
  CommandPalettePortal,
  CommandPaletteTrigger,
  CommandPaletteViewport,
} from './CommandPalette';
import styles from './CommandPalette.stories.module.css';

const meta = {
  title: 'Components/CommandPalette',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

type CommandItem = {
  id: string;
  section: string;
  label: string;
  description: string;
  shortcut?: string;
  icon: React.ReactNode;
};

type CommandGroup = {
  value: string;
  items: CommandItem[];
};

type ActionCommandItem = CommandItem & {
  onSelect: () => void;
};

type ActionCommandGroup = {
  value: string;
  items: ActionCommandItem[];
};

const commandGroups: CommandGroup[] = [
  {
    value: 'Create',
    items: [
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
    ],
  },
  {
    value: 'Navigate',
    items: [
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
    ],
  },
  {
    value: 'System',
    items: [
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
    ],
  },
];

export const Basic: Story = {
  render: () => (
    <CommandPalette shortcut="alt+k">
      <CommandPaletteTrigger render={<Button />}>
        Open palette <span className={styles.triggerMeta}>Alt+K</span>
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
  ),
};

export const Actions: Story = {
  render: () => {
    const [lastCommand, setLastCommand] = React.useState('No command executed yet.');
    const actionItems: ActionCommandGroup[] = commandGroups.map((group) => ({
      ...group,
      items: group.items.map((item) => ({
        ...item,
        onSelect: () => setLastCommand(`Executed: ${item.label}`),
      })),
    }));

    return (
      <CommandPalette shortcut="alt+k">
        <CommandPaletteTrigger render={<Button />}>
          Open actions <span className={styles.triggerMeta}>Alt+K</span>
        </CommandPaletteTrigger>
        <CommandPaletteContent<ActionCommandItem>
          aria-label="Command palette with actions"
          items={actionItems}
          itemToStringValue={(item) => `${item.label} ${item.description} ${item.section}`}
        >
          <CommandPaletteInputWrap>
            <CommandPaletteInput aria-label="Search commands" placeholder="Search and run..." />
            <CommandPaletteClear aria-label="Clear search" />
          </CommandPaletteInputWrap>
          <CommandPaletteEmpty>No commands found.</CommandPaletteEmpty>
          <CommandPaletteList>
            {(group: ActionCommandGroup) => (
              <CommandPaletteGroup key={group.value} items={group.items}>
                <CommandPaletteGroupLabel>{group.value}</CommandPaletteGroupLabel>
                <CommandPaletteCollection>
                  {(item: ActionCommandItem) => (
                    <CommandPaletteItem key={item.id} value={item} onClick={item.onSelect}>
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
            <span className={styles.footerHint}>{lastCommand}</span>
          </CommandPaletteFooter>
        </CommandPaletteContent>
      </CommandPalette>
    );
  },
};

export const CustomComposition: Story = {
  render: () => (
    <CommandPalette shortcut="alt+k">
      <CommandPaletteTrigger render={<Button />}>
        Open custom palette <span className={styles.triggerMeta}>Alt+K</span>
      </CommandPaletteTrigger>
      <CommandPalettePortal>
        <CommandPaletteBackdrop className={styles.customBackdrop} />
        <CommandPaletteViewport className={styles.customViewport}>
          <CommandPalettePopup className={styles.customPopup} aria-label="Custom command palette">
            <Autocomplete
              autoHighlight="always"
              inline
              items={commandGroups}
              keepHighlight
              itemToStringValue={(item: CommandItem) =>
                `${item.label} ${item.description} ${item.section}`
              }
            >
              <CommandPaletteInputWrap>
                <CommandPaletteInput
                  aria-label="Search commands"
                  placeholder="Jump to places, pages, and settings..."
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
            </Autocomplete>
          </CommandPalettePopup>
        </CommandPaletteViewport>
      </CommandPalettePortal>
    </CommandPalette>
  ),
};