<script setup lang="ts">
import { ImageCropperViewport as ArkImageCropperViewport } from '@ark-ui/vue/image-cropper';
import type { ImageCropperViewportProps } from '@ark-ui/vue/image-cropper';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ImageCropperViewportProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkImageCropperViewport
    v-bind="attrs"
    :class="
      cn(
        'box-border aspect-[8/5] w-full rounded-lg border border-border [background:repeating-conic-gradient(var(--color-muted)_0_25%,var(--color-background)_0_50%)_0_0/1rem_1rem] data-disabled:cursor-grab',
        className,
      )
    "
    data-slot="image-cropper-viewport"
  >
    <slot />
  </ArkImageCropperViewport>
</template>