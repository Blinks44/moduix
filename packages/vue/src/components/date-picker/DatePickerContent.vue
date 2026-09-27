<script setup lang="ts">
import { DatePickerContent as ArkDatePickerContent } from '@ark-ui/vue/date-picker';
import type { DatePickerContentProps } from '@ark-ui/vue/date-picker';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './DatePicker.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ DatePickerContentProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkDatePickerContent
    v-bind="attrs"
    :class="clsx(styles.content, className)"
    data-slot="date-picker-content"
  >
    <slot />
  </ArkDatePickerContent>
</template>