<script lang="ts">
  import {
    useTooltip,
    TooltipPanel,
    TooltipRootProvider,
    TooltipTrigger,
  } from '@moduix/svelte/tooltip';

  const id = $props.id();

  const tooltip = useTooltip({ id });
</script>

<TooltipRootProvider value={tooltip}>
  <TooltipTrigger>RootProvider tooltip</TooltipTrigger>
  <TooltipPanel>State is owned outside the tree.</TooltipPanel>
</TooltipRootProvider>
<div data-preview-meta>
  <output>Open: {tooltip().open}</output>
</div>