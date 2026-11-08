<script lang="ts">
  import { Tooltip, TooltipBody, TooltipTrigger } from '@moduix/svelte/tooltip';
</script>

<Tooltip closeDelay={0} openDelay={0}>
  <TooltipTrigger>Immediate tooltip</TooltipTrigger>
  <TooltipBody>No open or close delay</TooltipBody>
</Tooltip>