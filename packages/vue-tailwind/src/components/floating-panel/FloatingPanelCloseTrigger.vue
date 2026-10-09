<script setup lang="ts">
import { FloatingPanelCloseTrigger as ArkFloatingPanelCloseTrigger } from '@ark-ui/vue/floating-panel';
import type { FloatingPanelCloseTriggerProps } from '@ark-ui/vue/floating-panel';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ FloatingPanelCloseTriggerProps {
  asChild?: FloatingPanelCloseTriggerProps['asChild'];
  class?: HTMLAttributes['class'];
}

const { asChild = false, class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const closeTriggerClass =
  'box-border inline-flex size-control-sm cursor-pointer items-center justify-center rounded-sm border border-border bg-background text-foreground outline-0 transition-[background-color,border-color,color,opacity] duration-200 ease-in-out select-none [font:inherit] focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-ring active:bg-accent disabled:pointer-events-none disabled:cursor-default disabled:opacity-50 data-disabled:pointer-events-none data-disabled:cursor-default data-disabled:opacity-50 motion-reduce:transition-none [&>svg]:size-4 [@media(hover:hover)]:hover:bg-accent';
</script>

<template>
  <ArkFloatingPanelCloseTrigger
    v-bind="attrs"
    :as-child="asChild"
    :class="cn(!asChild && closeTriggerClass, className)"
    data-slot="floating-panel-close-trigger"
  >
    <slot />
  </ArkFloatingPanelCloseTrigger>
</template>