<script setup lang="ts">
import { ImageCropperImage as ArkImageCropperImage } from '@ark-ui/vue/image-cropper';
import type { ImageCropperImageProps } from '@ark-ui/vue/image-cropper';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

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
    :class="cn('absolute inset-0 m-auto block max-h-full max-w-full', className)"
    data-slot="image-cropper-image"
  />
</template>