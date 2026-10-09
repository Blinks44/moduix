<script setup lang="ts">
import { ImageCropperViewport as ArkImageCropperViewport } from '@ark-ui/vue/image-cropper';
import type { ImageCropperViewportProps } from '@ark-ui/vue/image-cropper';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ImageCropperViewportProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkImageCropperViewport
    v-bind="attrs"
    :class="
      cn(
        'box-border h-[min(20rem,62.5vw)] w-full overflow-hidden rounded-lg border border-border bg-background bg-[conic-gradient(rgb(0_0_0_/_8%)_25%,transparent_0_50%,rgb(0_0_0_/_8%)_0_75%,transparent_0)] [background-size:1rem_1rem] shadow-none data-disabled:cursor-grab',
        className,
      )
    "
    data-slot="image-cropper-viewport"
  >
    <slot />
  </ArkImageCropperViewport>
</template>