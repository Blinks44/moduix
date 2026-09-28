<script setup lang="ts">
import { ImageCropperImage as ArkImageCropperImage } from '@ark-ui/vue/image-cropper';
import type { ImageCropperImageProps } from '@ark-ui/vue/image-cropper';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './ImageCropper.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ImageCropperImageProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();

const attrs = useAttrs();
</script>

<template>
  <ArkImageCropperImage
    v-bind="attrs"
    :class="clsx(styles.image, className)"
    data-slot="image-cropper-image"
  />
</template>