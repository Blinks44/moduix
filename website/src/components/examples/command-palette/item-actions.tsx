import { useListCollection } from '@ark-ui/react/collection';
import { useFilter } from '@ark-ui/react/locale';
import { Button } from '@moduix/react/button';
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
} from '@moduix/react/command-palette';
import { useState } from 'react';
import { commandPaletteItems } from '@/components/examples/command-palette/command-palette-items';
import { PreviewMeta } from '@/components/mdx/Components';
import styles from '@/components/examples/command-palette/command-palette-item-actions.module.css';

export default function CommandPaletteActionsDemo() {
  const [lastAction, setLastAction] = useState('No command executed yet.');
  const actionItems = commandPaletteItems.map((item) => ({
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
    <>
      <CommandPalette
        aria-label="Command palette with actions"
        onOpenChange={(details) => {
          if (!details.open) {
            filter('');
          }
        }}
      >
        <CommandPaletteTrigger asChild>
          <Button>Open actions palette</Button>
        </CommandPaletteTrigger>
        <CommandPalettePanel className={styles.highlightPalette}>
          <CommandPaletteCombobox
            collection={collection}
            onInputValueChange={(details) => filter(details.inputValue)}
            onSelect={(details) => {
              const selectedItem = actionItems.find((item) => item.id === details.itemValue);
              selectedItem?.onSelect();
            }}
          >
            <CommandPaletteSearch placeholder="Search and run commands..." />
            <CommandPaletteList>
              <CommandPaletteEmpty>No commands found.</CommandPaletteEmpty>
              {collection.group().map(([section, items]) => (
                <CommandPaletteItemGroup key={section}>
                  <CommandPaletteItemGroupLabel>{section}</CommandPaletteItemGroupLabel>
                  {items.map((item) => (
                    <CommandPaletteItem key={item.id} item={item}>
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
                  ))}
                </CommandPaletteItemGroup>
              ))}
            </CommandPaletteList>
            <CommandPaletteFooter>
              <span>
                <CommandPaletteKbd>Enter</CommandPaletteKbd> run
              </span>
            </CommandPaletteFooter>
          </CommandPaletteCombobox>
        </CommandPalettePanel>
      </CommandPalette>
      <PreviewMeta>
        <output>Last action: {lastAction}</output>
      </PreviewMeta>
    </>
  );
}