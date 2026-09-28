<script setup lang="ts">
import { ImageCropperHandle as ArkImageCropperHandle } from '@ark-ui/vue/image-cropper';
import type { ImageCropperHandleProps } from '@ark-ui/vue/image-cropper';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './ImageCropper.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ImageCropperHandleProps {
  class?: HTMLAttributes['class'];
  position: ImageCropperHandleProps['position'];
}

const { class: className, position } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkImageCropperHandle
    v-bind="attrs"
    :class="clsx(styles.handle, className)"
    :position="position"
    data-slot="image-cropper-handle"
  >
    <slot />
  </ArkImageCropperHandle>
</template>