<script lang="ts">
  import { createListCollection } from '@ark-ui/svelte/collection';
  import {
    CommandPalette,
    CommandPaletteCombobox,
    CommandPaletteItem,
    CommandPaletteItemLabel,
    CommandPaletteItemMeta,
    CommandPaletteItemText,
    CommandPaletteList,
    CommandPalettePanel,
  } from '@/components/command-palette';

  const collection = createListCollection({
    items: [{ label: 'Open settings', value: 'settings' }],
  });
  const longLabel =
    'A long command label that has to be truncated before the trailing shortcut. '.repeat(3);
</script>

<CommandPalette defaultOpen aria-label="Command palette" portalled={false}>
  <CommandPalettePanel>
    <CommandPaletteCombobox {collection}>
      <CommandPaletteList>
        <CommandPaletteItem item={collection.items[0]}>
          <CommandPaletteItemText
            ><CommandPaletteItemLabel>{longLabel}</CommandPaletteItemLabel></CommandPaletteItemText
          >
          <CommandPaletteItemMeta>Ctrl K</CommandPaletteItemMeta>
        </CommandPaletteItem>
      </CommandPaletteList>
    </CommandPaletteCombobox>
  </CommandPalettePanel>
</CommandPalette>