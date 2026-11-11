<script module lang="ts">
  import type { DrawerRootProviderProps as ArkDrawerRootProviderProps } from '@ark-ui/svelte/drawer';
  import type { OverlayPortalProps } from '@/lib/moduix/overlayPortal';

  export interface DrawerRootProviderProps extends ArkDrawerRootProviderProps, OverlayPortalProps {}
</script>

<script lang="ts">
  import { DrawerRootProvider } from '@ark-ui/svelte/drawer';
  import { OverlayPortalProvider } from '@/lib/moduix/overlayPortal';

  let {
    lazyMount = true,
    portalled = true,
    portalRef,
    unmountOnExit = true,
    ...props
  }: DrawerRootProviderProps = $props();
</script>

<OverlayPortalProvider {portalled} {portalRef}>
  <DrawerRootProvider {...props} {lazyMount} {unmountOnExit} />
</OverlayPortalProvider>