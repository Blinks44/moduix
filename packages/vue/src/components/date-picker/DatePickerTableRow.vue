<script setup lang="ts">
import { DatePickerTableRow as ArkDatePickerTableRow } from '@ark-ui/vue/date-picker';
import type { DatePickerTableRowProps } from '@ark-ui/vue/date-picker';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ DatePickerTableRowProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkDatePickerTableRow v-bind="attrs" :class="className" data-slot="date-picker-table-row">
    <slot />
  </ArkDatePickerTableRow>
</template>