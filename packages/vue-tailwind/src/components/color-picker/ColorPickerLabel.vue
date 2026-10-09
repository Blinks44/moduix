<script setup lang="ts">
import { ColorPickerLabel as ArkColorPickerLabel } from '@ark-ui/vue/color-picker';
import type { ColorPickerLabelProps } from '@ark-ui/vue/color-picker';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ColorPickerLabelProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkColorPickerLabel
    v-bind="attrs"
    :class="
      cn('inline-flex items-center text-sm font-medium text-foreground select-none', className)
    "
    data-slot="color-picker-label"
  >
    <slot />
  </ArkColorPickerLabel>
</template>