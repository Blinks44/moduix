import { useListCollection } from '@ark-ui/solid/collection';
import { useFilter } from '@ark-ui/solid/locale';
import { Button } from '@moduix/solid/button';
import { CommandPalette } from '@moduix/solid/command-palette';
import { For } from 'solid-js';
import styles from '@/components/examples/command-palette/command-palette-advanced-customization.module.css';

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
    id: 'recent',
    section: 'Navigate',
    label: 'Open recent work',
    description: 'Jump back to a recently edited file',
    shortcut: 'R',
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
    id: 'settings',
    section: 'System',
    label: 'Notification settings',
    description: 'Tune email and product alerts',
    icon: '•',
  },
];

export default function AdvancedCommandPalette() {
  const filterOptions = useFilter({ sensitivity: 'base' });
  const collectionState = useListCollection({
    initialItems: commandItems,
    itemToString: (item) => `${item.label} ${item.description} ${item.section}`,
    itemToValue: (item) => item.id,
    filter: (itemText, filterText) => filterOptions().contains(itemText, filterText),
    groupBy: (item) => item.section,
  });

  return (
    <CommandPalette
      aria-label="Custom command palette"
      onOpenChange={(details) => {
        if (!details.open) {
          collectionState.filter('');
        }
      }}
    >
      <CommandPalette.Trigger
        asChild={(triggerProps) => <Button {...triggerProps()}>Open custom palette</Button>}
      />
      <CommandPalette.Backdrop />
      <CommandPalette.Positioner>
        <CommandPalette.Content class={styles.compactPalette}>
          <CommandPalette.Header>
            <CommandPalette.Title>Commands</CommandPalette.Title>
          </CommandPalette.Header>
          <CommandPalette.Body>
            <CommandPalette.Combobox
              collection={collectionState.collection()}
              onInputValueChange={(details) => collectionState.filter(details.inputValue)}
            >
              <CommandPalette.Control>
                <CommandPalette.Input
                  aria-label="Search commands"
                  placeholder="Search commands..."
                />
                <CommandPalette.ClearTrigger />
              </CommandPalette.Control>
              <CommandPalette.List>
                <CommandPalette.Empty>No commands found.</CommandPalette.Empty>
                <For each={collectionState.collection().group()}>
                  {([section, items]) => (
                    <CommandPalette.ItemGroup>
                      <CommandPalette.ItemGroupLabel>{section}</CommandPalette.ItemGroupLabel>
                      <For each={items}>
                        {(item) => (
                          <CommandPalette.Item item={item}>
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
                        )}
                      </For>
                    </CommandPalette.ItemGroup>
                  )}
                </For>
              </CommandPalette.List>
            </CommandPalette.Combobox>
          </CommandPalette.Body>
        </CommandPalette.Content>
      </CommandPalette.Positioner>
    </CommandPalette>
  );
}