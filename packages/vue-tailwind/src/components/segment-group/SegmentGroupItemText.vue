<script setup lang="ts">
import { SegmentGroupItemText as ArkSegmentGroupItemText } from '@ark-ui/vue/segment-group';
import type { SegmentGroupItemTextProps } from '@ark-ui/vue/segment-group';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ SegmentGroupItemTextProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkSegmentGroupItemText
    v-bind="attrs"
    :class="cn('relative z-1', className)"
    data-slot="segment-group-item-text"
  >
    <slot />
  </ArkSegmentGroupItemText>
</template>