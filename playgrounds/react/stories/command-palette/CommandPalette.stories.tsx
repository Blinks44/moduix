import type { ListCollection } from '@ark-ui/react/collection';
import { useListCollection } from '@ark-ui/react/collection';
import { useFilter } from '@ark-ui/react/locale';
import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ReactNode } from 'react';
import { useState } from 'react';
import { Button } from '@/components/button';
import {
  CommandPalette,
  CommandPaletteCombobox,
  CommandPaletteEmpty,
  CommandPaletteFooter,
  CommandPaletteItem,
  CommandPaletteItemDescription,
  CommandPaletteItemGroup,
  CommandPaletteItemGroupLabel,
  CommandPaletteItemIcon,
  CommandPaletteItemLabel,
  CommandPaletteItemMeta,
  CommandPaletteItemText,
  CommandPaletteKbd,
  CommandPaletteList,
  CommandPalettePanel,
  CommandPaletteSearch,
  CommandPaletteTrigger,
} from '@/components/command-palette/CommandPalette';
import { PlusIcon } from '@/lib/moduix/icons/ui';
import { ArrowUpRightIcon, StarIcon } from '../../icons/demo';
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
  icon: ReactNode;
};

type ActionCommandItem = CommandItem & {
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
    icon: <StarIcon />,
  },
  {
    id: 'release-notes',
    section: 'System',
    label: 'Release notes',
    description: 'Read the latest product changes',
    icon: <ArrowUpRightIcon />,
  },
];

function CommandPaletteItems<T extends CommandItem>({
  collection,
}: {
  collection: ListCollection<T>;
}) {
  return (
    <CommandPaletteList>
      <CommandPaletteEmpty>No commands found.</CommandPaletteEmpty>
      {collection.group().map(([section, items]) => (
        <CommandPaletteItemGroup key={section}>
          <CommandPaletteItemGroupLabel>{section}</CommandPaletteItemGroupLabel>
          {items.map((item) => (
            <CommandPaletteItem key={item.id} item={item}>
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
        </CommandPaletteItemGroup>
      ))}
    </CommandPaletteList>
  );
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
  trigger,
  onSelect,
  placeholder,
  shortcut = false,
}: {
  children: ReactNode;
  collection: ListCollection<T>;
  filter: ReturnType<typeof useCommandCollection<T>>['filter'];
  label: string;
  trigger: ReactNode;
  onSelect?: (details: { itemValue: string }) => void;
  placeholder: string;
  shortcut?: false | string;
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
      <CommandPaletteTrigger asChild>
        <Button>{trigger}</Button>
      </CommandPaletteTrigger>
      <CommandPalettePanel>
        <CommandPaletteCombobox
          collection={collection}
          onInputValueChange={(details) => filter(details.inputValue)}
          onSelect={onSelect}
        >
          <CommandPaletteSearch placeholder={placeholder} />
          {children}
        </CommandPaletteCombobox>
      </CommandPalettePanel>
    </CommandPalette>
  );
}

export const Basic: Story = {
  render: () => {
    const { collection, filter } = useCommandCollection(commandItems);

    return (
      <CommandPaletteShell
        collection={collection}
        filter={filter}
        label="Command palette"
        placeholder="Search commands, pages, and settings..."
        shortcut="alt+k"
        trigger={
          <>
            Open palette <span className={styles.triggerMeta}>Alt+K</span>
          </>
        }
      >
        <CommandPaletteItems collection={collection} />
        <CommandPaletteFooter>
          <span className={styles.footerHint}>
            <CommandPaletteKbd>Enter</CommandPaletteKbd> run
          </span>
          <span className={styles.footerHint}>
            <CommandPaletteKbd>Esc</CommandPaletteKbd> close
          </span>
        </CommandPaletteFooter>
      </CommandPaletteShell>
    );
  },
};

export const Actions: Story = {
  render: () => {
    const [lastCommand, setLastCommand] = useState('No command executed yet.');
    const actionItems = commandItems.map<ActionCommandItem>((item) => ({
      ...item,
      onSelect: () => setLastCommand(`Executed: ${item.label}`),
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
        placeholder="Search and run..."
        trigger={<>Open actions</>}
      >
        <CommandPaletteItems collection={collection} />
        <CommandPaletteFooter>
          <span className={styles.footerHint}>
            <CommandPaletteKbd>Enter</CommandPaletteKbd> run
          </span>
          <span className={styles.footerHint}>{lastCommand}</span>
        </CommandPaletteFooter>
      </CommandPaletteShell>
    );
  },
};

export const CustomComposition: Story = {
  render: () => {
    const { collection, filter } = useCommandCollection(commandItems);

    return (
      <CommandPaletteShell
        collection={collection}
        filter={filter}
        label="Custom command palette"
        placeholder="Jump to places, pages, and settings..."
        trigger={<>Open custom palette</>}
      >
        <CommandPaletteList>
          <CommandPaletteEmpty>No commands found.</CommandPaletteEmpty>
          {collection.items.map((item) => (
            <CommandPaletteItem key={item.id} item={item}>
              <CommandPaletteItemText>
                <CommandPaletteItemLabel>{item.label}</CommandPaletteItemLabel>
                <CommandPaletteItemDescription>{item.description}</CommandPaletteItemDescription>
              </CommandPaletteItemText>
              {item.shortcut ? (
                <CommandPaletteItemMeta>{item.shortcut}</CommandPaletteItemMeta>
              ) : null}
            </CommandPaletteItem>
          ))}
        </CommandPaletteList>
        <CommandPaletteFooter>
          <span className={styles.footerHint}>
            <CommandPaletteKbd>Alt</CommandPaletteKbd> + <CommandPaletteKbd>K</CommandPaletteKbd>
          </span>
        </CommandPaletteFooter>
      </CommandPaletteShell>
    );
  },
};