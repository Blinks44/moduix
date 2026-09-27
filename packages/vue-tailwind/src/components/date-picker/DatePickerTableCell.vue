<script setup lang="ts">
import { DatePickerTableCell as ArkDatePickerTableCell } from '@ark-ui/vue/date-picker';
import type { DatePickerTableCellProps } from '@ark-ui/vue/date-picker';
import { computed, useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ DatePickerTableCellProps {
  class?: HTMLAttributes['class'];
}

const props = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const value = computed(() => props.value ?? (attrs.value as DatePickerTableCellProps['value']));
</script>

<template>
  <ArkDatePickerTableCell
    v-bind="attrs"
    :value="value"
    :class="cn('h-control-sm w-control-sm p-0 text-center', props.class)"
    data-slot="date-picker-table-cell"
  >
    <slot />
  </ArkDatePickerTableCell>
</template>