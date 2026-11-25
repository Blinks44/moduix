<script setup lang="ts">
import { useForwardExpose } from '@ark-ui/vue/utils';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import DatePickerCalendar from './DatePickerCalendar.vue';
import DatePickerContent from './DatePickerContent.vue';
import type { Props as DatePickerContentProps } from './DatePickerContent.vue';
import DatePickerPositioner from './DatePickerPositioner.vue';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ DatePickerContentProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();
const attrs = useAttrs();
const { forwardRef } = useForwardExpose();
</script>

<template>
  <DatePickerPositioner>
    <DatePickerContent :ref="forwardRef" v-bind="attrs" :class="className">
      <slot>
        <DatePickerCalendar />
      </slot>
    </DatePickerContent>
  </DatePickerPositioner>
</template>