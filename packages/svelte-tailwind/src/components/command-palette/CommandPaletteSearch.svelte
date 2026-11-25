<script lang="ts">
  import type { ComboboxInputProps } from '@ark-ui/svelte/combobox';
  import { useA11yLabels } from '@/lib/moduix/a11yLabels';
  import { UiIcon } from '@/lib/moduix/icons/ui';
  import CommandPaletteClearTrigger from './CommandPaletteClearTrigger.svelte';
  import CommandPaletteControl from './CommandPaletteControl.svelte';
  import CommandPaletteInput from './CommandPaletteInput.svelte';

  let {
    ref = $bindable(null),
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledby,
    ...props
  }: ComboboxInputProps = $props();

  const labels = useA11yLabels();
</script>

<CommandPaletteControl>
  <UiIcon
    icon="search"
    data-slot="command-palette-search-icon"
    class="pointer-events-none size-4 shrink-0 text-muted-foreground"
  />
  <CommandPaletteInput
    {...props}
    bind:ref
    aria-label={ariaLabel ?? (ariaLabelledby == null ? labels().searchCommands : undefined)}
    aria-labelledby={ariaLabelledby}
  />
  <CommandPaletteClearTrigger />
</CommandPaletteControl>