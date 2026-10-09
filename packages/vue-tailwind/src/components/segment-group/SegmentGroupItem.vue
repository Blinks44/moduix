<script setup lang="ts">
import { SegmentGroupItem as ArkSegmentGroupItem } from '@ark-ui/vue/segment-group';
import type { SegmentGroupItemProps } from '@ark-ui/vue/segment-group';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ SegmentGroupItemProps {
  class?: HTMLAttributes['class'];
  value: SegmentGroupItemProps['value'];
}

const { class: className, value } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const itemClass =
  'relative z-1 box-border inline-flex min-h-control-sm cursor-pointer items-center justify-center gap-2 rounded-md px-3.5 text-sm leading-5 font-medium whitespace-nowrap text-muted-foreground outline-0 transition-[color,opacity] duration-200 ease-in-out select-none group-data-disabled/segment-group:!opacity-100 data-disabled:cursor-default data-disabled:opacity-50 data-focus-visible:outline-1 data-focus-visible:outline-offset-1 data-focus-visible:outline-ring data-invalid:data-focus-visible:outline-destructive data-readonly:cursor-default data-[orientation=vertical]:w-full data-[orientation=vertical]:justify-start data-[state=checked]:text-foreground [@media(hover:hover)]:[&:not([data-readonly]):not([data-disabled]):hover]:text-foreground';
</script>

<template>
  <ArkSegmentGroupItem
    v-bind="attrs"
    :class="cn(itemClass, className)"
    :value="value"
    data-slot="segment-group-item"
  >
    <slot />
  </ArkSegmentGroupItem>
</template>