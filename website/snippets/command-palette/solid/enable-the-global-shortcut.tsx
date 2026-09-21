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
import { For } from 'solid-js';
import styles from '@/components/examples/command-palette/command-palette-enable-the-global-shortcut.module.css';

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

export default function CommandPaletteShortcutDemo() {
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
      aria-label="Command palette"
      shortcut="alt+k"
      onOpenChange={(details) => {
        if (!details.open) {
          collectionState.filter('');
        }
      }}
    >
      <CommandPaletteTrigger
        asChild={(triggerProps) => (
          <Button {...triggerProps()} class={styles.shortcutTrigger}>
            Open palette
          </Button>
        )}
      />
      <CommandPalettePanel>
        <CommandPaletteCombobox
          collection={collectionState.collection()}
          onInputValueChange={(details) => collectionState.filter(details.inputValue)}
        >
          <CommandPaletteSearch placeholder="Search commands..." />
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
              <CommandPaletteKbd>Alt</CommandPaletteKbd> + <CommandPaletteKbd>K</CommandPaletteKbd>
            </span>
          </CommandPaletteFooter>
        </CommandPaletteCombobox>
      </CommandPalettePanel>
    </CommandPalette>
  );
}