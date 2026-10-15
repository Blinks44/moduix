<script setup lang="ts">
import { DatePickerTableHeader as ArkDatePickerTableHeader } from '@ark-ui/vue/date-picker';
import type { DatePickerTableHeaderProps } from '@ark-ui/vue/date-picker';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
import { tableHeaderClass } from './DatePicker.variants';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ DatePickerTableHeaderProps {
  class?: HTMLAttributes['class'];
}

const props = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkDatePickerTableHeader
    v-bind="attrs"
    :class="cn(tableHeaderClass, props.class)"
    data-slot="date-picker-table-header"
  >
    <slot />
  </ArkDatePickerTableHeader>
</template>