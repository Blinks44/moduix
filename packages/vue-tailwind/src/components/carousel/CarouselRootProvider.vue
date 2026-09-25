<script setup lang="ts">
import { CarouselRootProvider as ArkCarouselRootProvider } from '@ark-ui/vue/carousel';
import type { CarouselRootProviderProps } from '@ark-ui/vue/carousel';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ CarouselRootProviderProps {
  class?: HTMLAttributes['class'];
  value: CarouselRootProviderProps['value'];
}

const { class: className, value } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const rootClass =
  'group/carousel flex w-full min-w-0 flex-col gap-3 data-[orientation=vertical]:h-96 data-[orientation=vertical]:flex-row data-[orientation=vertical]:items-stretch';
</script>

<template>
  <ArkCarouselRootProvider
    v-bind="attrs"
    :class="cn(rootClass, className)"
    :value="value"
    data-slot="carousel-root-provider"
  >
    <slot />
  </ArkCarouselRootProvider>
</template>