<script setup lang="ts">
import { ImageCropperRoot as ArkImageCropperRoot } from '@ark-ui/vue/image-cropper';
import type { ImageCropperRootEmits, ImageCropperRootProps } from '@ark-ui/vue/image-cropper';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './ImageCropper.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ImageCropperRootProps {
  class?: HTMLAttributes['class'];
}

export interface Emits extends /* @vue-ignore */ ImageCropperRootEmits {}

const { class: className } = defineProps<Props>();
defineEmits<Emits>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkImageCropperRoot
    v-bind="attrs"
    :class="clsx(styles.root, className)"
    data-slot="image-cropper-root"
  >
    <slot />
  </ArkImageCropperRoot>
</template>