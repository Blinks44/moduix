<script setup lang="ts">
import { TimerControl as ArkTimerControl } from '@ark-ui/vue/timer';
import type { TimerControlProps } from '@ark-ui/vue/timer';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ TimerControlProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkTimerControl
    v-bind="attrs"
    :class="cn('inline-flex flex-wrap items-center gap-2', className)"
    data-slot="timer-control"
  >
    <slot />
  </ArkTimerControl>
</template>