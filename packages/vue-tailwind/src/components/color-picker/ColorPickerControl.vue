<script setup lang="ts">
import { ColorPickerControl as ArkColorPickerControl } from '@ark-ui/vue/color-picker';
import type { ColorPickerControlProps } from '@ark-ui/vue/color-picker';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ColorPickerControlProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkColorPickerControl
    v-bind="attrs"
    :class="cn('flex min-w-0 items-center gap-2 data-disabled:opacity-50', className)"
    data-slot="color-picker-control"
  >
    <slot />
  </ArkColorPickerControl>
</template>