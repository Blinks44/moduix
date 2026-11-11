<script lang="ts">
  import { createListCollection } from '@ark-ui/svelte/collection';
  import {
    CommandPalette,
    CommandPaletteCombobox,
    CommandPaletteItem,
    CommandPaletteList,
    CommandPalettePanel,
    CommandPaletteSearch,
  } from '@/components/command-palette';

  const collection = createListCollection({
    items: [{ label: 'Open settings', value: 'settings' }],
  });
</script>

<div>
  <input aria-label="Editable target" />
  <button type="button">Shortcut target</button>
  <CommandPalette aria-label="Command palette" portalled={false} shortcut="alt+k">
    <CommandPalettePanel>
      <CommandPaletteCombobox {collection}>
        <CommandPaletteSearch />
        <CommandPaletteList>
          <CommandPaletteItem item={collection.items[0]}>Open settings</CommandPaletteItem>
        </CommandPaletteList>
      </CommandPaletteCombobox>
    </CommandPalettePanel>
  </CommandPalette>
</div>