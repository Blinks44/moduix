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
      <CommandPalette.Backdrop />
      <CommandPalette.Positioner>
        <CommandPalette.Content>
          <CommandPalette.CloseIcon />
          <CommandPalette.Header>
            <CommandPalette.Title>Command palette</CommandPalette.Title>
            <CommandPalette.Description>
              Open this palette from the button or with Alt+K.
            </CommandPalette.Description>
          </CommandPalette.Header>
          <CommandPalette.Body>
            <CommandPalette.Combobox
              collection={collection}
              onInputValueChange={(details) => filter(details.inputValue)}
            >
              <CommandPalette.Control>
                <CommandPalette.Input aria-label="Search commands" />
                <CommandPalette.ClearTrigger aria-label="Clear search" />
              </CommandPalette.Control>
              <CommandPalette.List>
                <CommandPalette.Empty>No commands found.</CommandPalette.Empty>
                {collection.items.map((item) => (
                  <CommandPalette.Item key={item.id} item={item}>
                    <CommandPalette.ItemText>{item.label}</CommandPalette.ItemText>
                  </CommandPalette.Item>
                ))}
              </CommandPalette.List>
            </CommandPalette.Combobox>
          </CommandPalette.Body>
        </CommandPalette.Content>
      </CommandPalette.Positioner>
    </CommandPalette>
  );
}
//#endregion