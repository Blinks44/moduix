<script module lang="ts">
  import type { PopoverRootProviderProps as ArkPopoverRootProviderProps } from '@ark-ui/svelte/popover';
  import type { OverlayPortalProps } from '@/lib/moduix/overlayPortal';

  export interface PopoverRootProviderProps
    extends ArkPopoverRootProviderProps, OverlayPortalProps {}
</script>

<script lang="ts">
  import { PopoverRootProvider } from '@ark-ui/svelte/popover';
  import { OverlayPortalProvider } from '@/lib/moduix/overlayPortal';

  let {
    lazyMount = true,
    portalRef,
    unmountOnExit = true,
    ...props
  }: PopoverRootProviderProps = $props();
</script>

<OverlayPortalProvider portalled={props.value().portalled} {portalRef}>
  <PopoverRootProvider {...props} {lazyMount} {unmountOnExit} />
</OverlayPortalProvider>