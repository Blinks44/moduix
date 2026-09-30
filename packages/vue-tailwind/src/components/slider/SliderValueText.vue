<script setup lang="ts">
import { SliderValueText as ArkSliderValueText } from '@ark-ui/vue/slider';
import type { SliderValueTextProps } from '@ark-ui/vue/slider';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ SliderValueTextProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkSliderValueText
    v-bind="attrs"
    :class="
      cn(
        'text-right text-sm leading-5 font-normal text-foreground group-data-[orientation=vertical]:justify-self-end group-data-[orientation=vertical]:[grid-area:value]',
        className,
      )
    "
    data-slot="slider-value-text"
  >
    <template v-if="$slots.default" #default><slot /></template>
  </ArkSliderValueText>
</template>