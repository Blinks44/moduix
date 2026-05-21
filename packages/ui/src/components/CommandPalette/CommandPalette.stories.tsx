import type { Meta, StoryObj } from '@storybook/react-vite';
import * as React from 'react';
import { ArrowUpRightIcon, BellIcon, PlusIcon, StarIcon } from '@/primitives/Icons';
import { Button } from '../Button';
import {
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
  useCommandPaletteFilteredItems,
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

export const Basic: Story = {
  render: () => (
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
  ),
};