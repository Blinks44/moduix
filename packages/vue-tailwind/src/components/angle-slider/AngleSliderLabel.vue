<script setup lang="ts">
import { AngleSliderLabel as ArkAngleSliderLabel } from '@ark-ui/vue/angle-slider';
import type { AngleSliderLabelProps } from '@ark-ui/vue/angle-slider';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ AngleSliderLabelProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkAngleSliderLabel
    v-bind="attrs"
    :class="cn('text-center text-sm font-medium text-foreground', className)"
    data-slot="angle-slider-label"
  >
    <slot />
  </ArkAngleSliderLabel>
</template>