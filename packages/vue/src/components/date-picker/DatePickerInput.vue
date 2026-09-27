<script setup lang="ts">
import { DatePickerInput as ArkDatePickerInput } from '@ark-ui/vue/date-picker';
import type { DatePickerInputProps } from '@ark-ui/vue/date-picker';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './DatePicker.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ DatePickerInputProps {
  class?: HTMLAttributes['class'];
}

const props = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkDatePickerInput
    v-bind="attrs"
    :class="clsx(styles.input, props.class)"
    data-slot="date-picker-input"
  />
</template>