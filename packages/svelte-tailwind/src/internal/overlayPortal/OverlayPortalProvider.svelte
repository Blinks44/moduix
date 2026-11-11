<script lang="ts">
  import type { Snippet } from 'svelte';
  import { setOverlayPortalContext, type OverlayPortalProps } from './context';

  let {
    children,
    portalled = true,
    portalRef,
  }: OverlayPortalProps & { children?: Snippet } = $props();

  setOverlayPortalContext({
    portalled: () => portalled,
    portalRef: () => portalRef,
  });
</script>

{@render children?.()}