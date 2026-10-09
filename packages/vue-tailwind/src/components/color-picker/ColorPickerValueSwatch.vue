<script setup lang="ts">
import { ColorPickerValueSwatch as ArkColorPickerValueSwatch } from '@ark-ui/vue/color-picker';
import type { ColorPickerValueSwatchProps } from '@ark-ui/vue/color-picker';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

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
    :class="
      cn(
        'z-1 col-start-1 row-start-1 size-full rounded-[inherit] group-data-[fit-content]/trigger:col-auto group-data-[fit-content]/trigger:row-auto group-data-[fit-content]/trigger:size-4 group-data-[fit-content]/trigger:shrink-0',
        className,
      )
    "
    data-slot="color-picker-value-swatch"
  />
</template>