<script setup lang="ts">
import { AngleSliderValueText as ArkAngleSliderValueText } from '@ark-ui/vue/angle-slider';
import type { AngleSliderValueTextProps } from '@ark-ui/vue/angle-slider';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ AngleSliderValueTextProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkAngleSliderValueText
    v-bind="attrs"
    :class="
      cn(
        'absolute inset-0 z-1 grid place-items-center text-center text-lg font-medium text-foreground tabular-nums',
        className,
      )
    "
    data-slot="angle-slider-value-text"
  >
    <template v-if="$slots.default" #default><slot /></template>
  </ArkAngleSliderValueText>
</template>