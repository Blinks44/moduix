<script lang="ts">
  import { Button } from '@moduix/svelte/button';
  import { Tooltip, TooltipPanel, TooltipTrigger } from '@moduix/svelte/tooltip';

  let open = $state(false);
</script>

<div>
  <Tooltip bind:open>
    <TooltipTrigger>Controlled tooltip</TooltipTrigger>
    <TooltipPanel>Open: {open}</TooltipPanel>
  </Tooltip>
  <div data-preview-meta>
    <output>Open: {open}</output>
    <Button size="sm" variant="outline" onclick={() => (open = !open)}>Toggle</Button>
  </div>
</div>