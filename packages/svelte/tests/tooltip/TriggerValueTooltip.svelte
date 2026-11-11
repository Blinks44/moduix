<script lang="ts">
  import {
    Tooltip,
    TooltipBody,
    TooltipTrigger,
    type TooltipTriggerValueChangeDetails,
  } from '@/components/tooltip';

  let { details }: { details: TooltipTriggerValueChangeDetails[] } = $props();
  let value = $state<string | null>(null);
</script>

<output>{value}</output>
<Tooltip
  bind:triggerValue={value}
  openDelay={0}
  portalled={false}
  onTriggerValueChange={(detail) => details.push(detail)}
>
  <TooltipTrigger value="save">Save</TooltipTrigger>
  <TooltipTrigger value="share">Share</TooltipTrigger>
  <TooltipBody>Action hint</TooltipBody>
</Tooltip>