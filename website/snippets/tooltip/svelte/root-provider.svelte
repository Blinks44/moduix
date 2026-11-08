<script lang="ts">
  import {
    useTooltip,
    TooltipBody,
    TooltipRootProvider,
    TooltipTrigger,
  } from '@moduix/svelte/tooltip';

  const id = $props.id();

  const tooltip = useTooltip({ id });
</script>

<TooltipRootProvider value={tooltip}>
  <TooltipTrigger>RootProvider tooltip</TooltipTrigger>
  <TooltipBody>State is owned outside the tree.</TooltipBody>
</TooltipRootProvider>
<output>Open: {tooltip().open}</output>