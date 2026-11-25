<script lang="ts">
  import { Tooltip, TooltipPanel, TooltipTrigger } from '@moduix/svelte/tooltip';
</script>

<Tooltip closeDelay={0} openDelay={0}>
  <TooltipTrigger>Immediate tooltip</TooltipTrigger>
  <TooltipPanel>No open or close delay</TooltipPanel>
</Tooltip>