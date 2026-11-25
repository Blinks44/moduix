<script lang="ts">
  import { Tooltip, TooltipArrow, TooltipPanel, TooltipTrigger } from '@moduix/svelte/tooltip';
</script>

<Tooltip>
  <TooltipTrigger>Hover or focus</TooltipTrigger>
  <TooltipPanel>
    <TooltipArrow />
    Tooltip with arrow
  </TooltipPanel>
</Tooltip>