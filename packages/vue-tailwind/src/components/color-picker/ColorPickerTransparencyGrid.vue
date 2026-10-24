<script setup lang="ts">
import { ColorPickerTransparencyGrid as ArkColorPickerTransparencyGrid } from '@ark-ui/vue/color-picker';
import type { ColorPickerTransparencyGridProps } from '@ark-ui/vue/color-picker';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ColorPickerTransparencyGridProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkColorPickerTransparencyGrid
    v-bind="attrs"
    :class="cn('size-full rounded-[inherit] [grid-area:1/1/2/2]', className)"
    data-slot="color-picker-transparency-grid"
  />
</template>