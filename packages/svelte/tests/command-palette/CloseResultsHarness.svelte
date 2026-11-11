<script lang="ts">
  import { createListCollection } from '@ark-ui/svelte/collection';
  import {
    CommandPalette,
    CommandPaletteCombobox,
    CommandPaletteList,
    CommandPalettePanel,
    CommandPaletteSearch,
  } from '@/components/command-palette';

  const collection = createListCollection({
    items: [{ label: 'Open settings', value: 'settings' }],
  });
  let comboboxOpen = $state(true);
</script>

<CommandPalette defaultOpen aria-label="Command palette" portalled={false}>
  <CommandPalettePanel>
    <button type="button" onclick={() => (comboboxOpen = false)}>Close results</button>
    <CommandPaletteCombobox {collection} open={comboboxOpen}>
      <CommandPaletteSearch />
      <CommandPaletteList />
    </CommandPaletteCombobox>
  </CommandPalettePanel>
</CommandPalette>