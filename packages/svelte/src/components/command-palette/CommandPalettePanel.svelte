<script lang="ts">
  import type { DialogContentProps } from '@ark-ui/svelte/dialog';
  import CommandPaletteBackdrop from './CommandPaletteBackdrop.svelte';
  import CommandPaletteContent from './CommandPaletteContent.svelte';
  import CommandPalettePositioner from './CommandPalettePositioner.svelte';

  let { ref = $bindable(null), ...props }: DialogContentProps = $props();
</script>

<CommandPaletteBackdrop />
<CommandPalettePositioner>
  <CommandPaletteContent {...props} bind:ref />
</CommandPalettePositioner>