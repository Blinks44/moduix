<script lang="ts">
  import { Portal } from '@ark-ui/svelte/portal';
  import type { Snippet } from 'svelte';
  import { getOverlayPortalContext } from './context';

  let { children }: { children: Snippet } = $props();

  const context = getOverlayPortalContext();

  const container = $derived.by(() => {
    const portalRef = context.portalRef();
    return (typeof portalRef === 'function' ? portalRef() : portalRef) ?? undefined;
  });
</script>

<Portal {container} disabled={context.portalled() === false}>
  {@render children()}
</Portal>