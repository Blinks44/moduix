<script setup lang="ts">
import { ImageCropperRootProvider as ArkImageCropperRootProvider } from '@ark-ui/vue/image-cropper';
import type { ImageCropperRootProviderProps } from '@ark-ui/vue/image-cropper';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './ImageCropper.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ImageCropperRootProviderProps {
  class?: HTMLAttributes['class'];
  value: ImageCropperRootProviderProps['value'];
}

const { class: className, value } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkImageCropperRootProvider
    v-bind="attrs"
    :class="clsx(styles.root, className)"
    :value="value"
    data-slot="image-cropper-root-provider"
  >
    <slot />
  </ArkImageCropperRootProvider>
</template>