<script setup lang="ts">
import { DatePickerView as ArkDatePickerView } from '@ark-ui/vue/date-picker';
import type { DatePickerViewProps } from '@ark-ui/vue/date-picker';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './DatePicker.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ DatePickerViewProps {
  class?: HTMLAttributes['class'];
  view: DatePickerViewProps['view'];
}

const props = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkDatePickerView
    v-bind="attrs"
    :view="props.view"
    :class="clsx(styles.view, props.class)"
    data-slot="date-picker-view"
  >
    <slot />
  </ArkDatePickerView>
</template>