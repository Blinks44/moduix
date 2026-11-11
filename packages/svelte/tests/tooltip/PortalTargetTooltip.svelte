<script lang="ts">
  import {
    TooltipBody,
    TooltipRootProvider,
    TooltipTrigger,
    useTooltip,
  } from '@/components/tooltip';

  let { target }: { target: HTMLElement } = $props();
  const tooltip = useTooltip({ id: 'portal-tooltip', defaultOpen: true });
</script>

<TooltipRootProvider value={tooltip} portalRef={() => target}>
  <TooltipTrigger>Save</TooltipTrigger>
  <TooltipBody>Save changes</TooltipBody>
</TooltipRootProvider>