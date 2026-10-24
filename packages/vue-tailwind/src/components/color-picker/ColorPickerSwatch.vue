<script setup lang="ts">
import { ColorPickerSwatch as ArkColorPickerSwatch } from '@ark-ui/vue/color-picker';
import type { ColorPickerSwatchProps } from '@ark-ui/vue/color-picker';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
import { colorPickerSwatchClass } from './ColorPicker.variants';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ColorPickerSwatchProps {
  class?: HTMLAttributes['class'];
  value: ColorPickerSwatchProps['value'];
}

const { class: className, value } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkColorPickerSwatch
    v-bind="attrs"
    :class="cn(colorPickerSwatchClass, className)"
    :value="value"
    data-slot="color-picker-swatch"
  >
    <slot />
  </ArkColorPickerSwatch>
</template>