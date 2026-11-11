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

  let { onSelect }: { onSelect: (details: unknown) => void } = $props();
  const collection = createListCollection({
    items: [
      { label: 'Open settings', value: 'settings' },
      { label: 'Open files', value: 'files' },
    ],
  });
  let closeOnSelect = $state(false);

  export const setCloseOnSelect = (value: boolean) => (closeOnSelect = value);
</script>

<CommandPalette defaultOpen portalled={false} aria-label="Selection events">
  <CommandPalettePanel>
    <CommandPaletteCombobox {collection} {closeOnSelect} {onSelect}>
      <CommandPaletteSearch />
      <CommandPaletteList>
        {#each collection.items as item (item.value)}
          <CommandPaletteItem {item}>{item.label}</CommandPaletteItem>
        {/each}
      </CommandPaletteList>
    </CommandPaletteCombobox>
  </CommandPalettePanel>
</CommandPalette>