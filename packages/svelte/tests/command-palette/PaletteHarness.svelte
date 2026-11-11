<script lang="ts">
  import { createListCollection } from '@ark-ui/svelte/collection';
  import {
    CommandPalette,
    CommandPaletteCombobox,
    CommandPaletteDescription,
    CommandPaletteItem,
    CommandPaletteList,
    CommandPalettePanel,
    CommandPaletteSearch,
    CommandPaletteTitle,
    type CommandPaletteComboboxProps,
    type CommandPaletteRootProps,
  } from '@/components/command-palette';

  type Command = { label: string; value: string };

  let {
    combobox = {},
    description,
    items = [{ label: 'Open settings', value: 'settings' }],
    root = { defaultOpen: true, 'aria-label': 'Command palette', portalled: false },
    title,
  }: {
    combobox?: Partial<CommandPaletteComboboxProps<Command>>;
    description?: string;
    items?: Command[];
    root?: CommandPaletteRootProps;
    title?: string;
  } = $props();

  const collection = $derived(createListCollection({ items }));
  let panelRef: Element | null = $state(null);
  let searchRef: Element | null = $state(null);
  let itemRef: Element | null = $state(null);

  export const getRefs = () => ({ panelRef, searchRef, itemRef });
</script>

<CommandPalette {...root}>
  <CommandPalettePanel bind:ref={panelRef}>
    {#if title}<CommandPaletteTitle>{title}</CommandPaletteTitle>{/if}
    {#if description}<CommandPaletteDescription>{description}</CommandPaletteDescription>{/if}
    <CommandPaletteCombobox {collection} {...combobox}>
      <CommandPaletteSearch bind:ref={searchRef} />
      <CommandPaletteList>
        {#each items as item, index (item.value)}
          {#if index === 0}
            <CommandPaletteItem bind:ref={itemRef} {item}>{item.label}</CommandPaletteItem>
          {:else}
            <CommandPaletteItem {item}>{item.label}</CommandPaletteItem>
          {/if}
        {/each}
      </CommandPaletteList>
    </CommandPaletteCombobox>
  </CommandPalettePanel>
</CommandPalette>