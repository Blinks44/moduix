import { useListCollection } from '@ark-ui/react/collection';
import { useFilter } from '@ark-ui/react/locale';
//#region demo
import { Button, CommandPalette } from '@moduix/react';

const commandItems = [
  { id: 'recent', label: 'Open recent work' },
  { id: 'search', label: 'Search documentation' },
  { id: 'settings', label: 'Open settings' },
];

export function CommandPaletteShortcutDemo() {
  const { contains } = useFilter({ sensitivity: 'base' });
  const { collection, filter } = useListCollection({
    initialItems: commandItems,
    itemToString: (item) => item.label,
    itemToValue: (item) => item.id,
    filter: contains,
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
      <CommandPalette.Panel>
        <CommandPalette.Combobox
          collection={collection}
          onInputValueChange={(details) => filter(details.inputValue)}
        >
          <CommandPalette.Search />
          <CommandPalette.List>
            <CommandPalette.Empty>No commands found.</CommandPalette.Empty>
            {collection.items.map((item) => (
              <CommandPalette.Item key={item.id} item={item}>
                <CommandPalette.ItemText>{item.label}</CommandPalette.ItemText>
              </CommandPalette.Item>
            ))}
          </CommandPalette.List>
        </CommandPalette.Combobox>
      </CommandPalette.Panel>
    </CommandPalette>
  );
}
//#endregion