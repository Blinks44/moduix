<script setup lang="ts">
import { ImageCropperRoot as ArkImageCropperRoot } from '@ark-ui/vue/image-cropper';
import type {
  ImageCropperCropChangeDetails,
  ImageCropperFlipChangeDetails,
  ImageCropperFlipState,
  ImageCropperRootProps,
  ImageCropperRotationChangeDetails,
  ImageCropperZoomChangeDetails,
} from '@ark-ui/vue/image-cropper';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './ImageCropper.module.css';

defineOptions({ inheritAttrs: false });

type ImageCropperRect = { x: number; y: number; width: number; height: number };

export interface Props extends /* @vue-ignore */ HTMLAttributes {
  asChild?: boolean;
  class?: HTMLAttributes['class'];
  ids?: ImageCropperRootProps['ids'];
  translations?: ImageCropperRootProps['translations'];
  initialCrop?: ImageCropperRect;
  minWidth?: number;
  minHeight?: number;
  maxWidth?: number;
  maxHeight?: number;
  aspectRatio?: number;
  cropShape?: ImageCropperRootProps['cropShape'];
  zoom?: number;
  rotation?: number;
  flip?: ImageCropperFlipState;
  defaultZoom?: number;
  defaultRotation?: number;
  defaultFlip?: ImageCropperFlipState;
  zoomStep?: number;
  zoomSensitivity?: number;
  minZoom?: number;
  maxZoom?: number;
  nudgeStep?: number;
  nudgeStepShift?: number;
  nudgeStepCtrl?: number;
  fixedCropArea?: boolean;
}

export interface Emits {
  zoomChange: [details: ImageCropperZoomChangeDetails];
  'update:zoom': [zoom: number];
  rotationChange: [details: ImageCropperRotationChangeDetails];
  'update:rotation': [rotation: number];
  flipChange: [details: ImageCropperFlipChangeDetails];
  'update:flip': [flip: ImageCropperFlipState];
  cropChange: [details: ImageCropperCropChangeDetails];
  'update:crop': [crop: ImageCropperRect];
}

const props = defineProps<Props>();
defineEmits</* @vue-ignore */ Emits>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkImageCropperRoot
    v-bind="attrs"
    :as-child="props.asChild"
    :ids="props.ids"
    :translations="props.translations"
    :initial-crop="props.initialCrop"
    :min-width="props.minWidth"
    :min-height="props.minHeight"
    :max-width="props.maxWidth"
    :max-height="props.maxHeight"
    :aspect-ratio="props.aspectRatio"
    :crop-shape="props.cropShape"
    :zoom="props.zoom"
    :rotation="props.rotation"
    :flip="props.flip"
    :default-zoom="props.defaultZoom"
    :default-rotation="props.defaultRotation"
    :default-flip="props.defaultFlip"
    :zoom-step="props.zoomStep"
    :zoom-sensitivity="props.zoomSensitivity"
    :min-zoom="props.minZoom"
    :max-zoom="props.maxZoom"
    :nudge-step="props.nudgeStep"
    :nudge-step-shift="props.nudgeStepShift"
    :nudge-step-ctrl="props.nudgeStepCtrl"
    :fixed-crop-area="props.fixedCropArea"
    :class="clsx(styles.root, props.class)"
    data-slot="image-cropper-root"
  >
    <slot />
  </ArkImageCropperRoot>
</template>