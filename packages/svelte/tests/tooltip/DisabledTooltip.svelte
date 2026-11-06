<script lang="ts">
  import { Button } from '@/components/button';
  import { Tooltip, TooltipBody, TooltipDisabledTrigger } from '@/components/tooltip';

  let { tabindex }: { tabindex?: number } = $props();
</script>

<button>Before tooltip</button>
<Tooltip openDelay={0} portalled={false}>
  <TooltipDisabledTrigger {tabindex} aria-label="Create project is unavailable">
    <Button disabled>Create project</Button>
  </TooltipDisabledTrigger>
  <TooltipBody>Projects are unavailable while offline.</TooltipBody>
</Tooltip>