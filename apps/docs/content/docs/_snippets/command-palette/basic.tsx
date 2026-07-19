//#region demo
import { useListCollection } from '@ark-ui/react/collection';
import { useFilter } from '@ark-ui/react/locale';
import { Button, CommandPalette } from '@moduix/react';
import { ArrowUpRight as ArrowUpRightIcon, Bell as BellIcon, Plus as PlusIcon } from 'lucide-react';

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
    id: 'recent',
    section: 'Navigate',
    label: 'Open recent work',
    description: 'Jump back to a recently edited file',
    shortcut: 'R',
    icon: <ArrowUpRightIcon />,
  },
  {
    id: 'notifications',
    section: 'System',
    label: 'Notification settings',
    description: 'Tune email and product alerts',
    icon: <BellIcon />,
  },
];

export function CommandPaletteDemo() {
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
      <CommandPalette.Panel className="commandPalette">
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
//#endregion