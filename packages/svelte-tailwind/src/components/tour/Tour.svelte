<script module lang="ts">
  import type { TourRootProps as ArkTourRootProps } from '@ark-ui/svelte/tour';
  import type { OverlayPortalProps } from '@/lib/moduix/overlayPortal';

  export interface TourRootProps extends ArkTourRootProps, OverlayPortalProps {}
</script>

<script lang="ts">
  import { TourRoot } from '@ark-ui/svelte/tour';
  import { OverlayPortalProvider } from '@/lib/moduix/overlayPortal';

  let {
    lazyMount = true,
    portalled = true,
    portalRef,
    unmountOnExit = true,
    ...props
  }: TourRootProps = $props();
</script>

<OverlayPortalProvider {portalled} {portalRef}>
  <TourRoot {...props} {lazyMount} {unmountOnExit} />
</OverlayPortalProvider>