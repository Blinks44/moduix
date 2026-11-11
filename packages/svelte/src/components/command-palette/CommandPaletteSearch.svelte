<script lang="ts">
  import type { ComboboxInputProps } from '@ark-ui/svelte/combobox';
  import { a11yLabels } from '@/lib/moduix/a11yLabels';
  import { SearchIcon } from '@/lib/moduix/icons/ui';
  import styles from './CommandPalette.module.css';
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
  <SearchIcon data-slot="command-palette-search-icon" class={styles.searchIcon} />
  <CommandPaletteInput
    {...props}
    bind:ref
    aria-label={ariaLabel ?? (ariaLabelledby == null ? a11yLabels.searchCommands : undefined)}
    aria-labelledby={ariaLabelledby}
  />
  <CommandPaletteClearTrigger />
</CommandPaletteControl>