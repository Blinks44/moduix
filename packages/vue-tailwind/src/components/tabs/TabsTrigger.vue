<script setup lang="ts">
import { TabTrigger as ArkTabTrigger } from '@ark-ui/vue/tabs';
import type { TabTriggerProps } from '@ark-ui/vue/tabs';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ TabTriggerProps {
  class?: HTMLAttributes['class'];
  value: TabTriggerProps['value'];
}

const { class: className, value } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const triggerClass =
  "relative z-1 inline-flex h-8 cursor-pointer items-center justify-center gap-2 rounded-md border-0 bg-transparent px-2.5 text-sm leading-5 font-medium whitespace-nowrap text-muted-foreground no-underline outline-0 transition-[color,opacity] duration-200 ease-in-out select-none focus-visible:before:pointer-events-none focus-visible:before:absolute focus-visible:before:inset-0 focus-visible:before:rounded-[inherit] focus-visible:before:outline-1 focus-visible:before:outline-ring focus-visible:before:content-[''] disabled:pointer-events-none disabled:cursor-default disabled:opacity-50 data-disabled:pointer-events-none data-disabled:cursor-default data-disabled:opacity-50 data-selected:text-foreground motion-reduce:transition-none [&>svg]:size-4 [&>svg]:shrink-0 [@media(hover:hover)]:hover:text-foreground";
</script>

<template>
  <ArkTabTrigger
    v-bind="attrs"
    :class="cn(triggerClass, className)"
    :value="value"
    data-slot="tabs-trigger"
  >
    <slot />
  </ArkTabTrigger>
</template>