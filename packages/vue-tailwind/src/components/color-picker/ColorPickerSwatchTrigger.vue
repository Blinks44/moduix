<script setup lang="ts">
import { ColorPickerSwatchTrigger as ArkColorPickerSwatchTrigger } from '@ark-ui/vue/color-picker';
import type { ColorPickerSwatchTriggerProps } from '@ark-ui/vue/color-picker';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
import ColorPickerSwatch from './ColorPickerSwatch.vue';
import ColorPickerSwatchIndicator from './ColorPickerSwatchIndicator.vue';

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
        'inline-flex cursor-pointer rounded-sm border-0 bg-transparent p-0 outline-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:cursor-default disabled:opacity-disabled [:is([data-slot=color-picker-root],[data-slot=color-picker-root-provider])[data-disabled]_&]:opacity-100',
        className,
      )
    "
    :value="value"
    data-slot="color-picker-swatch-trigger"
  >
    <slot>
      <ColorPickerSwatch :value="value">
        <ColorPickerSwatchIndicator />
      </ColorPickerSwatch>
    </slot>
  </ArkColorPickerSwatchTrigger>
</template>