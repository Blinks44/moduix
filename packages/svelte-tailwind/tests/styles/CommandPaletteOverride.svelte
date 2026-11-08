<script lang="ts">
  import { createListCollection } from '@ark-ui/svelte/collection';
  import {
    CommandPalette,
    CommandPaletteCombobox,
    CommandPaletteItem,
    CommandPaletteItemDescription,
    CommandPaletteItemIcon,
    CommandPaletteItemLabel,
    CommandPaletteItemMeta,
    CommandPaletteItemText,
    CommandPaletteKbd,
    CommandPaletteList,
    CommandPalettePanel,
    CommandPaletteSearch,
  } from '@/components/command-palette';

  const collection = createListCollection({
    items: [{ label: 'Open settings', value: 'settings' }],
  });
</script>

<CommandPalette defaultOpen aria-label="Command palette" portalled={false}>
  <CommandPalettePanel class="max-h-96">
    <CommandPaletteCombobox {collection}>
      <CommandPaletteSearch />
      <CommandPaletteList class="p-0">
        <CommandPaletteItem class="rounded-none px-0" item={collection.items[0]}>
          <CommandPaletteItemIcon />
          <CommandPaletteItemText>
            <CommandPaletteItemLabel>Open settings</CommandPaletteItemLabel>
            <CommandPaletteItemDescription>Open app settings</CommandPaletteItemDescription>
          </CommandPaletteItemText>
          <CommandPaletteItemMeta>⌘K</CommandPaletteItemMeta>
        </CommandPaletteItem>
      </CommandPaletteList>
      <CommandPaletteKbd data-testid="command-kbd">Enter</CommandPaletteKbd>
    </CommandPaletteCombobox>
  </CommandPalettePanel>
</CommandPalette>