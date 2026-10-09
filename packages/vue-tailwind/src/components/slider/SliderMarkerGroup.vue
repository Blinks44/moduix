<script setup lang="ts">
import { SliderMarkerGroup as ArkSliderMarkerGroup } from '@ark-ui/vue/slider';
import type { SliderMarkerGroupProps } from '@ark-ui/vue/slider';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ SliderMarkerGroupProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkSliderMarkerGroup
    v-bind="attrs"
    :class="
      cn(
        'mt-2 group-data-[orientation=vertical]:m-0 group-data-[orientation=vertical]:h-full group-data-[orientation=vertical]:[grid-area:markers]',
        className,
      )
    "
    data-slot="slider-marker-group"
  >
    <slot />
  </ArkSliderMarkerGroup>
</template>