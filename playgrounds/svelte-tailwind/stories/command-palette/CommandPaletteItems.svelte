<script lang="ts">
  import {
    CommandPaletteEmpty,
    CommandPaletteItem,
    CommandPaletteItemDescription,
    CommandPaletteItemGroup,
    CommandPaletteItemGroupLabel,
    CommandPaletteItemIcon,
    CommandPaletteItemLabel,
    CommandPaletteItemMeta,
    CommandPaletteItemText,
    CommandPaletteList,
  } from '@/components/command-palette';
  import type { CommandItem } from './commandItems';

  let { groups }: { groups: [string, CommandItem[]][] } = $props();
</script>

<CommandPaletteList>
  <CommandPaletteEmpty>No commands found.</CommandPaletteEmpty>
  {#each groups as [section, items] (section)}
    <CommandPaletteItemGroup>
      <CommandPaletteItemGroupLabel>{section}</CommandPaletteItemGroupLabel>
      {#each items as item (item.id)}
        <CommandPaletteItem {item}>
          <CommandPaletteItemIcon><item.icon /></CommandPaletteItemIcon>
          <CommandPaletteItemText>
            <CommandPaletteItemLabel>{item.label}</CommandPaletteItemLabel>
            <CommandPaletteItemDescription>{item.description}</CommandPaletteItemDescription>
          </CommandPaletteItemText>
          {#if item.shortcut}<CommandPaletteItemMeta>{item.shortcut}</CommandPaletteItemMeta>{/if}
        </CommandPaletteItem>
      {/each}
    </CommandPaletteItemGroup>
  {/each}
</CommandPaletteList>