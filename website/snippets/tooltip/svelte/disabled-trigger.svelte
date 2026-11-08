<script lang="ts">
  import { Button } from '@moduix/svelte/button';
  import { Tooltip, TooltipBody, TooltipDisabledTrigger } from '@moduix/svelte/tooltip';
</script>

<Tooltip>
  <TooltipDisabledTrigger aria-label="Create project is unavailable">
    <Button disabled>Create project</Button>
  </TooltipDisabledTrigger>
  <TooltipBody>Projects are unavailable while offline.</TooltipBody>
</Tooltip>