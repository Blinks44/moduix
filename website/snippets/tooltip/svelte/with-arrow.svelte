<script lang="ts">
  import { Tooltip, TooltipArrow, TooltipBody, TooltipTrigger } from '@moduix/svelte/tooltip';
</script>

<Tooltip>
  <TooltipTrigger>Hover or focus</TooltipTrigger>
  <TooltipBody>
    <TooltipArrow />
    Tooltip with arrow
  </TooltipBody>
</Tooltip>