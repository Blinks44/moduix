<script lang="ts">
  import { createListCollection } from '@ark-ui/svelte/collection';
  import {
    CommandPalette,
    CommandPaletteCombobox,
    CommandPalettePanel,
    CommandPaletteSearch,
  } from '@/components/command-palette';

  const collection = createListCollection({
    items: [{ label: 'Open settings', value: 'settings' }],
  });
</script>

<CommandPalette defaultOpen aria-label="Command palette" portalled={false}>
  <CommandPalettePanel>
    <CommandPaletteCombobox {collection}>
      <CommandPaletteSearch />
    </CommandPaletteCombobox>
  </CommandPalettePanel>
</CommandPalette>