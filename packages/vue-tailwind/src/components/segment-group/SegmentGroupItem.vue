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
  'inline-flex min-h-[calc(var(--_segment-group-size)-2*var(--moduix-spacing-1)-2*var(--moduix-border-width-sm))] cursor-pointer items-center justify-center gap-2 rounded-md px-3.5 text-sm font-medium whitespace-nowrap text-muted-foreground transition-[color] duration-normal ease-in-out select-none group-data-[size=lg]/segment-group:px-4 group-data-[size=lg]/segment-group:text-md group-data-[size=sm]/segment-group:px-3 data-disabled:cursor-default group-not-data-disabled/segment-group:data-disabled:opacity-disabled data-focus-visible:outline-focus-inset data-focus-visible:outline-offset-1 data-focus-visible:outline-ring data-invalid:data-focus-visible:outline-destructive data-readonly:cursor-default data-[orientation=vertical]:justify-start data-[state=checked]:text-foreground [@media(hover:hover)]:[&[data-state=unchecked]:not([data-readonly]):not([data-disabled]):hover]:text-foreground';
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