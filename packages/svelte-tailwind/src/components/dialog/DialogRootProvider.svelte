<script module lang="ts">
  import type { DialogRootProviderProps as ArkDialogRootProviderProps } from '@ark-ui/svelte/dialog';
  import type { OverlayPortalProps } from '@/lib/moduix/overlayPortal';

  export interface DialogRootProviderProps extends ArkDialogRootProviderProps, OverlayPortalProps {}
</script>

<script lang="ts">
  import { RootProvider as DialogRootProvider } from '@ark-ui/svelte/dialog';
  import { OverlayPortalProvider } from '@/lib/moduix/overlayPortal';

  let {
    lazyMount = true,
    portalled = true,
    portalRef,
    unmountOnExit = true,
    ...props
  }: DialogRootProviderProps = $props();
</script>

<OverlayPortalProvider {portalled} {portalRef}>
  <DialogRootProvider {...props} {lazyMount} {unmountOnExit} />
</OverlayPortalProvider>