<script setup lang="ts">
import { ColorPickerValueSwatch as ArkColorPickerValueSwatch } from '@ark-ui/vue/color-picker';
import type { ColorPickerValueSwatchProps } from '@ark-ui/vue/color-picker';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
import { colorPickerSwatchClass } from './ColorPicker.variants';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ColorPickerValueSwatchProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkColorPickerValueSwatch
    v-bind="attrs"
    :class="cn(colorPickerSwatchClass, className)"
    data-slot="color-picker-value-swatch"
  />
</template>