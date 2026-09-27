<script setup lang="ts">
import { DatePickerTableHead as ArkDatePickerTableHead } from '@ark-ui/vue/date-picker';
import type { DatePickerTableHeadProps } from '@ark-ui/vue/date-picker';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ DatePickerTableHeadProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkDatePickerTableHead v-bind="attrs" :class="className" data-slot="date-picker-table-head">
    <slot />
  </ArkDatePickerTableHead>
</template>