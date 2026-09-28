<script setup lang="ts">
import { ImageCropperGrid as ArkImageCropperGrid } from '@ark-ui/vue/image-cropper';
import type { ImageCropperGridProps } from '@ark-ui/vue/image-cropper';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './ImageCropper.module.css';

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
    :class="clsx(styles.grid, className)"
    data-slot="image-cropper-grid"
  >
    <slot />
  </ArkImageCropperGrid>
</template>