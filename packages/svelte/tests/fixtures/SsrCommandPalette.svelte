<script lang="ts">
  import { createListCollection } from '@ark-ui/svelte/collection';
  import {
    CommandPalette,
    CommandPaletteCombobox,
    CommandPaletteItem,
    CommandPaletteList,
    CommandPalettePanel,
    CommandPaletteSearch,
    CommandPaletteTitle,
  } from '@/components/command-palette';

  const collection = createListCollection({
    items: [{ label: 'Open settings', value: 'settings' }],
  });
</script>

<CommandPalette defaultOpen aria-label="Server palette" portalled={false}>
  <CommandPalettePanel>
    <CommandPaletteTitle>Server palette</CommandPaletteTitle>
    <CommandPaletteCombobox {collection}>
      <CommandPaletteSearch />
      <CommandPaletteList>
        <CommandPaletteItem item={collection.items[0]}>Open settings</CommandPaletteItem>
      </CommandPaletteList>
    </CommandPaletteCombobox>
  </CommandPalettePanel>
</CommandPalette>