<script setup lang="ts">
import { SegmentGroupLabel as ArkSegmentGroupLabel } from '@ark-ui/vue/segment-group';
import type { SegmentGroupLabelProps } from '@ark-ui/vue/segment-group';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ SegmentGroupLabelProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const labelClass = 'relative z-1 text-sm leading-5 font-semibold text-inherit select-none';
</script>

<template>
  <ArkSegmentGroupLabel
    v-bind="attrs"
    :class="cn(labelClass, className)"
    data-slot="segment-group-label"
  >
    <slot />
  </ArkSegmentGroupLabel>
</template>