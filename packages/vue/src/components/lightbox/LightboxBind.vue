<script setup lang="ts">
import { useDialogContext } from '@ark-ui/vue/dialog';
import { onMounted, watchEffect } from 'vue';
import type { LightboxBindProps } from './lightbox';
import { resolveImage, resolveRootNode } from './lightbox';

const { onImageSelect, rootRef, rootSelector, selector } = defineProps<LightboxBindProps>();
const dialog = useDialogContext();

onMounted(() => {
  watchEffect((onCleanup) => {
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
      dialog.value.setOpen(true);
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

    onCleanup(() => {
      rootNode.removeEventListener('click', handleClick);
      rootNode.removeEventListener('pointerenter', handlePreload, true);
      rootNode.removeEventListener('focusin', handlePreload);
    });
  });
});
</script>

<template>
  <slot />
</template>