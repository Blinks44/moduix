<script module lang="ts">
  import type { PopoverRootProps as ArkPopoverRootProps } from '@ark-ui/svelte/popover';
  import type { OverlayPortalProps } from '@/lib/moduix/overlayPortal';

  export interface PopoverRootProps extends ArkPopoverRootProps, OverlayPortalProps {}
</script>

<script lang="ts">
  import { PopoverRoot } from '@ark-ui/svelte/popover';
  import { OverlayPortalProvider } from '@/lib/moduix/overlayPortal';

  let {
    modal = false,
    lazyMount = true,
    open = $bindable(),
    triggerValue = $bindable(),
    portalled = true,
    portalRef,
    unmountOnExit = true,
    ...props
  }: PopoverRootProps = $props();

  const resolvedPortalled = $derived(modal || portalled);
</script>

<OverlayPortalProvider portalled={resolvedPortalled} {portalRef}>
  <PopoverRoot
    {...props}
    bind:open
    bind:triggerValue
    {modal}
    portalled={resolvedPortalled}
    {lazyMount}
    {unmountOnExit}
  />
</OverlayPortalProvider>