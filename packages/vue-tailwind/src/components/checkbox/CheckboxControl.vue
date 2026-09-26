<script setup lang="ts">
import { CheckboxControl as ArkCheckboxControl } from '@ark-ui/vue/checkbox';
import type { CheckboxControlProps } from '@ark-ui/vue/checkbox';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
import CheckboxIndicator from './CheckboxIndicator.vue';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ CheckboxControlProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkCheckboxControl
    v-bind="attrs"
    :class="
      cn(
        `[@media(hover:hover)]:[&:not([data-disabled]):not([data-readonly])[data-state='unchecked'][data-hover]:bg-accent box-border inline-flex size-5 shrink-0 items-center justify-center rounded-xs border border-border bg-background p-0 leading-none text-primary-foreground transition-[background-color,border-color,color,opacity] duration-200 select-none group-data-[size=lg]/checkbox:size-control-xs group-data-[size=sm]/checkbox:size-4 group-data-[size=xl]/checkbox:size-7 group-data-[size=xs]/checkbox:size-3.5 data-focus-visible:outline-1 data-focus-visible:outline-offset-1 data-focus-visible:outline-ring data-invalid:border-destructive data-invalid:text-destructive-foreground data-invalid:data-focus-visible:outline-destructive data-[state=checked]:border-primary data-[state=checked]:bg-primary data-invalid:data-[state=checked]:border-destructive data-invalid:data-[state=checked]:bg-destructive data-[state=indeterminate]:border-primary data-[state=indeterminate]:bg-primary data-invalid:data-[state=indeterminate]:border-destructive data-invalid:data-[state=indeterminate]:bg-destructive motion-reduce:transition-none`,
        className,
      )
    "
    data-slot="checkbox-control"
  >
    <slot>
      <CheckboxIndicator />
      <CheckboxIndicator indeterminate />
    </slot>
  </ArkCheckboxControl>
</template>