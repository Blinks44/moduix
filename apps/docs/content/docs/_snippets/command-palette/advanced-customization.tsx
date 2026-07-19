//#region demo
import { useListCollection } from '@ark-ui/react/collection';
import { useFilter } from '@ark-ui/react/locale';
import { Button, CommandPalette } from '@moduix/react';

const commandItems = [
  {
    id: 'new-project',
    section: 'Create',
    label: 'New project',
    description: 'Start a blank workspace',
  },
  {
    id: 'recent',
    section: 'Navigate',
    label: 'Open recent work',
    description: 'Jump back to a recently edited file',
  },
  {
    id: 'preferences',
    section: 'Settings',
    label: 'Open preferences',
    description: 'Update workspace defaults',
  },
];

export function AdvancedCommandPalette() {
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
      aria-label="Custom command palette"
      onOpenChange={(details) => {
        if (!details.open) {
          filter('');
        }
      }}
    >
      <CommandPalette.Trigger asChild>
        <Button>Open custom palette</Button>
      </CommandPalette.Trigger>
      <CommandPalette.Backdrop />
      <CommandPalette.Positioner>
        <CommandPalette.Content className="commandPalette">
          <CommandPalette.Header>
            <CommandPalette.Title>Commands</CommandPalette.Title>
          </CommandPalette.Header>
          <CommandPalette.Body>
            <CommandPalette.Combobox
              collection={collection}
              onInputValueChange={(details) => filter(details.inputValue)}
            >
              <CommandPalette.Control>
                <CommandPalette.Input placeholder="Search commands..." />
                <CommandPalette.ClearTrigger />
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
                      </CommandPalette.Item>
                    ))}
                  </CommandPalette.ItemGroup>
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