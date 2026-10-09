<script setup lang="ts">
import { SliderRootProvider as ArkSliderRootProvider } from '@ark-ui/vue/slider';
import type { SliderRootProviderProps } from '@ark-ui/vue/slider';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ SliderRootProviderProps {
  class?: HTMLAttributes['class'];
  value: SliderRootProviderProps['value'];
}

const { class: className, value } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const rootClass =
  "group flex w-48 max-w-full flex-col gap-2 text-foreground data-disabled:opacity-50 data-[orientation=vertical]:grid data-[orientation=vertical]:h-48 data-[orientation=vertical]:w-max data-[orientation=vertical]:grid-cols-[auto_max-content] data-[orientation=vertical]:grid-rows-[auto_minmax(0,1fr)] data-[orientation=vertical]:items-center data-[orientation=vertical]:gap-x-2 data-[orientation=vertical]:[grid-template-areas:'label_value'_'control_markers']";
</script>

<template>
  <ArkSliderRootProvider
    v-bind="attrs"
    :class="cn(rootClass, className)"
    :value="value"
    data-slot="slider-root-provider"
  >
    <slot />
  </ArkSliderRootProvider>
</template>