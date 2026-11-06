<script module lang="ts">
  import type { DrawerRootProps as ArkDrawerRootProps } from '@ark-ui/svelte/drawer';
  import type { OverlayPortalProps } from '@/lib/moduix/overlayPortal';

  export interface DrawerRootProps extends ArkDrawerRootProps, OverlayPortalProps {}
</script>

<script lang="ts">
  import { DrawerRoot } from '@ark-ui/svelte/drawer';
  import { OverlayPortalProvider } from '@/lib/moduix/overlayPortal';

  let {
    lazyMount = true,
    open = $bindable(),
    portalled = true,
    portalRef,
    snapPoint = $bindable(),
    triggerValue = $bindable(),
    unmountOnExit = true,
    ...props
  }: DrawerRootProps = $props();
</script>

<OverlayPortalProvider {portalled} {portalRef}>
  <DrawerRoot {...props} bind:open bind:triggerValue bind:snapPoint {lazyMount} {unmountOnExit} />
</OverlayPortalProvider>