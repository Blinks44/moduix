<script setup lang="ts">
import { DatePickerTable as ArkDatePickerTable } from '@ark-ui/vue/date-picker';
import type { DatePickerTableProps } from '@ark-ui/vue/date-picker';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ DatePickerTableProps {
  class?: HTMLAttributes['class'];
}

const props = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkDatePickerTable
    v-bind="attrs"
    :class="cn('w-full table-fixed border-separate border-spacing-0.5', props.class)"
    data-slot="date-picker-table"
  >
    <slot />
  </ArkDatePickerTable>
</template>