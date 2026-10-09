<script setup lang="ts">
import { ColorPickerValueText as ArkColorPickerValueText } from '@ark-ui/vue/color-picker';
import type { ColorPickerValueTextProps } from '@ark-ui/vue/color-picker';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ColorPickerValueTextProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkColorPickerValueText
    v-bind="attrs"
    :class="cn('min-w-0 text-sm text-foreground', className)"
    data-slot="color-picker-value-text"
  />
</template>