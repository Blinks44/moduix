<script lang="ts">
  import { Button } from '@moduix/svelte/button';
  import { Tooltip, TooltipBody, TooltipTrigger } from '@moduix/svelte/tooltip';

  let open = $state(false);
</script>

<div>
  <Tooltip bind:open>
    <TooltipTrigger>Controlled tooltip</TooltipTrigger>
    <TooltipBody>Open: {open}</TooltipBody>
  </Tooltip>
  <output>Open: {open}</output>
  <Button size="sm" variant="outline" onclick={() => (open = !open)}>Toggle</Button>
</div>