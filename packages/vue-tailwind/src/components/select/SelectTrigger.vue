<script setup lang="ts">
import { SelectTrigger as ArkSelectTrigger } from '@ark-ui/vue/select';
import type { SelectTriggerProps } from '@ark-ui/vue/select';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ SelectTriggerProps {
  asChild?: boolean;
  class?: HTMLAttributes['class'];
}

const { asChild = false, class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkSelectTrigger
    v-bind="attrs"
    :as-child="asChild"
    :class="
      cn(
        !asChild &&
          'peer/select-trigger inline-flex h-control-md w-full min-w-0 cursor-pointer items-center rounded-md border border-input bg-background px-3.5 pe-[2.875rem] text-start text-inherit outline-focus-halo outline-transparent transition-[border-color,outline-color] duration-normal ease-in-out select-none [font:inherit] group-has-[>[data-slot=select-clear-trigger]:not([hidden])]/select-control:pe-[4.25rem] group-data-invalid/select-control:border-destructive focus-visible:border-ring focus-visible:outline-ring/50 group-data-invalid/select-control:focus-visible:outline-destructive/20 disabled:cursor-default data-placeholder-shown:text-muted-foreground data-[state=open]:border-ring data-[state=open]:outline-ring/50 group-data-invalid/select-control:data-[state=open]:outline-destructive/20',
        className,
      )
    "
    data-slot="select-trigger"
  >
    <slot />
  </ArkSelectTrigger>
</template>