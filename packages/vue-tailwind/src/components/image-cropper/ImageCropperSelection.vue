<script setup lang="ts">
import { ImageCropperSelection as ArkImageCropperSelection } from '@ark-ui/vue/image-cropper';
import type { ImageCropperSelectionProps } from '@ark-ui/vue/image-cropper';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

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
    :class="
      cn(
        'box-border cursor-grab rounded-md border-2 border-primary shadow-[0_0_0_9999px_rgb(0_0_0_/_45%),inset_0_0_0_1px_rgb(255_255_255_/_64%)] outline-0 transition-[border-color,box-shadow] duration-200 ease-in-out focus-visible:ring-2 focus-visible:ring-ring data-disabled:cursor-default data-dragging:cursor-grabbing data-[shape=circle]:rounded-full data-[shape=circle]:border-transparent motion-reduce:transition-none',
        className,
      )
    "
    data-slot="image-cropper-selection"
  >
    <slot />
  </ArkImageCropperSelection>
</template>