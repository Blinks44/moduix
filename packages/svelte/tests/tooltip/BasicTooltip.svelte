<script lang="ts">
  import {
    Tooltip,
    TooltipBody,
    TooltipTrigger,
    type TooltipOpenChangeDetails,
  } from '@/components/tooltip';

  let { details }: { details: TooltipOpenChangeDetails[] } = $props();
  let open = $state(false);
</script>

<Tooltip bind:open openDelay={0} portalled={false} onOpenChange={(detail) => details.push(detail)}>
  <TooltipTrigger>Save</TooltipTrigger>
  <TooltipBody>Save changes</TooltipBody>
</Tooltip>
<output>Bound open: {open}</output>