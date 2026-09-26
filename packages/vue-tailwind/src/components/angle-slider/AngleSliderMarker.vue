<script setup lang="ts">
import { AngleSliderMarker as ArkAngleSliderMarker } from '@ark-ui/vue/angle-slider';
import type { AngleSliderMarkerProps } from '@ark-ui/vue/angle-slider';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ AngleSliderMarkerProps {
  class?: HTMLAttributes['class'];
  value: AngleSliderMarkerProps['value'];
}

const { class: className, value } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const markerClass =
  "absolute inset-0 before:absolute before:top-1 before:left-1/2 before:h-2 before:w-0.5 before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full before:bg-muted-foreground before:content-[''] data-[state=at-value]:before:bg-foreground data-[state=under-value]:before:bg-primary";
</script>

<template>
  <ArkAngleSliderMarker
    v-bind="attrs"
    :class="cn(markerClass, className)"
    :value="value"
    data-slot="angle-slider-marker"
  >
    <slot />
  </ArkAngleSliderMarker>
</template>