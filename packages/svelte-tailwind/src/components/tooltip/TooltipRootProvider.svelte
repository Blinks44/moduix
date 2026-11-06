<script module lang="ts">
  import type { TooltipRootProviderProps as ArkTooltipRootProviderProps } from '@ark-ui/svelte/tooltip';
  import type { OverlayPortalProps } from '@/lib/moduix/overlayPortal';

  export interface TooltipRootProviderProps
    extends ArkTooltipRootProviderProps, OverlayPortalProps {}
</script>

<script lang="ts">
  import { TooltipRootProvider } from '@ark-ui/svelte/tooltip';
  import { OverlayPortalProvider } from '@/lib/moduix/overlayPortal';

  let {
    lazyMount = true,
    portalled = true,
    portalRef,
    unmountOnExit = true,
    ...props
  }: TooltipRootProviderProps = $props();
</script>

<OverlayPortalProvider {portalled} {portalRef}>
  <TooltipRootProvider {...props} {lazyMount} {unmountOnExit} />
</OverlayPortalProvider>