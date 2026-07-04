import { useListCollection } from '@ark-ui/react/collection';
import { useFilter } from '@ark-ui/react/locale';
//#region demo
import { Button, CommandPalette } from '@moduix/react';
import { useState } from 'react';

const commandItems = [
  {
    id: 'release-notes',
    section: 'System',
    label: 'Release notes',
    description: 'Read the latest product changes',
    shortcut: 'R',
  },
];

export function CommandPaletteActionsDemo() {
  const [lastAction, setLastAction] = useState('No command executed yet.');
  const actionItems = commandItems.map((item) => ({
    ...item,
    onSelect: () => setLastAction(`Executed: ${item.label}`),
  }));
  const { contains } = useFilter({ sensitivity: 'base' });
  const { collection, filter } = useListCollection({
    initialItems: actionItems,
    itemToString: (item) => `${item.label} ${item.description} ${item.section}`,
    itemToValue: (item) => item.id,
    filter: contains,
    groupBy: (item) => item.section,
  });

  return (
    <CommandPalette
      aria-label="Command palette with actions"
      onOpenChange={(details) => {
        if (!details.open) {
          filter('');
        }
      }}
    >
      <CommandPalette.Trigger asChild>
        <Button>Open actions palette</Button>
      </CommandPalette.Trigger>
      <CommandPalette.Backdrop />
      <CommandPalette.Positioner>
        <CommandPalette.Content>
          <CommandPalette.Combobox
            collection={collection}
            onInputValueChange={(details) => filter(details.inputValue)}
            onSelect={(details) => {
              const selectedItem = collection.items.find((item) => item.id === details.itemValue);
              selectedItem?.onSelect();
            }}
          >
            <CommandPalette.Control>
              <CommandPalette.Input
                aria-label="Search commands"
                placeholder="Search and run commands..."
              />
              <CommandPalette.ClearTrigger aria-label="Clear search" />
            </CommandPalette.Control>
            <CommandPalette.List>
              <CommandPalette.Empty>No commands found.</CommandPalette.Empty>
              {collection.group().map(([section, items]) => (
                <CommandPalette.ItemGroup key={section}>
                  <CommandPalette.ItemGroupLabel>{section}</CommandPalette.ItemGroupLabel>
                  {items.map((item) => (
                    <CommandPalette.Item key={item.id} item={item}>
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
              <span>{lastAction}</span>
            </CommandPalette.Footer>
          </CommandPalette.Combobox>
        </CommandPalette.Content>
      </CommandPalette.Positioner>
    </CommandPalette>
  );
}
//#endregion