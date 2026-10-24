<script setup lang="ts">
import { ImageCropperHandle as ArkImageCropperHandle } from '@ark-ui/vue/image-cropper';
import type { ImageCropperHandleProps } from '@ark-ui/vue/image-cropper';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

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
    :class="
      cn(
        'size-3 rounded-xs bg-white/96 shadow-[0_1px_3px_rgb(15_23_42_/_18%)] data-disabled:hidden data-[position=e]:w-[0.2rem] data-[position=e]:rounded-full data-[position=n]:h-[0.2rem] data-[position=n]:rounded-full data-[position=ne]:z-1 data-[position=nw]:z-1 data-[position=s]:h-[0.2rem] data-[position=s]:rounded-full data-[position=se]:z-1 data-[position=sw]:z-1 data-[position=w]:w-[0.2rem] data-[position=w]:rounded-full',
        className,
      )
    "
    :position="position"
    data-slot="image-cropper-handle"
  >
    <slot />
  </ArkImageCropperHandle>
</template>