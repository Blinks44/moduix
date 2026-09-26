import { useListCollection } from '@ark-ui/solid/collection';
import { useFilter } from '@ark-ui/solid/locale';
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
} from '@moduix/solid/command-palette';
import { For, createSignal } from 'solid-js';
import styles from '@/components/examples/command-palette/command-palette-item-actions.module.css';

const commandPaletteItems = [
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

export default function CommandPaletteActionsDemo() {
  const [lastAction, setLastAction] = createSignal('No command executed yet.');
  const actionItems = commandPaletteItems.map((item) => ({
    ...item,
    onSelect: () => setLastAction(`Executed: ${item.label}`),
  }));
  const filterOptions = useFilter({ sensitivity: 'base' });
  const collectionState = useListCollection({
    initialItems: actionItems,
    itemToString: (item) => `${item.label} ${item.description} ${item.section}`,
    itemToValue: (item) => item.id,
    filter: (itemText, filterText) => filterOptions().contains(itemText, filterText),
    groupBy: (item) => item.section,
  });

  return (
    <>
      <CommandPalette
        aria-label="Command palette with actions"
        onOpenChange={(details) => {
          if (!details.open) {
            collectionState.filter('');
          }
        }}
      >
        <CommandPaletteTrigger
          asChild={(triggerProps) => <Button {...triggerProps()}>Open actions palette</Button>}
        />
        <CommandPalettePanel class={styles.highlightPalette}>
          <CommandPaletteCombobox
            collection={collectionState.collection()}
            onInputValueChange={(details) => collectionState.filter(details.inputValue)}
            onSelect={(details) => {
              const selectedItem = actionItems.find((item) => item.id === details.itemValue);
              selectedItem?.onSelect();
            }}
          >
            <CommandPaletteSearch placeholder="Search and run commands..." />
            <CommandPaletteList>
              <CommandPaletteEmpty>No commands found.</CommandPaletteEmpty>
              <For each={collectionState.collection().group()}>
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
            </CommandPaletteFooter>
          </CommandPaletteCombobox>
        </CommandPalettePanel>
      </CommandPalette>
      <output>Last action: {lastAction()}</output>
    </>
  );
}