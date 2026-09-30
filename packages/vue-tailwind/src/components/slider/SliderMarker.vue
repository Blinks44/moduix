<script setup lang="ts">
import { SliderMarker as ArkSliderMarker } from '@ark-ui/vue/slider';
import type { SliderMarkerProps } from '@ark-ui/vue/slider';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ SliderMarkerProps {
  class?: HTMLAttributes['class'];
  value: SliderMarkerProps['value'];
}

const { class: className, value } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const markerClass =
  "text-xs leading-4 text-muted-foreground before:absolute before:start-1/2 before:-top-2 before:size-1 before:-translate-x-1/2 before:rounded-full before:bg-border before:content-[''] data-[orientation=vertical]:before:-start-2 data-[orientation=vertical]:before:top-1/2 data-[orientation=vertical]:before:-translate-y-1/2 data-[state=at-value]:before:bg-primary group-data-invalid:data-[state=at-value]:before:bg-destructive data-[state=under-value]:before:bg-primary group-data-invalid:data-[state=under-value]:before:bg-destructive";
</script>

<template>
  <ArkSliderMarker
    v-bind="attrs"
    :class="cn(markerClass, className)"
    :value="value"
    data-slot="slider-marker"
  >
    <slot />
  </ArkSliderMarker>
</template>