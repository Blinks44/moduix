import { useListCollection } from '@ark-ui/react/collection';
import { useFilter } from '@ark-ui/react/locale';
import { Button, CommandPalette } from '@moduix/react';
import { useState } from 'react';
import { commandPaletteItems } from '@/components/examples/command-palette-items';
import styles from '@/components/examples/command-palette.module.css';

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
      <CommandPalette.Trigger asChild>
        <Button>Search actions</Button>
      </CommandPalette.Trigger>
      <CommandPalette.Panel className={styles.compactPalette}>
        <CommandPalette.Combobox
          collection={collection}
          onInputValueChange={(details) => filter(details.inputValue)}
        >
          <CommandPalette.Search placeholder="Search controlled commands..." />
          <CommandPalette.List>
            <CommandPalette.Empty>No commands found.</CommandPalette.Empty>
            {collection.group().map(([section, items]) => (
              <CommandPalette.ItemGroup key={section}>
                <CommandPalette.ItemGroupLabel>{section}</CommandPalette.ItemGroupLabel>
                {items.map((item) => (
                  <CommandPalette.Item key={item.id} item={item}>
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
                ))}
              </CommandPalette.ItemGroup>
            ))}
          </CommandPalette.List>
        </CommandPalette.Combobox>
      </CommandPalette.Panel>
    </CommandPalette>
  );
}