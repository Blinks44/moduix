<script module lang="ts">
  import type { TooltipRootProps as ArkTooltipRootProps } from '@ark-ui/svelte/tooltip';
  import type { OverlayPortalProps } from '@/lib/moduix/overlayPortal';

  export interface TooltipRootProps extends ArkTooltipRootProps, OverlayPortalProps {}
</script>

<script lang="ts">
  import { TooltipRoot } from '@ark-ui/svelte/tooltip';
  import { OverlayPortalProvider } from '@/lib/moduix/overlayPortal';

  let {
    lazyMount = true,
    open = $bindable(),
    portalled = true,
    portalRef,
    triggerValue = $bindable(),
    unmountOnExit = true,
    ...props
  }: TooltipRootProps = $props();
</script>

<OverlayPortalProvider {portalled} {portalRef}>
  <TooltipRoot {...props} bind:open bind:triggerValue {lazyMount} {unmountOnExit} />
</OverlayPortalProvider>