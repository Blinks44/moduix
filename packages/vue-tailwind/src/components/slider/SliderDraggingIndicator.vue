<script setup lang="ts">
import { SliderDraggingIndicator as ArkSliderDraggingIndicator } from '@ark-ui/vue/slider';
import type { SliderDraggingIndicatorProps } from '@ark-ui/vue/slider';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ SliderDraggingIndicatorProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkSliderDraggingIndicator
    v-bind="attrs"
    :class="
      cn(
        'pointer-events-none rounded-sm bg-foreground px-2 py-1 text-xs leading-none font-medium whitespace-nowrap text-background data-[orientation=horizontal]:bottom-full data-[orientation=horizontal]:mb-2 data-[orientation=vertical]:start-full data-[orientation=vertical]:ms-2',
        className,
      )
    "
    data-slot="slider-dragging-indicator"
  >
    <template v-if="$slots.default" #default><slot /></template>
  </ArkSliderDraggingIndicator>
</template>