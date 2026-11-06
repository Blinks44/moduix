<script module lang="ts">
  import type { MenuRootProps as ArkMenuRootProps } from '@ark-ui/svelte/menu';
  import type { OverlayPortalProps } from '@/lib/moduix/overlayPortal';

  export interface MenuRootProps extends ArkMenuRootProps, OverlayPortalProps {}
</script>

<script lang="ts">
  import { MenuRoot } from '@ark-ui/svelte/menu';
  import { OverlayPortalProvider } from '@/lib/moduix/overlayPortal';

  let {
    highlightedValue = $bindable(),
    lazyMount = true,
    open = $bindable(),
    portalled = true,
    portalRef,
    triggerValue = $bindable(),
    unmountOnExit = true,
    ...props
  }: MenuRootProps = $props();
</script>

<OverlayPortalProvider {portalled} {portalRef}>
  <MenuRoot
    {...props}
    bind:open
    bind:highlightedValue
    bind:triggerValue
    {lazyMount}
    {unmountOnExit}
  />
</OverlayPortalProvider>