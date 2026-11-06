<script lang="ts">
  import {
    TooltipBody,
    TooltipRootProvider,
    TooltipTrigger,
    useTooltip,
  } from '@/components/tooltip';

  let { first, second }: { first: HTMLElement; second: HTMLElement } = $props();
  // The first target is a fixed starting point; later moves go through the button.
  // svelte-ignore state_referenced_locally
  let target = $state(first);
  const tooltip = useTooltip({ id: 'portal-tooltip', defaultOpen: true });
</script>

<button onclick={() => (target = second)}>Move target</button>
<TooltipRootProvider value={tooltip} portalRef={() => target}>
  <TooltipTrigger>Save</TooltipTrigger>
  <TooltipBody>Save changes</TooltipBody>
</TooltipRootProvider>