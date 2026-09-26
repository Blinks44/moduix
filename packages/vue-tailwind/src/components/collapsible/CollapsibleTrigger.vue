<script setup lang="ts">
import { CollapsibleTrigger as ArkCollapsibleTrigger } from '@ark-ui/vue/collapsible';
import type { CollapsibleTriggerProps } from '@ark-ui/vue/collapsible';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ CollapsibleTriggerProps {
  asChild?: CollapsibleTriggerProps['asChild'];
  class?: HTMLAttributes['class'];
}

const { asChild = false, class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkCollapsibleTrigger
    v-bind="attrs"
    :as-child="asChild"
    :class="
      cn(
        !asChild &&
          'box-border flex w-full cursor-pointer items-center justify-between gap-2 bg-transparent px-0 py-1 text-start text-sm outline-0 transition-colors duration-200 select-none focus-visible:relative focus-visible:z-1 focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-ring disabled:cursor-default disabled:opacity-50 data-disabled:cursor-default data-disabled:opacity-50 motion-reduce:transition-none',
        className,
      )
    "
    data-slot="collapsible-trigger"
  >
    <slot />
  </ArkCollapsibleTrigger>
</template>