<script module lang="ts">
  import type { DialogRootProps } from '@ark-ui/svelte/dialog';
  import type { OverlayPortalProps } from '@/lib/moduix/overlayPortal';

  export interface CommandPaletteRootProps extends DialogRootProps, OverlayPortalProps {
    shortcut?: false | string;
  }
</script>

<script lang="ts">
  import { Root as DialogRoot } from '@ark-ui/svelte/dialog';
  import { OverlayPortalProvider } from '@/lib/moduix/overlayPortal';
  import CommandPaletteShortcut from './CommandPaletteShortcut.svelte';

  let {
    children,
    lazyMount = true,
    open = $bindable(),
    portalled = true,
    portalRef,
    shortcut = false,
    unmountOnExit = true,
    ...props
  }: CommandPaletteRootProps = $props();
</script>

<OverlayPortalProvider {portalled} {portalRef}>
  <DialogRoot {...props} bind:open {lazyMount} {unmountOnExit}>
    {#if shortcut}<CommandPaletteShortcut {shortcut} />{/if}
    {@render children?.()}
  </DialogRoot>
</OverlayPortalProvider>