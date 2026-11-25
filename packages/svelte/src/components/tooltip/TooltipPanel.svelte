<script lang="ts">
  import type { TooltipContentProps } from '@ark-ui/svelte/tooltip';
  import TooltipContent from './TooltipContent.svelte';
  import TooltipPositioner from './TooltipPositioner.svelte';

  let { ref = $bindable(null), ...props }: TooltipContentProps = $props();
</script>

<TooltipPositioner>
  <TooltipContent {...props} bind:ref />
</TooltipPositioner>