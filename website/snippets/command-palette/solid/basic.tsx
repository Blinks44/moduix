import { Button } from '@moduix/solid/button';
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
  useFilteredCollection,
} from '@moduix/solid/command-palette';
import { For } from 'solid-js';

const commandItems = [
  {
    id: 'new-project',
    section: 'Create',
    label: 'New project',
    description: 'Start a blank workspace',
    shortcut: 'N',
    icon: '＋',
  },
  {
    id: 'invite-team',
    section: 'Create',
    label: 'Invite teammates',
    description: 'Send access to the current organization',
    shortcut: 'I',
    icon: '＋',
  },
  {
    id: 'recent',
    section: 'Navigate',
    label: 'Open recent work',
    description: 'Jump back to a recently edited file',
    shortcut: '↗',
    icon: '↗',
  },
  {
    id: 'favorites',
    section: 'Navigate',
    label: 'View favorites',
    description: 'Show pinned dashboards and docs',
    shortcut: 'F',
    icon: '★',
  },
  {
    id: 'notifications',
    section: 'System',
    label: 'Notification settings',
    description: 'Tune email and product alerts',
    icon: '•',
  },
  {
    id: 'release-notes',
    section: 'System',
    label: 'Release notes',
    description: 'Read the latest product changes',
    icon: '↗',
  },
];

export default function CommandPaletteDemo() {
  const { collection, filter } = useFilteredCollection({
    initialItems: commandItems,
    itemToString: (item) => `${item.label} ${item.description} ${item.section}`,
    itemToValue: (item) => item.id,
    groupBy: (item) => item.section,
  });

  return (
    <CommandPalette aria-label="Command palette">
      <CommandPaletteTrigger
        asChild={(triggerProps) => <Button {...triggerProps()}>Open palette</Button>}
      />
      <CommandPalettePanel>
        <CommandPaletteCombobox collection={collection()} filter={filter}>
          <CommandPaletteSearch placeholder="Search commands, pages, and settings..." />
          <CommandPaletteList>
            <CommandPaletteEmpty>No commands found.</CommandPaletteEmpty>
            <For each={collection().group()}>
              {([section, items]) => (
                <CommandPaletteItemGroup>
                  <CommandPaletteItemGroupLabel>{section}</CommandPaletteItemGroupLabel>
                  <For each={items}>
                    {(item) => (
                      <CommandPaletteItem item={item}>
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
                  </For>
                </CommandPaletteItemGroup>
              )}
            </For>
          </CommandPaletteList>
          <CommandPaletteFooter>
            <span>
              <CommandPaletteKbd>Enter</CommandPaletteKbd> run
            </span>
            <span>
              <CommandPaletteKbd>Esc</CommandPaletteKbd> close
            </span>
          </CommandPaletteFooter>
        </CommandPaletteCombobox>
      </CommandPalettePanel>
    </CommandPalette>
  );
}