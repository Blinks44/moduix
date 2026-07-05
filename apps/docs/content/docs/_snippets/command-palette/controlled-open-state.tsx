import { useListCollection } from '@ark-ui/react/collection';
import { useFilter } from '@ark-ui/react/locale';
//#region demo
import { Button, CommandPalette } from '@moduix/react';
import { useState } from 'react';

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

export function ControlledCommandPalette() {
  const [open, setOpen] = useState(false);
  const { contains } = useFilter({ sensitivity: 'base' });
  const { collection, filter } = useListCollection({
    initialItems: commandItems,
    itemToString: (item) => `${item.label} ${item.description} ${item.section}`,
    itemToValue: (item) => item.id,
    filter: contains,
    groupBy: (item) => item.section,
  });

  return (
    <>
      <Button type="button" onClick={() => setOpen(true)}>
        Search actions
      </Button>
      <CommandPalette
        aria-label="Controlled command palette"
        open={open}
        onOpenChange={(details) => {
          setOpen(details.open);

          if (!details.open) {
            filter('');
          }
        }}
      >
        <CommandPalette.Backdrop />
        <CommandPalette.Positioner>
          <CommandPalette.Content className="commandPalette">
            <CommandPalette.CloseIcon />
            <CommandPalette.Header>
              <CommandPalette.Title>Controlled command palette</CommandPalette.Title>
              <CommandPalette.Description>
                Coordinate the palette open state with surrounding React state.
              </CommandPalette.Description>
            </CommandPalette.Header>
            <CommandPalette.Body>
              <CommandPalette.Combobox
                collection={collection}
                onInputValueChange={(details) => filter(details.inputValue)}
              >
                <CommandPalette.Control>
                  <CommandPalette.Input
                    aria-label="Search commands"
                    placeholder="Search controlled commands..."
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
    </>
  );
}
//#endregion