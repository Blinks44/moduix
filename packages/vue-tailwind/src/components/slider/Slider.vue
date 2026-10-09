<script setup lang="ts">
import { SliderRoot as ArkSliderRoot } from '@ark-ui/vue/slider';
import type { SliderRootEmits, SliderRootProps } from '@ark-ui/vue/slider';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ SliderRootProps {
  class?: HTMLAttributes['class'];
  readOnly?: SliderRootProps['readOnly'];
}

export interface Emits extends /* @vue-ignore */ SliderRootEmits {}

const { class: className, readOnly = undefined } = defineProps<Props>();
defineEmits<Emits>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const rootClass =
  "group flex w-48 max-w-full flex-col gap-2 text-foreground data-disabled:opacity-50 data-[orientation=vertical]:grid data-[orientation=vertical]:h-48 data-[orientation=vertical]:w-max data-[orientation=vertical]:grid-cols-[auto_max-content] data-[orientation=vertical]:grid-rows-[auto_minmax(0,1fr)] data-[orientation=vertical]:items-center data-[orientation=vertical]:gap-x-2 data-[orientation=vertical]:[grid-template-areas:'label_value'_'control_markers']";
</script>

<template>
  <ArkSliderRoot
    v-bind="attrs"
    :class="cn(rootClass, className)"
    :data-readonly="readOnly ? '' : undefined"
    :read-only="readOnly"
    data-slot="slider-root"
  >
    <slot />
  </ArkSliderRoot>
</template>