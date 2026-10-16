<script setup lang="ts">
import { ImageCropperRoot as ArkImageCropperRoot } from '@ark-ui/vue/image-cropper';
import type { ImageCropperRootEmits, ImageCropperRootProps } from '@ark-ui/vue/image-cropper';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ImageCropperRootProps {
  class?: HTMLAttributes['class'];
}

export interface Emits extends /* @vue-ignore */ ImageCropperRootEmits {}

const { class: className } = defineProps<Props>();
defineEmits<Emits>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const rootClass =
  'box-border grid w-[32rem] max-w-full gap-3 data-dragging:cursor-grabbing data-panning:cursor-grabbing';
</script>

<template>
  <ArkImageCropperRoot
    v-bind="attrs"
    :class="cn(rootClass, className)"
    data-slot="image-cropper-root"
  >
    <slot />
  </ArkImageCropperRoot>
</template>