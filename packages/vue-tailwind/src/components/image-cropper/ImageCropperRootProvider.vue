<script setup lang="ts">
import { ImageCropperRootProvider as ArkImageCropperRootProvider } from '@ark-ui/vue/image-cropper';
import type { ImageCropperRootProviderProps } from '@ark-ui/vue/image-cropper';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ImageCropperRootProviderProps {
  class?: HTMLAttributes['class'];
  value: ImageCropperRootProviderProps['value'];
}

const { class: className, value } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const rootClass =
  'box-border grid w-[32rem] max-w-full gap-3 text-foreground data-dragging:cursor-grabbing data-panning:cursor-grabbing';
</script>

<template>
  <ArkImageCropperRootProvider
    v-bind="attrs"
    :class="cn(rootClass, className)"
    :value="value"
    data-slot="image-cropper-root-provider"
  >
    <slot />
  </ArkImageCropperRootProvider>
</template>