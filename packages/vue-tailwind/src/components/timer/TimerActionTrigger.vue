<script setup lang="ts">
import { TimerActionTrigger as ArkTimerActionTrigger } from '@ark-ui/vue/timer';
import type { TimerActionTriggerProps } from '@ark-ui/vue/timer';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ TimerActionTriggerProps {
  action: TimerActionTriggerProps['action'];
  class?: HTMLAttributes['class'];
}

const { action, class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const actionTriggerClass =
  'inline-flex min-h-control-md cursor-pointer appearance-none items-center justify-center gap-2 rounded-md border border-border bg-background px-3 py-1.5 text-sm leading-5 font-medium whitespace-nowrap text-foreground transition-[background-color,border-color,color,opacity,box-shadow] duration-200 ease-in-out focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-ring disabled:pointer-events-none disabled:cursor-default disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:cursor-default aria-disabled:opacity-50 motion-reduce:transition-none [&_svg]:size-4 [&_svg]:shrink-0 [@media(hover:hover)]:hover:bg-accent';
</script>

<template>
  <ArkTimerActionTrigger
    v-bind="attrs"
    :action="action"
    :class="cn(actionTriggerClass, className)"
    data-slot="timer-action-trigger"
  >
    <slot />
  </ArkTimerActionTrigger>
</template>