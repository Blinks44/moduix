<script lang="ts">
  import { Button } from '@moduix/svelte/button';
  import { Tooltip, TooltipPanel, TooltipDisabledTrigger } from '@moduix/svelte/tooltip';
</script>

<Tooltip>
  <TooltipDisabledTrigger aria-label="Create project is unavailable">
    <Button disabled>Create project</Button>
  </TooltipDisabledTrigger>
  <TooltipPanel>Projects are unavailable while offline.</TooltipPanel>
</Tooltip>