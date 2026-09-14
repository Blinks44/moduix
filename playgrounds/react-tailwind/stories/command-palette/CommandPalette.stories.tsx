import type { ListCollection } from '@ark-ui/react/collection';
import { useListCollection } from '@ark-ui/react/collection';
import { useFilter } from '@ark-ui/react/locale';
import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ReactNode } from 'react';
import { useState } from 'react';
import { Button } from '@/components/button';
import { CommandPalette } from '@/components/command-palette/CommandPalette';
import { PlusIcon } from '@/lib/moduix/icons/ui';

function ArrowUpRightIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
      <path
        d="M7 17 17 7M9 7h8v8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
      <path
        d="M12 3.75 14.7 9.22l5.93.86-4.29 4.18 1.01 5.9L12 17.32l-5.35 2.84 1.02-5.9-4.3-4.18 5.94-.86L12 3.75Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

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
            Open palette <span className="text-muted-foreground">Alt+K</span>
          </>
        }
      >
        <CommandPaletteItems collection={collection} />
        <CommandPalette.Footer>
          <span className="inline-flex min-w-0 items-center gap-1">
            <CommandPalette.Kbd>Enter</CommandPalette.Kbd> run
          </span>
          <span className="inline-flex min-w-0 items-center gap-1">
            <CommandPalette.Kbd>Esc</CommandPalette.Kbd> close
          </span>
        </CommandPalette.Footer>
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
        <CommandPalette.Footer>
          <span className="inline-flex min-w-0 items-center gap-1">
            <CommandPalette.Kbd>Enter</CommandPalette.Kbd> run
          </span>
          <span className="inline-flex min-w-0 items-center gap-1">{lastCommand}</span>
        </CommandPalette.Footer>
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
        <CommandPalette.List>
          <CommandPalette.Empty>No commands found.</CommandPalette.Empty>
          {collection.items.map((item) => (
            <CommandPalette.Item key={item.id} item={item}>
              <CommandPalette.ItemText>
                <CommandPalette.ItemLabel>{item.label}</CommandPalette.ItemLabel>
                <CommandPalette.ItemDescription>{item.description}</CommandPalette.ItemDescription>
              </CommandPalette.ItemText>
              {item.shortcut ? (
                <CommandPalette.ItemMeta>{item.shortcut}</CommandPalette.ItemMeta>
              ) : null}
            </CommandPalette.Item>
          ))}
        </CommandPalette.List>
        <CommandPalette.Footer>
          <span className="inline-flex min-w-0 items-center gap-1">
            <CommandPalette.Kbd>Alt</CommandPalette.Kbd> +{' '}
            <CommandPalette.Kbd>K</CommandPalette.Kbd>
          </span>
        </CommandPalette.Footer>
      </CommandPaletteShell>
    );
  },
};