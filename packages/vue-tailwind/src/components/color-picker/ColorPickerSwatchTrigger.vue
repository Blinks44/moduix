<script setup lang="ts">
import {
  ColorPickerSwatch as ArkColorPickerSwatch,
  ColorPickerSwatchIndicator as ArkColorPickerSwatchIndicator,
  ColorPickerSwatchTrigger as ArkColorPickerSwatchTrigger,
} from '@ark-ui/vue/color-picker';
import type { ColorPickerSwatchTriggerProps } from '@ark-ui/vue/color-picker';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
import { CheckIcon } from '@/lib/moduix/icons/ui';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ColorPickerSwatchTriggerProps {
  class?: HTMLAttributes['class'];
  value: ColorPickerSwatchTriggerProps['value'];
}

const { class: className, value } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkColorPickerSwatchTrigger
    v-bind="attrs"
    :class="
      cn(
        'group/swatch inline-flex cursor-pointer items-center justify-center rounded-sm border-0 bg-transparent p-0 outline-0 focus-visible:ring-2 focus-visible:ring-ring data-disabled:cursor-default data-disabled:opacity-50',
        className,
      )
    "
    :value="value"
    data-slot="color-picker-swatch-trigger"
  >
    <slot>
      <ArkColorPickerSwatch
        :value="value"
        data-slot="color-picker-swatch"
        class="relative grid size-control-sm shrink-0 place-items-center overflow-hidden rounded-[inherit] shadow-[inset_0_0_0_1px_color-mix(in_oklab,black_14%,transparent)]"
      >
        <ArkColorPickerSwatchIndicator
          data-slot="color-picker-swatch-indicator"
          class="pointer-events-none absolute inset-0 hidden items-center justify-center text-white [filter:drop-shadow(0_1px_1px_rgb(0_0_0_/_45%))] group-data-[state=checked]/swatch:inline-flex data-[state=checked]:inline-flex [&>svg]:size-4"
        >
          <CheckIcon />
        </ArkColorPickerSwatchIndicator>
      </ArkColorPickerSwatch>
    </slot>
  </ArkColorPickerSwatchTrigger>
</template>