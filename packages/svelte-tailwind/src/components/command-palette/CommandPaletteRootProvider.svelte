<script module lang="ts">
  import type { DialogRootProviderProps } from '@ark-ui/svelte/dialog';
  import type { OverlayPortalProps } from '@/lib/moduix/overlayPortal';

  export interface CommandPaletteRootProviderProps
    extends DialogRootProviderProps, OverlayPortalProps {
    shortcut?: false | string;
  }
</script>

<script lang="ts">
  import { RootProvider as DialogRootProvider } from '@ark-ui/svelte/dialog';
  import { OverlayPortalProvider } from '@/lib/moduix/overlayPortal';
  import CommandPaletteShortcut from './CommandPaletteShortcut.svelte';

  let {
    children,
    lazyMount = true,
    portalled = true,
    portalRef,
    shortcut = false,
    unmountOnExit = true,
    ...props
  }: CommandPaletteRootProviderProps = $props();
</script>

<OverlayPortalProvider {portalled} {portalRef}>
  <DialogRootProvider {...props} {lazyMount} {unmountOnExit}>
    {#if shortcut}<CommandPaletteShortcut {shortcut} />{/if}
    {@render children?.()}
  </DialogRootProvider>
</OverlayPortalProvider>