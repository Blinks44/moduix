<script setup lang="ts">
import { RadioGroupItemControl as ArkRadioGroupItemControl } from '@ark-ui/vue/radio-group';
import type { RadioGroupItemControlProps } from '@ark-ui/vue/radio-group';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
import type { RadioGroupItemControlSize } from './radio-group.types';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ RadioGroupItemControlProps {
  class?: HTMLAttributes['class'];
  size?: RadioGroupItemControlSize;
}

const { class: className, size = 'md' } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const controlClass =
  "relative inline-flex shrink-0 items-center justify-center rounded-full border border-border bg-background text-primary-foreground outline-0 transition-[background-color,border-color,border-width,color,opacity] duration-200 ease-in-out select-none before:block before:rounded-full before:bg-current before:content-[''] before:scale-[0.6] before:opacity-0 before:transition-[opacity,transform] before:duration-200 before:ease-in-out data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:before:scale-100 data-[state=checked]:before:opacity-100 data-invalid:border-destructive data-focus-visible:outline-1 data-focus-visible:outline-offset-1 data-focus-visible:outline-ring data-invalid:data-focus-visible:outline-destructive data-readonly:cursor-default data-disabled:cursor-default [@media(hover:hover)]:[&[data-state=unchecked]:not([data-readonly]):not([data-disabled]):hover]:bg-accent motion-reduce:transition-none motion-reduce:before:transition-none";
const sizeClasses = {
  xs: 'size-3.5 before:size-1',
  sm: 'size-4 before:size-1.5',
  md: 'size-5 before:size-2',
  lg: 'size-control-xs before:size-2.5',
  xl: 'size-7 before:size-3',
} as const;
</script>

<template>
  <ArkRadioGroupItemControl
    v-bind="attrs"
    :class="cn(controlClass, sizeClasses[size], className)"
    :data-size="size"
    data-slot="radio-group-item-control"
  >
    <slot />
  </ArkRadioGroupItemControl>
</template>