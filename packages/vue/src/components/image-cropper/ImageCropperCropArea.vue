<script setup lang="ts">
import { ImageCropper as ArkImageCropper } from '@ark-ui/vue/image-cropper';
import type { ImageCropperSelectionProps } from '@ark-ui/vue/image-cropper';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import ImageCropperGrid from './ImageCropperGrid.vue';
import ImageCropperHandle from './ImageCropperHandle.vue';
import ImageCropperSelection from './ImageCropperSelection.vue';

const ImageCropperHandles = ArkImageCropper.handles;

defineOptions({ inheritAttrs: false });

export interface Props
  extends /* @vue-ignore */ Omit<ImageCropperSelectionProps, 'asChild' | 'children'> {
  class?: HTMLAttributes['class'];
  gridClassName?: HTMLAttributes['class'];
  handleClassName?: HTMLAttributes['class'];
}

const { class: className, gridClassName, handleClassName } = defineProps<Props>();

const attrs = useAttrs();
const getSelectionAttrs = () => {
  const {
    asChild: _asChild,
    children: _children,
    'as-child': _kebabAsChild,
    ...selectionAttrs
  } = attrs;
  return selectionAttrs;
};
</script>

<template>
  <ImageCropperSelection
    v-bind="getSelectionAttrs()"
    :class="className"
    data-slot="image-cropper-selection"
  >
    <ImageCropperGrid axis="horizontal" :class="gridClassName" />
    <ImageCropperGrid axis="vertical" :class="gridClassName" />
    <ImageCropperHandle
      v-for="position in ImageCropperHandles"
      :key="position"
      :class="handleClassName"
      :position="position"
    />
  </ImageCropperSelection>
</template>