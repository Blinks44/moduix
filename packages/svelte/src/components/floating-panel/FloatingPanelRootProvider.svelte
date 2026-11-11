<script module lang="ts">
  import type { FloatingPanelRootProviderProps as ArkFloatingPanelRootProviderProps } from '@ark-ui/svelte/floating-panel';
  import type { OverlayPortalProps } from '@/lib/moduix/overlayPortal';

  export interface FloatingPanelRootProviderProps
    extends ArkFloatingPanelRootProviderProps, OverlayPortalProps {}
</script>

<script lang="ts">
  import { FloatingPanelRootProvider } from '@ark-ui/svelte/floating-panel';
  import { OverlayPortalProvider } from '@/lib/moduix/overlayPortal';

  let {
    lazyMount = true,
    portalled = true,
    portalRef,
    unmountOnExit = true,
    ...props
  }: FloatingPanelRootProviderProps = $props();
</script>

<OverlayPortalProvider {portalled} {portalRef}>
  <FloatingPanelRootProvider {...props} {lazyMount} {unmountOnExit} />
</OverlayPortalProvider>