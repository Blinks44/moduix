<script module lang="ts">
  import type { HoverCardRootProviderProps as ArkHoverCardRootProviderProps } from '@ark-ui/svelte/hover-card';
  import type { OverlayPortalProps } from '@/lib/moduix/overlayPortal';

  export interface HoverCardRootProviderProps
    extends ArkHoverCardRootProviderProps, OverlayPortalProps {}
</script>

<script lang="ts">
  import { HoverCardRootProvider } from '@ark-ui/svelte/hover-card';
  import { OverlayPortalProvider } from '@/lib/moduix/overlayPortal';

  let {
    lazyMount = true,
    portalled = true,
    portalRef,
    unmountOnExit = true,
    ...props
  }: HoverCardRootProviderProps = $props();
</script>

<OverlayPortalProvider {portalled} {portalRef}>
  <HoverCardRootProvider {...props} {lazyMount} {unmountOnExit} />
</OverlayPortalProvider>