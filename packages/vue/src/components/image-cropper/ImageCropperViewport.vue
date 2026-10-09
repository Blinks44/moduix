<script setup lang="ts">
import { ImageCropperViewport as ArkImageCropperViewport } from '@ark-ui/vue/image-cropper';
import type { ImageCropperViewportProps } from '@ark-ui/vue/image-cropper';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './ImageCropper.module.css';

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
    :class="clsx(styles.viewport, className)"
    data-slot="image-cropper-viewport"
  >
    <slot />
  </ArkImageCropperViewport>
</template>