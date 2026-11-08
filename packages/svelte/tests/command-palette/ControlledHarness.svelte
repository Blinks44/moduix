<script lang="ts">
  import { createListCollection } from '@ark-ui/svelte/collection';
  import {
    CommandPalette,
    CommandPaletteCombobox,
    CommandPaletteItem,
    CommandPaletteList,
    CommandPalettePanel,
    CommandPaletteSearch,
    CommandPaletteTrigger,
  } from '@/components/command-palette';

  let { details }: { details: { open: boolean }[] } = $props();
  const collection = createListCollection({
    items: [{ label: 'Open settings', value: 'settings' }],
  });
  let open = $state(false);

  export const getOpen = () => open;
</script>

<CommandPalette
  bind:open
  aria-label="Controlled palette"
  portalled={false}
  onOpenChange={(detail) => details.push({ open: detail.open })}
>
  <CommandPaletteTrigger>Open palette</CommandPaletteTrigger>
  <CommandPalettePanel>
    <CommandPaletteCombobox {collection}>
      <CommandPaletteSearch />
      <CommandPaletteList>
        <CommandPaletteItem item={collection.items[0]}>Open settings</CommandPaletteItem>
      </CommandPaletteList>
    </CommandPaletteCombobox>
  </CommandPalettePanel>
</CommandPalette>