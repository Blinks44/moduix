import { useListCollection } from '@ark-ui/react/collection';
import { useFilter } from '@ark-ui/react/locale';
import { Button } from '@moduix/react/button';
import {
  CommandPalette,
  CommandPaletteBackdrop,
  CommandPaletteBody,
  CommandPaletteClearTrigger,
  CommandPaletteCombobox,
  CommandPaletteContent,
  CommandPaletteControl,
  CommandPaletteEmpty,
  CommandPaletteHeader,
  CommandPaletteInput,
  CommandPaletteItem,
  CommandPaletteItemDescription,
  CommandPaletteItemGroup,
  CommandPaletteItemGroupLabel,
  CommandPaletteItemIcon,
  CommandPaletteItemLabel,
  CommandPaletteItemMeta,
  CommandPaletteItemText,
  CommandPaletteList,
  CommandPalettePositioner,
  CommandPaletteTitle,
  CommandPaletteTrigger,
} from '@moduix/react/command-palette';
import { commandPaletteItems } from '@/components/examples/command-palette/command-palette-items';
import styles from '@/components/examples/command-palette/command-palette-advanced-customization.module.css';

export default function AdvancedCommandPalette() {
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
      aria-label="Custom command palette"
      onOpenChange={(details) => {
        if (!details.open) {
          filter('');
        }
      }}
    >
      <CommandPaletteTrigger asChild>
        <Button>Open custom palette</Button>
      </CommandPaletteTrigger>
      <CommandPaletteBackdrop />
      <CommandPalettePositioner>
        <CommandPaletteContent className={styles.compactPalette}>
          <CommandPaletteHeader>
            <CommandPaletteTitle>Commands</CommandPaletteTitle>
          </CommandPaletteHeader>
          <CommandPaletteBody>
            <CommandPaletteCombobox
              collection={collection}
              onInputValueChange={(details) => filter(details.inputValue)}
            >
              <CommandPaletteControl>
                <CommandPaletteInput
                  aria-label="Search commands"
                  placeholder="Search commands..."
                />
                <CommandPaletteClearTrigger />
              </CommandPaletteControl>
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
          </CommandPaletteBody>
        </CommandPaletteContent>
      </CommandPalettePositioner>
    </CommandPalette>
  );
}