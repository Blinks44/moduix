<script setup lang="ts">
import { ImageCropperGrid as ArkImageCropperGrid } from '@ark-ui/vue/image-cropper';
import type { ImageCropperGridProps } from '@ark-ui/vue/image-cropper';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ImageCropperGridProps {
  axis: ImageCropperGridProps['axis'];
  class?: HTMLAttributes['class'];
}

const { axis, class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkImageCropperGrid
    v-bind="attrs"
    :axis="axis"
    :class="
      cn('border-white/62 data-[axis=horizontal]:border-y data-[axis=vertical]:border-x', className)
    "
    data-slot="image-cropper-grid"
  >
    <slot />
  </ArkImageCropperGrid>
</template>