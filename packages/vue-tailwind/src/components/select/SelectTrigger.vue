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
          'peer/select-trigger relative inline-flex h-control-md w-full min-w-0 cursor-pointer items-center justify-start rounded-md border border-border bg-background px-3.5 pe-[2.875rem] text-start text-inherit outline-1 -outline-offset-1 outline-transparent transition-[background-color,border-color,outline-color] duration-200 ease-in-out select-none [font:inherit] not-data-[placeholder-shown]:pe-[4.25rem] group-data-invalid/select-control:border-destructive group-data-invalid/select-control:outline-destructive focus-visible:border-ring focus-visible:outline-ring disabled:cursor-default data-disabled:cursor-default data-placeholder-shown:text-muted-foreground data-[state=open]:border-ring data-[state=open]:outline-ring motion-reduce:transition-none',
        className,
      )
    "
    data-slot="select-trigger"
  >
    <slot />
  </ArkSelectTrigger>
</template>