import { useListCollection } from '@ark-ui/react/collection';
import { useFilter } from '@ark-ui/react/locale';
import { Button } from '@moduix/react/button';
import {
  CommandPalette,
  CommandPaletteCombobox,
  CommandPaletteEmpty,
  CommandPaletteItem,
  CommandPaletteItemDescription,
  CommandPaletteItemGroup,
  CommandPaletteItemGroupLabel,
  CommandPaletteItemIcon,
  CommandPaletteItemLabel,
  CommandPaletteItemMeta,
  CommandPaletteItemText,
  CommandPaletteList,
  CommandPalettePanel,
  CommandPaletteSearch,
  CommandPaletteTrigger,
} from '@moduix/react/command-palette';
import { useState } from 'react';
import { commandPaletteItems } from '@/components/examples/command-palette/command-palette-items';
import styles from '@/components/examples/command-palette/command-palette-controlled-open-state.module.css';

export default function ControlledCommandPalette() {
  const [open, setOpen] = useState(false);
  const { contains } = useFilter({ sensitivity: 'base' });
  const { collection, filter } = useListCollection({
    initialItems: commandPaletteItems,
    itemToString: (item) => `${item.label} ${item.description} ${item.section}`,
    itemToValue: (item) => item.id,
    filter: contains,
    groupBy: (item) => item.section,
  });

  return (
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
      <CommandPaletteTrigger asChild>
        <Button>Search actions</Button>
      </CommandPaletteTrigger>
      <CommandPalettePanel className={styles.compactPalette}>
        <CommandPaletteCombobox
          collection={collection}
          onInputValueChange={(details) => filter(details.inputValue)}
        >
          <CommandPaletteSearch placeholder="Search controlled commands..." />
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
        </CommandPaletteCombobox>
      </CommandPalettePanel>
    </CommandPalette>
  );
}