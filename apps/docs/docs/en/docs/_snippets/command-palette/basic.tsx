import { useListCollection } from '@ark-ui/react/collection';
import { useFilter } from '@ark-ui/react/locale';
import { Button, CommandPalette } from '@moduix/react';
import {
  ArrowUpRight as ArrowUpRightIcon,
  Bell as BellIcon,
  Plus as PlusIcon,
  Star as StarIcon,
} from 'lucide-react';
import styles from '@/components/examples/command-palette.module.css';

const commandItems = [
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

export default function CommandPaletteDemo() {
  const { contains } = useFilter({ sensitivity: 'base' });
  const { collection, filter } = useListCollection({
    initialItems: commandItems,
    itemToString: (item) => `${item.label} ${item.description} ${item.section}`,
    itemToValue: (item) => item.id,
    filter: contains,
    groupBy: (item) => item.section,
  });

  return (
    <CommandPalette
      aria-label="Command palette"
      shortcut="alt+k"
      onOpenChange={(details) => {
        if (!details.open) {
          filter('');
        }
      }}
    >
      <CommandPalette.Trigger asChild>
        <Button>Open palette</Button>
      </CommandPalette.Trigger>
      <CommandPalette.Panel className={styles.palette}>
        <CommandPalette.Combobox
          collection={collection}
          onInputValueChange={(details) => filter(details.inputValue)}
        >
          <CommandPalette.Search placeholder="Search commands, pages, and settings..." />
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
            <span>
              <CommandPalette.Kbd>Esc</CommandPalette.Kbd> close
            </span>
          </CommandPalette.Footer>
        </CommandPalette.Combobox>
      </CommandPalette.Panel>
    </CommandPalette>
  );
}