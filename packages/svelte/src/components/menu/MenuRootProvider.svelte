<script module lang="ts">
  import type { MenuRootProviderProps as ArkMenuRootProviderProps } from '@ark-ui/svelte/menu';
  import type { OverlayPortalProps } from '@/lib/moduix/overlayPortal';

  export interface MenuRootProviderProps extends ArkMenuRootProviderProps, OverlayPortalProps {}
</script>

<script lang="ts">
  import { MenuRootProvider } from '@ark-ui/svelte/menu';
  import { OverlayPortalProvider } from '@/lib/moduix/overlayPortal';

  let {
    lazyMount = true,
    portalled = true,
    portalRef,
    unmountOnExit = true,
    ...props
  }: MenuRootProviderProps = $props();
</script>

<OverlayPortalProvider {portalled} {portalRef}>
  <MenuRootProvider {...props} {lazyMount} {unmountOnExit} />
</OverlayPortalProvider>