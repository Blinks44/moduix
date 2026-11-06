<script lang="ts">
  import {
    TooltipBody,
    TooltipContext,
    TooltipRootProvider,
    TooltipTrigger,
    useTooltip,
  } from '@/components/tooltip';
  import TooltipHookState from './TooltipHookState.svelte';

  const tooltip = useTooltip({ id: 'provider-tooltip', openDelay: 0 });
</script>

<button>Before tooltip</button>
<TooltipRootProvider value={tooltip} portalled={false}>
  <TooltipTrigger>Save</TooltipTrigger>
  <TooltipBody>Save changes</TooltipBody>
  <TooltipHookState />
  <TooltipContext>
    {#snippet render(context)}<output>Open slot: {String(context().open)}</output>{/snippet}
  </TooltipContext>
</TooltipRootProvider>