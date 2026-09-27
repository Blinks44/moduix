<script setup lang="ts">
import { DateInputSegmentGroup as ArkDateInputSegmentGroup } from '@ark-ui/vue/date-input';
import type { DateInputSegmentGroupProps } from '@ark-ui/vue/date-input';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ DateInputSegmentGroupProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkDateInputSegmentGroup
    v-bind="attrs"
    :class="cn('inline-flex items-center gap-0.5 tabular-nums', className)"
    data-slot="date-input-segment-group"
  >
    <slot />
  </ArkDateInputSegmentGroup>
</template>