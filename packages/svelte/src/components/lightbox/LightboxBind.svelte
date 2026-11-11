<script lang="ts">
  import { useDialogContext } from '@ark-ui/svelte/dialog';
  import type { Snippet } from 'svelte';
  import { resolveImage, resolveRootNode, type LightboxBindProps } from './lightbox';

  type Props = LightboxBindProps & { children?: Snippet };

  let { children, onImageSelect, rootRef, rootSelector, selector }: Props = $props();

  const dialog = useDialogContext();

  $effect(() => {
    const rootNode = resolveRootNode(rootRef, rootSelector);
    if (!rootNode) {
      return;
    }

    const handleClick = (event: MouseEvent) => {
      const image = event.defaultPrevented ? null : resolveImage(event.target, selector, rootNode);
      if (!image) {
        return;
      }
      onImageSelect(image);
      dialog().setOpen(true);
    };

    // Warm the cache with the full-size source on hover or keyboard focus.
    const handlePreload = (event: Event) => {
      const image = resolveImage(event.target, selector, rootNode);
      if (image) {
        const preloaded = new Image();
        preloaded.src = image.src;
      }
    };

    rootNode.addEventListener('click', handleClick);
    // pointerenter does not bubble; the capture phase sees it for every descendant.
    rootNode.addEventListener('pointerenter', handlePreload, true);
    rootNode.addEventListener('focusin', handlePreload);

    return () => {
      rootNode.removeEventListener('click', handleClick);
      rootNode.removeEventListener('pointerenter', handlePreload, true);
      rootNode.removeEventListener('focusin', handlePreload);
    };
  });
</script>

{@render children?.()}