<script setup lang="ts">
import { useDialogContext } from '@ark-ui/vue/dialog';
import { onMounted, watchEffect } from 'vue';
import type { LightboxBindProps } from './lightbox';
import { preloadImage, resolveImage, resolveRootNode } from './lightbox';

const { onImageSelect, rootRef, rootSelector, selector } = defineProps<LightboxBindProps>();
const dialog = useDialogContext();

onMounted(() => {
  watchEffect((onCleanup) => {
    const rootNode = resolveRootNode(rootRef, rootSelector);
    if (!rootNode) {
      return;
    }

    const handleClick = (event: MouseEvent) => {
      const nextImage = resolveImage(event.target, selector, rootNode);
      if (!nextImage) {
        return;
      }

      onImageSelect(nextImage);
      dialog.value.setOpen(true);
    };

    const preloadFromTarget = (target: EventTarget | null) => {
      const nextImage = resolveImage(target, selector, rootNode);
      if (!nextImage) {
        return;
      }

      preloadImage(nextImage.src);
    };

    const handlePointerEnter = (event: PointerEvent) => preloadFromTarget(event.target);
    const handleFocusIn = (event: FocusEvent) => preloadFromTarget(event.target);

    rootNode.addEventListener('click', handleClick);
    rootNode.addEventListener('pointerenter', handlePointerEnter, true);
    rootNode.addEventListener('focusin', handleFocusIn);

    onCleanup(() => {
      rootNode.removeEventListener('click', handleClick);
      rootNode.removeEventListener('pointerenter', handlePointerEnter, true);
      rootNode.removeEventListener('focusin', handleFocusIn);
    });
  });
});
</script>

<template>
  <slot />
</template>