<script module lang="ts">
  import type { HoverCardRootProps as ArkHoverCardRootProps } from '@ark-ui/svelte/hover-card';
  import type { OverlayPortalProps } from '@/lib/moduix/overlayPortal';

  export interface HoverCardRootProps extends ArkHoverCardRootProps, OverlayPortalProps {}
</script>

<script lang="ts">
  import { HoverCardRoot } from '@ark-ui/svelte/hover-card';
  import { OverlayPortalProvider } from '@/lib/moduix/overlayPortal';

  let {
    lazyMount = true,
    open = $bindable(),
    portalled = true,
    portalRef,
    triggerValue = $bindable(),
    unmountOnExit = true,
    ...props
  }: HoverCardRootProps = $props();
</script>

<OverlayPortalProvider {portalled} {portalRef}>
  <HoverCardRoot {...props} bind:open bind:triggerValue {lazyMount} {unmountOnExit} />
</OverlayPortalProvider>