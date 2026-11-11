<script module lang="ts">
  import type { FloatingPanelRootProps as ArkFloatingPanelRootProps } from '@ark-ui/svelte/floating-panel';
  import type { OverlayPortalProps } from '@/lib/moduix/overlayPortal';

  export interface FloatingPanelRootProps extends ArkFloatingPanelRootProps, OverlayPortalProps {}
</script>

<script lang="ts">
  import { FloatingPanelRoot } from '@ark-ui/svelte/floating-panel';
  import { OverlayPortalProvider } from '@/lib/moduix/overlayPortal';

  let {
    closeOnEscape = true,
    lazyMount = true,
    open = $bindable(),
    persistRect = true,
    portalled = true,
    portalRef,
    position = $bindable(),
    size = $bindable(),
    unmountOnExit = true,
    ...props
  }: FloatingPanelRootProps = $props();
</script>

<OverlayPortalProvider {portalled} {portalRef}>
  <FloatingPanelRoot
    {...props}
    bind:open
    bind:position
    bind:size
    {closeOnEscape}
    {persistRect}
    {lazyMount}
    {unmountOnExit}
  />
</OverlayPortalProvider>