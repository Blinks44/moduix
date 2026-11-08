<script lang="ts">
  import { TooltipContent, useTooltipContext } from '@moduix/svelte/tooltip';

  const tooltip = useTooltipContext();
  const open = $derived(tooltip().open.toString());
</script>

<TooltipContent>Open from context: {open}</TooltipContent>