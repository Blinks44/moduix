<script setup lang="ts">
import { ColorPickerView as ArkColorPickerView } from '@ark-ui/vue/color-picker';
import type { ColorPickerViewProps } from '@ark-ui/vue/color-picker';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ColorPickerViewProps {
  class?: HTMLAttributes['class'];
  format: ColorPickerViewProps['format'];
}

const { class: className, format } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const viewClass = 'flex min-w-0 flex-col gap-2 [&[hidden]:not([hidden="until-found"])]:hidden';
</script>

<template>
  <ArkColorPickerView
    v-bind="attrs"
    :class="cn(viewClass, className)"
    :format="format"
    data-slot="color-picker-view"
  >
    <slot />
  </ArkColorPickerView>
</template>