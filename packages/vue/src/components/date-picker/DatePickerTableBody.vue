<script setup lang="ts">
import { DatePickerTableBody as ArkDatePickerTableBody } from '@ark-ui/vue/date-picker';
import type { DatePickerTableBodyProps } from '@ark-ui/vue/date-picker';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ DatePickerTableBodyProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkDatePickerTableBody v-bind="attrs" :class="className" data-slot="date-picker-table-body">
    <slot />
  </ArkDatePickerTableBody>
</template>