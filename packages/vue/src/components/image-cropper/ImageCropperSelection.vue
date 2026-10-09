<script setup lang="ts">
import { ImageCropperSelection as ArkImageCropperSelection } from '@ark-ui/vue/image-cropper';
import type { ImageCropperSelectionProps } from '@ark-ui/vue/image-cropper';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './ImageCropper.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ImageCropperSelectionProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkImageCropperSelection
    v-bind="attrs"
    :class="clsx(styles.selection, className)"
    data-slot="image-cropper-selection"
  >
    <slot />
  </ArkImageCropperSelection>
</template>