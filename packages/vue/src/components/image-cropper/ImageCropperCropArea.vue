<script setup lang="ts">
import { ImageCropper as ArkImageCropper } from '@ark-ui/vue/image-cropper';
import type { ImageCropperSelectionProps } from '@ark-ui/vue/image-cropper';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import ImageCropperGrid from './ImageCropperGrid.vue';
import ImageCropperHandle from './ImageCropperHandle.vue';
import ImageCropperSelection from './ImageCropperSelection.vue';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ Omit<ImageCropperSelectionProps, 'asChild'> {
  gridClassName?: HTMLAttributes['class'];
  handleClassName?: HTMLAttributes['class'];
}

const { gridClassName, handleClassName } = defineProps<Props>();

const attrs = useAttrs();
</script>

<template>
  <ImageCropperSelection v-bind="attrs">
    <ImageCropperGrid axis="horizontal" :class="gridClassName" />
    <ImageCropperGrid axis="vertical" :class="gridClassName" />
    <ImageCropperHandle
      v-for="position in ArkImageCropper.handles"
      :key="position"
      :class="handleClassName"
      :position="position"
    />
  </ImageCropperSelection>
</template>