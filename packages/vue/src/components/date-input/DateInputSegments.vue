<script setup lang="ts">
import { DateInputSegmentContext as ArkDateInputSegmentContext } from '@ark-ui/vue/date-input';
import type { DateInputSegmentGroupProps } from '@ark-ui/vue/date-input';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import DateInputSegment from './DateInputSegment.vue';
import DateInputSegmentGroup from './DateInputSegmentGroup.vue';

defineOptions({ inheritAttrs: false });

export interface Props
  extends /* @vue-ignore */ Omit<DateInputSegmentGroupProps, 'asChild' | 'children'> {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();

const attrs = useAttrs();
</script>

<template>
  <DateInputSegmentGroup v-bind="attrs" :class="className">
    <ArkDateInputSegmentContext v-slot="segment">
      <DateInputSegment :segment="segment" />
    </ArkDateInputSegmentContext>
  </DateInputSegmentGroup>
</template>