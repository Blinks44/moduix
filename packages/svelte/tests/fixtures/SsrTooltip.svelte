<script lang="ts">
  import {
    Tooltip,
    TooltipArrow,
    TooltipBody,
    TooltipDisabledTrigger,
    TooltipTrigger,
  } from '@/components/tooltip';
</script>

<Tooltip open portalled={false}>
  <TooltipTrigger>Save</TooltipTrigger>
  <TooltipDisabledTrigger>Disabled</TooltipDisabledTrigger>
  <TooltipBody>
    <TooltipArrow />
    Save changes
  </TooltipBody>
</Tooltip>