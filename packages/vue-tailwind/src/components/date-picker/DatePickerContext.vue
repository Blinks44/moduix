<script setup lang="ts">
import {
  DatePickerContext as ArkDatePickerContext,
  type UseDatePickerContext,
} from '@ark-ui/vue/date-picker';
import type { UnwrapRef } from 'vue';

defineSlots<{ default: (datePicker: UnwrapRef<UseDatePickerContext>) => unknown }>();
</script>

<template>
  <ArkDatePickerContext v-slot="datePicker">
    <slot v-bind="datePicker" />
  </ArkDatePickerContext>
</template>