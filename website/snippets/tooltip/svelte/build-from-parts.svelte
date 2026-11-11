<script lang="ts">
  import { Bell as BellIcon } from '@lucide/svelte';
  import { Button } from '@moduix/svelte/button';
  import {
    Tooltip,
    TooltipContent,
    TooltipPositioner,
    TooltipTrigger,
  } from '@moduix/svelte/tooltip';
</script>

<Tooltip>
  <TooltipTrigger aria-label="Notifications">
    {#snippet asChild(props)}
      <Button {...props()}><BellIcon aria-hidden="true" />Notifications</Button>
    {/snippet}
  </TooltipTrigger>
  <TooltipPositioner>
    <TooltipContent>Notifications</TooltipContent>
  </TooltipPositioner>
</Tooltip>