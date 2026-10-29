import { useListCollection } from '@ark-ui/react/collection';
import { useFilter } from '@ark-ui/react/locale';
import { Button } from '@moduix/react/button';
import {
  CommandPalette,
  CommandPaletteBackdrop,
  CommandPaletteClearTrigger,
  CommandPaletteCombobox,
  CommandPaletteContent,
  CommandPaletteControl,
  CommandPaletteEmpty,
  CommandPaletteInput,
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
  CommandPalettePositioner,
  CommandPaletteTrigger,
} from '@moduix/react/command-palette';
import {
  ArrowUpRight as ArrowUpRightIcon,
  Bell as BellIcon,
  Plus as PlusIcon,
  Search as SearchIcon,
  Star as StarIcon,
  X as XIcon,
} from 'lucide-react';
import styles from '@/components/examples/command-palette/command-palette-build-from-parts.module.css';

const commandItems = [
  {
    id: 'new-project',
    section: 'Create',
    label: 'New project',
    description: 'Start a blank workspace',
    shortcut: 'N',
    icon: <PlusIcon strokeWidth={3} />,
  },
  {
    id: 'invite-team',
    section: 'Create',
    label: 'Invite teammates',
    description: 'Send access to the current organization',
    shortcut: 'I',
    icon: <PlusIcon strokeWidth={3} />,
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

export default function BuildFromPartsCommandPaletteDemo() {
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
      onOpenChange={(details) => {
        if (!details.open) {
          filter('');
        }
      }}
    >
      <CommandPaletteTrigger asChild>
        <Button>Open palette</Button>
      </CommandPaletteTrigger>
      <CommandPaletteBackdrop />
      <CommandPalettePositioner>
        <CommandPaletteContent>
          <CommandPaletteCombobox
            collection={collection}
            onInputValueChange={(details) => filter(details.inputValue)}
          >
            <CommandPaletteControl>
              <SearchIcon aria-hidden="true" className={styles.searchIcon} />
              <CommandPaletteInput
                aria-label="Search commands"
                placeholder="Search commands, pages, and settings..."
              />
              <CommandPaletteClearTrigger>
                <XIcon strokeWidth={3} />
              </CommandPaletteClearTrigger>
            </CommandPaletteControl>
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
                        <CommandPaletteItemDescription>
                          {item.description}
                        </CommandPaletteItemDescription>
                      </CommandPaletteItemText>
                      {item.shortcut ? (
                        <CommandPaletteItemMeta>{item.shortcut}</CommandPaletteItemMeta>
                      ) : null}
                    </CommandPaletteItem>
                  ))}
                </CommandPaletteItemGroup>
              ))}
            </CommandPaletteList>
            <div className={styles.footer}>
              <span>
                <CommandPaletteKbd>Enter</CommandPaletteKbd> run
              </span>
              <span>
                <CommandPaletteKbd>Esc</CommandPaletteKbd> close
              </span>
            </div>
          </CommandPaletteCombobox>
        </CommandPaletteContent>
      </CommandPalettePositioner>
    </CommandPalette>
  );
}