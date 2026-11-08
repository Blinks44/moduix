<script lang="ts" generics="T extends CommandItem">
  import type { ListCollection } from '@ark-ui/svelte/collection';
  import type { Snippet } from 'svelte';
  import { Button } from '@/components/button';
  import {
    CommandPalette,
    CommandPaletteCombobox,
    CommandPalettePanel,
    CommandPaletteSearch,
    CommandPaletteTrigger,
  } from '@/components/command-palette';
  import type { CommandItem } from './commandItems';

  let {
    children,
    collection,
    filter,
    label,
    onOpenChange,
    onSelect,
    placeholder,
    shortcut = false,
    trigger,
  }: {
    children?: Snippet;
    collection: ListCollection<T>;
    filter: (value: string) => void;
    label: string;
    onOpenChange?: (details: { open: boolean }) => void;
    onSelect?: (details: { itemValue: string }) => void;
    placeholder: string;
    shortcut?: false | string;
    trigger: Snippet;
  } = $props();
</script>

<CommandPalette aria-label={label} {shortcut} {onOpenChange}>
  <CommandPaletteTrigger>
    {#snippet asChild(triggerProps)}<Button {...triggerProps()}>{@render trigger()}</Button
      >{/snippet}
  </CommandPaletteTrigger>
  <CommandPalettePanel>
    <CommandPaletteCombobox
      {collection}
      onInputValueChange={(details) => filter(details.inputValue)}
      {onSelect}
    >
      <CommandPaletteSearch {placeholder} />
      {@render children?.()}
    </CommandPaletteCombobox>
  </CommandPalettePanel>
</CommandPalette>