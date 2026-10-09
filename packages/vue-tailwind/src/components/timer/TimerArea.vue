<script setup lang="ts">
import { TimerArea as ArkTimerArea } from '@ark-ui/vue/timer';
import type { TimerAreaProps } from '@ark-ui/vue/timer';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ TimerAreaProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkTimerArea
    v-bind="attrs"
    :class="
      cn(
        'inline-flex max-w-full min-w-0 flex-wrap items-baseline justify-center gap-1 text-2xl leading-5 font-semibold tracking-normal tabular-nums',
        className,
      )
    "
    data-slot="timer-area"
  >
    <slot />
  </ArkTimerArea>
</template>