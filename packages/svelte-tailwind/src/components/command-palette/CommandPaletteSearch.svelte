<script lang="ts">
  import type { ComboboxInputProps } from '@ark-ui/svelte/combobox';
  import { a11yLabels } from '@/lib/moduix/a11yLabels';
  import { SearchIcon } from '@/lib/moduix/icons/ui';
  import CommandPaletteClearTrigger from './CommandPaletteClearTrigger.svelte';
  import CommandPaletteControl from './CommandPaletteControl.svelte';
  import CommandPaletteInput from './CommandPaletteInput.svelte';

  let {
    ref = $bindable(null),
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledby,
    ...props
  }: ComboboxInputProps = $props();
</script>

<CommandPaletteControl>
  <SearchIcon
    data-slot="command-palette-search-icon"
    class="pointer-events-none size-4 shrink-0 text-muted-foreground"
  />
  <CommandPaletteInput
    {...props}
    bind:ref
    aria-label={ariaLabel ?? (ariaLabelledby == null ? a11yLabels.searchCommands : undefined)}
    aria-labelledby={ariaLabelledby}
  />
  <CommandPaletteClearTrigger />
</CommandPaletteControl>