<script setup lang="ts">
import { SliderTrack as ArkSliderTrack } from '@ark-ui/vue/slider';
import type { SliderTrackProps } from '@ark-ui/vue/slider';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ SliderTrackProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkSliderTrack
    v-bind="attrs"
    :class="
      cn(
        'h-1.5 w-full flex-1 overflow-hidden rounded-full bg-muted ring-1 ring-border select-none ring-inset data-invalid:ring-destructive data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5',
        className,
      )
    "
    data-slot="slider-track"
  >
    <slot />
  </ArkSliderTrack>
</template>