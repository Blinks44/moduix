<script setup lang="ts">
import { SliderThumb as ArkSliderThumb } from '@ark-ui/vue/slider';
import type { SliderThumbProps } from '@ark-ui/vue/slider';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ SliderThumbProps {
  class?: HTMLAttributes['class'];
  index: SliderThumbProps['index'];
}

const { class: className, index } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkSliderThumb
    v-bind="attrs"
    :class="
      cn(
        'box-border flex size-4 shrink-0 items-center justify-center rounded-full border border-border bg-background shadow-sm outline-0 transition-[border-color,background-color,box-shadow] duration-200 ease-in-out select-none focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring data-disabled:pointer-events-none data-dragging:border-ring data-dragging:shadow-md data-dragging:ring-1 data-dragging:ring-ring data-invalid:border-destructive data-invalid:focus-visible:ring-destructive motion-reduce:transition-none',
        className,
      )
    "
    :index="index"
    data-slot="slider-thumb"
  >
    <slot />
  </ArkSliderThumb>
</template>